from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.db import transaction

from gymbro.models import (
    comments_ratings,
    ratings,
    comments,
    calendar_events,
    exercises_history,
    workout_history,
    posts,
    workout_exercises,
    workouts,
    users,
    exercises,
    media,
)


# Child tables first, parents last (reverse of seed order).
MODELS_IN_DELETE_ORDER = [
    comments_ratings,
    ratings,
    comments,
    calendar_events,
    exercises_history,
    workout_history,
    posts,
    workout_exercises,
    workouts,
    users,
    exercises,
    media,
]


def clear_gymbro_data(stdout=None, clear_auth_users=False):
    """Delete all rows from gymbro app tables. Returns total deleted count."""
    total = 0
    with transaction.atomic():
        for model in MODELS_IN_DELETE_ORDER:
            count, _ = model.objects.all().delete()
            total += count
            if stdout and count:
                stdout.write(f"  {model.__name__}: {count} deleted")

        if clear_auth_users:
            count, _ = User.objects.all().delete()
            total += count
            if stdout and count:
                stdout.write(f"  auth.User: {count} deleted")

    return total


class Command(BaseCommand):
    help = "Delete all data from gymbro tables (keeps schema and migrations)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--noinput",
            action="store_true",
            help="Skip confirmation prompt.",
        )

    def handle(self, *args, **options):
        if not options["noinput"]:
            confirm = input(
                "This will delete ALL gymbro data. Type 'yes' to continue: "
            )
            if confirm != "yes":
                self.stdout.write(self.style.WARNING("Aborted."))
                return

        self.stdout.write("Clearing database...")
        total = clear_gymbro_data(stdout=self.stdout, clear_auth_users=True)
        self.stdout.write(self.style.SUCCESS(f"Done. {total} rows deleted."))