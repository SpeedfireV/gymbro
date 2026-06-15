from django.db import migrations

def create_initial_exercises(apps, schema_editor):
    Exercise = apps.get_model("gymbro", "exercises")
    Exercise.objects.get_or_create(
        name="Wyciskanie sztangi leżąc",
        defaults={
            "type": "strength",
            "muscle": "chest",
            "difficulty": "beginner",
            "instructions": "Opuść sztangę do klatki i wyciśnij.",
            "safety_info": "Używaj asekuracji."
        }
    )
    Exercise.objects.get_or_create(
        name="Przysiady",
        defaults={
            "type": "strength",
            "muscle": "legs",
            "difficulty": "beginner",
            "instructions": "Zegnij kolana i opuść biodra.",
            "safety_info": "Pilnuj prostych pleców."
        }
    )

class Migration(migrations.Migration):
    dependencies = [
        ('gymbro', '0003_alter_exercises_muscle'),
    ]

    operations = [
        migrations.RunPython(create_initial_exercises),
    ]