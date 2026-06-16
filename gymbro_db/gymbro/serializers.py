from rest_framework import serializers
from .models import users, workout_exercises, workouts, calendar_events
from .models import exercises, workout_history, exercises_history
from .models import posts, comments, ratings, comments_ratings
from .models import ExerciseTypes
from datetime import timedelta

class UserDTOSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ['id', 'username', 'email']


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            user = users.objects.get(email=email)
        except users.DoesNotExist:
            raise serializers.ValidationError({"error": "Wrong email or password"})

        if not user.verify_password(password):
            raise serializers.ValidationError({"error": "Wrong email or password"})

        return user


class RegisterSerializer(serializers.Serializer):
    nickname = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    repeat_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        if data['password'] != data['repeat_password']:
            raise serializers.ValidationError({"password": "Passwords are not the same"})

        if users.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "This email address already exists"})

        if users.objects.filter(username=data['nickname']).exists():
            raise serializers.ValidationError({"nickname": "User with this nickname already exists"})

        return data


class WorkoutExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = workout_exercises
        fields = '__all__'


class WorkoutSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    exercises_count = serializers.SerializerMethodField()
    total_duration = serializers.SerializerMethodField()
    muscles = serializers.SerializerMethodField()
    exercises = serializers.SerializerMethodField()

    class Meta:
        model = workouts
        fields = "__all__"

    def get_exercises_count(self, obj):
        return obj.workout_exercises_set.count()
    
    def get_total_duration(self, obj):
        all_workout_exercises = obj.workout_exercises_set.all()
        total_time = timedelta()

        for item in all_workout_exercises:
            if item.break_after:
                total_time += item.break_after
            
            if item.exercise.type == ExerciseTypes.DURATION:
                if item.duration:
                    total_time += item.duration
            
            elif item.exercise.type == ExerciseTypes.REPS:
                sets = item.sets or 0
                reps = item.reps or 0
                break_between = item.break_between or timedelta()
                
                reps_seconds = timedelta(seconds=(reps * 2))
                total_time += sets * (reps_seconds + break_between)

        total_seconds = int(total_time.total_seconds())
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        seconds = total_seconds % 60
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
    
    def get_muscles(self, obj):
        all_workout_exercises = obj.workout_exercises_set.all()
        unique_muscles = set()

        for item in all_workout_exercises:
            if hasattr(item, 'exercise') and item.exercise:
                muscle_value = getattr(item.exercise, 'muscle', None)
                
                if muscle_value:
                    unique_muscles.add(str(muscle_value))

        return sorted(list(unique_muscles))

    def get_exercises(self, obj):
        all_workout_exercises = obj.workout_exercises_set.all()
        exercises_list = []
        
        for current_order, item in enumerate(all_workout_exercises, start=1):

            exercise_proto = None
            if hasattr(item, 'exercise') and item.exercise:
                exercise_proto = {
                    "id": str(item.exercise.id) if hasattr(item.exercise, 'id') else None,
                    "name": item.exercise.name,
                    "type": item.exercise.type,
                    "muscle": item.exercise.muscle,
                    "difficulty": getattr(item.exercise, 'difficulty', ''),
                    "instructions": getattr(item.exercise, 'instructions', ''),
                    "safety_info": getattr(item.exercise, 'safety_info', ''),
                }

            exercise_item = {
                "index": str(item.index) if item.index is not None else str(current_order),
                "exercise": exercise_proto,
                "sets": str(item.sets),
                "reps": str(item.reps),
                "duration": str(item.duration) if item.duration else "00:00:00",
                "break_between": str(item.break_between) if item.break_between else "00:00:00",
                "break_after": str(item.break_after) if item.break_after else "00:00:00",
                "order": current_order
            }
            
            exercises_list.append(exercise_item)
            
        return exercises_list


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = exercises
        fields = '__all__'


class WorkoutHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = workout_history
        fields = '__all__'


class CalendarEventSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = calendar_events
        fields = '__all__'

    def validate(self, data):
        event_type = data.get('event_type')
        workout = data.get('workout')

        if event_type == 'workout' and workout is None:
            raise serializers.ValidationError({
                'workout': 'Workout is required for workout calendar events.'
            })

        if event_type == 'rest' and workout is not None:
            raise serializers.ValidationError({
                'workout': 'Workout must be null for rest calendar events.'
            })

        return data
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.workout:
            representation['workout'] = WorkoutSerializer(instance.workout).data
            
        return representation


class ExerciseHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = exercises_history
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    like_count = serializers.IntegerField(default=0, read_only=True)
    dislike_count = serializers.IntegerField(default=0, read_only=True)

    class Meta:
        model = posts
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    like_count = serializers.IntegerField(default=0, read_only=True)
    dislike_count = serializers.IntegerField(default=0, read_only=True)

    class Meta:
        model = comments
        fields = '__all__'


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ratings
        fields = '__all__'


class CommentRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = comments_ratings
        fields = '__all__'
