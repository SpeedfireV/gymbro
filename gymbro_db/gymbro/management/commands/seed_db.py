import random
from datetime import timedelta, time

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone
from faker import Faker

from gymbro.management.commands.clear_db import clear_gymbro_data
from gymbro.models import (
    users,
    exercises,
    media,
    workouts,
    workout_exercises,
    workout_history,
    exercises_history,
    posts,
    calendar_events,
    comments,
    ratings,
    comments_ratings,
    ExerciseTypes,
    MuscleGroups,
    DifficultyLevels,
    EventTypes,
    RepeatChoices,
    MediaTypes,
)

SEED_PASSWORD = "Password123"

EXERCISE_TEMPLATES = [
    ("Wyciskanie sztangi leżąc", ExerciseTypes.REPS, MuscleGroups.CHEST),
    ("Wyciskanie hantli na ławce", ExerciseTypes.REPS, MuscleGroups.CHEST),
    ("Pompki", ExerciseTypes.REPS, MuscleGroups.CHEST),
    ("Przysiady ze sztangą", ExerciseTypes.REPS, MuscleGroups.LEGS),
    ("Martwy ciąg", ExerciseTypes.REPS, MuscleGroups.LEGS),
    ("Wykroki", ExerciseTypes.REPS, MuscleGroups.LEGS),
    ("Podciąganie na drążku", ExerciseTypes.REPS, MuscleGroups.ARMS),
    ("Wyciskanie żołnierskie", ExerciseTypes.REPS, MuscleGroups.ARMS),
    ("Uginanie ramion ze sztangą", ExerciseTypes.REPS, MuscleGroups.ARMS),
    ("Bieganie w miejscu", ExerciseTypes.DURATION, MuscleGroups.LEGS),
    ("Skakanka", ExerciseTypes.DURATION, MuscleGroups.LEGS),
    ("Deska", ExerciseTypes.DURATION, MuscleGroups.CHEST),
    ("Wiosłowanie na maszynie", ExerciseTypes.REPS, MuscleGroups.ARMS),
    ("Wznosy na klatkę", ExerciseTypes.REPS, MuscleGroups.CHEST),
    ("Prostowanie nóg na maszynie", ExerciseTypes.REPS, MuscleGroups.LEGS),
]


def _random_duration(min_seconds=30, max_seconds=300):
    return timedelta(seconds=random.randint(min_seconds, max_seconds))


def _random_break():
    return timedelta(seconds=random.choice([30, 60, 90, 120, 180]))


def _random_past_datetime(days_back=365):
    return timezone.now() - timedelta(
        days=random.randint(0, days_back),
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59),
    )


def _random_future_datetime(days_ahead=90):
    return timezone.now() + timedelta(
        days=random.randint(0, days_ahead),
        hours=random.randint(6, 20),
        minutes=random.choice([0, 15, 30, 45]),
    )


class Command(BaseCommand):
    help = "Populate database with fake data for all gymbro tables"

    def add_arguments(self, parser):
        parser.add_argument(
            "--count",
            type=int,
            default=200,
            help="Number of users to create (default: 200)",
        )
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Clear existing gymbro data before seeding",
        )

    def handle(self, *args, **options):
        n = options["count"]
        fake = Faker("pl_PL")
        stats = {}

        if options["clear"]:
            self.stdout.write("Clearing existing data...")
            clear_gymbro_data(stdout=self.stdout, clear_auth_users=True)

        with transaction.atomic():
            user_list = self._seed_users(fake, n, stats)
            exercise_list = self._seed_exercises(fake, n, stats)
            self._seed_media(fake, n, stats)
            workout_list = self._seed_workouts(fake, user_list, stats)
            self._seed_workout_exercises(exercise_list, workout_list, stats)
            self._seed_workout_history(user_list, workout_list, stats)
            post_list = self._seed_posts(fake, user_list, workout_list, stats)
            self._seed_calendar_events(fake, user_list, workout_list, stats)
            comment_list = self._seed_comments(fake, user_list, post_list, stats)
            self._seed_ratings(user_list, post_list, stats)
            self._seed_comment_ratings(user_list, comment_list, stats)

        self.stdout.write(self.style.SUCCESS("Seeding complete:"))
        for name, count in stats.items():
            self.stdout.write(f"  {name}: {count}")
        self.stdout.write(
            self.style.SUCCESS(
                f"\nAdmin login: admin@gymbro.test / {SEED_PASSWORD}"
            )
        )
        self.stdout.write(
            self.style.SUCCESS(
                f"All seeded users share password: {SEED_PASSWORD}"
            )
        )

    def _create_user(self, username, email, password, first_name="", last_name="", is_staff=False):
        """Mirror RegisterView: Django auth user first, then gymbro profile."""
        User.objects.create_user(
            username=username,
            email=email,
            password=password,
            is_staff=is_staff,
        )
        return users.objects.create(
            username=username,
            email=email,
            password=password,
            first_name=first_name or None,
            last_name=last_name or None,
            is_staff=is_staff,
        )

    def _seed_users(self, fake, n, stats):
        user_list = [
            self._create_user(
                username="admin",
                email="admin@gymbro.test",
                password=SEED_PASSWORD,
                first_name="Admin",
                last_name="GymBro",
                is_staff=True,
            )
        ]

        for _ in range(max(n - 1, 0)):
            is_staff = random.random() < 0.05
            user_list.append(
                self._create_user(
                    username=fake.unique.user_name(),
                    email=fake.unique.email(),
                    password=SEED_PASSWORD,
                    first_name=fake.first_name(),
                    last_name=fake.last_name(),
                    is_staff=is_staff,
                )
            )

        stats["users"] = len(user_list)
        return user_list

    def _seed_exercises(self, fake, n, stats):
        exercise_count = min(50, max(len(EXERCISE_TEMPLATES), n // 5))
        exercise_objs = []

        for i in range(exercise_count):
            if i < len(EXERCISE_TEMPLATES):
                name, ex_type, muscle = EXERCISE_TEMPLATES[i]
            else:
                name = fake.unique.catch_phrase()
                ex_type = random.choice(ExerciseTypes.values)
                muscle = random.choice(MuscleGroups.values)

            exercise_objs.append(
                exercises(
                    name=name,
                    type=ex_type,
                    muscle=muscle,
                    difficulty=random.choice(DifficultyLevels.values),
                    instructions=fake.paragraph(nb_sentences=3),
                    safety_info=fake.sentence(),
                )
            )

        exercise_list = exercises.objects.bulk_create(exercise_objs)
        stats["exercises"] = len(exercise_list)
        return exercise_list

    def _seed_media(self, fake, n, stats):
        media_count = min(30, max(5, n // 10))
        media_objs = []

        for _ in range(media_count):
            media_type = random.choice(MediaTypes.values)
            media_objs.append(
                media(
                    type=media_type,
                    name=fake.file_name(
                        extension="jpg" if media_type == MediaTypes.IMAGE else "mp4"
                    ),
                    url=fake.image_url() if media_type == MediaTypes.IMAGE else fake.url(),
                )
            )

        media.objects.bulk_create(media_objs)
        stats["media"] = media_count

    def _seed_workouts(self, fake, user_list, stats):
        workout_objs = []

        for user in user_list:
            for _ in range(random.randint(1, 4)):
                workout_objs.append(
                    workouts(
                        user=user,
                        created_at=_random_past_datetime(),
                        name=fake.catch_phrase(),
                        description=fake.text(max_nb_chars=200),
                    )
                )

        workout_list = workouts.objects.bulk_create(workout_objs)
        stats["workouts"] = len(workout_list)
        return workout_list

    def _seed_workout_exercises(self, exercise_list, workout_list, stats):
        we_objs = []

        for workout in workout_list:
            picked = random.sample(
                exercise_list,
                k=min(len(exercise_list), random.randint(2, 6)),
            )
            for index, exercise in enumerate(picked, start=1):
                if exercise.type == ExerciseTypes.DURATION:
                    duration = _random_duration(60, 600)
                    reps = 0
                else:
                    duration = timedelta(0)
                    reps = random.randint(6, 15)

                we_objs.append(
                    workout_exercises(
                        workout=workout,
                        exercise=exercise,
                        index=index,
                        sets=random.randint(3, 5),
                        reps=reps,
                        duration=duration,
                        break_between=_random_break(),
                        break_after=_random_break(),
                    )
                )

        workout_exercises.objects.bulk_create(we_objs)
        stats["workout_exercises"] = len(we_objs)

    def _seed_workout_history(self, user_list, workout_list, stats):
        history_objs = []
        exercise_history_objs = []

        for workout in workout_list:
            if random.random() > 0.6:
                continue

            for _ in range(random.randint(1, 3)):
                start = _random_past_datetime(days_back=180)
                total = timedelta(minutes=random.randint(20, 90))
                history_objs.append(
                    workout_history(
                        user=workout.user,
                        workout=workout,
                        start_time=start,
                        total_time=total,
                    )
                )

        history_list = workout_history.objects.bulk_create(history_objs)

        exercises_by_workout = {}
        for we in workout_exercises.objects.select_related("exercise").all():
            exercises_by_workout.setdefault(we.workout_id, []).append(we)

        for entry in history_list:
            we_for_workout = exercises_by_workout.get(entry.workout_id, [])
            if not we_for_workout:
                continue

            for we in we_for_workout:
                if we.exercise.type == ExerciseTypes.DURATION:
                    duration = we.duration or _random_duration(60, 600)
                    reps = 0.0
                    weight = 0.0
                else:
                    duration = timedelta(0)
                    reps = float(we.reps)
                    weight = random.choice([0.0, 20.0, 40.0, 60.0, 80.0])

                exercise_history_objs.append(
                    exercises_history(
                        user=entry.user,
                        workout_history=entry,
                        index=we.index,
                        exercise=we.exercise,
                        weight=weight,
                        reps=reps,
                        duration=duration,
                        utc_time=entry.start_time + timedelta(minutes=we.index * 5),
                    )
                )

        exercises_history.objects.bulk_create(exercise_history_objs)
        stats["workout_history"] = len(history_list)
        stats["exercises_history"] = len(exercise_history_objs)

    def _seed_posts(self, fake, user_list, workout_list, stats):
        workouts_by_user = {}
        for workout in workout_list:
            workouts_by_user.setdefault(workout.user_id, []).append(workout)

        post_objs = []
        for user in user_list:
            user_workouts = workouts_by_user.get(user.id, [])
            if not user_workouts:
                continue

            for _ in range(random.randint(0, 2)):
                post_objs.append(
                    posts(
                        user=user,
                        title=fake.sentence(nb_words=4).rstrip("."),
                        description=fake.text(max_nb_chars=300),
                        workout=random.choice(user_workouts),
                        like_count=0,
                        dislike_count=0,
                    )
                )

        post_list = posts.objects.bulk_create(post_objs)
        stats["posts"] = len(post_list)
        return post_list

    def _seed_calendar_events(self, fake, user_list, workout_list, stats):
        workouts_by_user = {}
        for workout in workout_list:
            workouts_by_user.setdefault(workout.user_id, []).append(workout)

        event_objs = []
        for user in user_list:
            user_workouts = workouts_by_user.get(user.id, [])

            for _ in range(random.randint(1, 4)):
                event_type = random.choice(EventTypes.values)
                workout = (
                    random.choice(user_workouts)
                    if event_type == EventTypes.WORKOUT and user_workouts
                    else None
                )
                if event_type == EventTypes.WORKOUT and workout is None:
                    event_type = EventTypes.REST

                repeat = random.choice(RepeatChoices.values)
                event_objs.append(
                    calendar_events(
                        user=user,
                        workout=workout,
                        time_begin=time(
                            hour=random.randint(6, 20),
                            minute=random.choice([0, 15, 30, 45]),
                        ),
                        utc_time=_random_future_datetime(),
                        event_type=event_type,
                        title=fake.sentence(nb_words=3).rstrip("."),
                        description=fake.text(max_nb_chars=150),
                        repeat=repeat,
                        repeat_interval=random.randint(1, 4)
                        if repeat == RepeatChoices.CUSTOM
                        else 1,
                    )
                )

        calendar_events.objects.bulk_create(event_objs)
        stats["calendar_events"] = len(event_objs)

    def _seed_comments(self, fake, user_list, post_list, stats):
        comment_objs = []

        for post in post_list:
            commenters = random.sample(
                user_list, k=min(len(user_list), random.randint(0, 4))
            )
            for commenter in commenters:
                comment_objs.append(
                    comments(
                        post=post,
                        user=commenter,
                        content=fake.text(max_nb_chars=200),
                        like_count=0,
                        dislike_count=0,
                    )
                )

        comment_list = comments.objects.bulk_create(comment_objs)
        stats["comments"] = len(comment_list)
        return comment_list

    def _seed_ratings(self, user_list, post_list, stats):
        rating_objs = []

        for post in post_list:
            voters = random.sample(user_list, k=min(len(user_list), random.randint(0, 8)))
            likes = 0
            dislikes = 0

            for voter in voters:
                is_like = random.random() < 0.7
                rating_objs.append(
                    ratings(post=post, user=voter, is_like=is_like)
                )
                if is_like:
                    likes += 1
                else:
                    dislikes += 1

            post.like_count = likes
            post.dislike_count = dislikes

        ratings.objects.bulk_create(rating_objs)
        posts.objects.bulk_update(post_list, ["like_count", "dislike_count"])
        stats["ratings"] = len(rating_objs)

    def _seed_comment_ratings(self, user_list, comment_list, stats):
        rating_objs = []

        for comment in comment_list:
            voters = random.sample(user_list, k=min(len(user_list), random.randint(0, 5)))
            likes = 0
            dislikes = 0

            for voter in voters:
                is_like = random.random() < 0.75
                rating_objs.append(
                    comments_ratings(comment=comment, user=voter, is_like=is_like)
                )
                if is_like:
                    likes += 1
                else:
                    dislikes += 1

            comment.like_count = likes
            comment.dislike_count = dislikes

        comments_ratings.objects.bulk_create(rating_objs)
        comments.objects.bulk_update(comment_list, ["like_count", "dislike_count"])
        stats["comments_ratings"] = len(rating_objs)
