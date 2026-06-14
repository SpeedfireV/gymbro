# Generated migration for calendar_events workout and repeat fields

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gymbro', '0003_alter_exercises_muscle'),
    ]

    operations = [
        migrations.AddField(
            model_name='calendar_events',
            name='repeat',
            field=models.CharField(
                choices=[('none', 'None'), ('daily', 'Daily'), ('weekly', 'Weekly'), ('monthly', 'Monthly')],
                default='none',
                max_length=20
            ),
        ),
        migrations.AddField(
            model_name='calendar_events',
            name='workout',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to='gymbro.workouts'
            ),
        ),
    ]
