from rest_framework import serializers
from .models import users, workout_exercises, workouts
from .models import exercises, workout_history, exercises_history

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
    class Meta:
        model = workouts
        fields = "__all__"


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = exercises
        fields = '__all__'


class WorkoutHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = workout_history
        fields = '__all__'


class ExerciseHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = exercises_history
        fields = '__all__'
