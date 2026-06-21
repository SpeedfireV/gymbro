# Opis projektu 
Aplikacja mobilna wspomagająca planowanie ćwiczeń i treningów. Aplikacja umożliwia tworzenie spersonalizowanych planów treningowych na podstawie predefiniowanych ćwiczeń.

Design aplikacji: https://www.figma.com/design/4Y7PKtcV89id21p9ZvnY56/GYMBRO?node-id=4-2&t=aN3qUNk3RvJu2Eh4-1.

## Opis funkcjonalny
- **Uwierzytelnianie:** Rejestracja i logowanie użytkowników.
- **Kalendarz:** Podgląd zaplanowanych aktywności oraz dodawanie treningów (istniejących lub nowych) na określoną datę i godzinę z opcją notatek.
- **Konfiguracja treningu:** Tworzenie treningów składających się z ćwiczeń z określoną liczbą serii, powtórzeń, czasem trwania oraz zdefiniowanym czasem przerw między seriami i między ćwiczeniami.

## Model i struktura bazy danych
Baza danych została zaimplementowana w bazie **PostgreSQL** przy użyciu **Django**. Poniżej znajduje się specyfikacja tabel oraz ich relacji.

### Wykaz tabel i pól

1. **users** (Użytkownicy)
   - `id` (int, PK): Klucz główny.
   - `username` (text, unique, not null): Nazwa użytkownika.
   - `email` (text, unique, not null): Adres e-mail.
   - `password` (text): Skrót hasła.
   - `first_name` (text) / `last_name` (text): Dane osobowe.
   - `created_at` (timestamp): Data rejestracji.

2. **calendar_events** (Wydarzenia w kalendarzu)
   - `id` (int, PK): Klucz główny.
   - `user` (int, FK -> users): Identyfikator użytkownika.
   - `utc_time` (timestamp, not null): Znacznik czasu w strefie UTC.
   - `event_type` (enum): Typ wydarzenia.
   - `title` (text) / `description` (text): Tytuł i opis zdarzenia.

3. **exercises** (Słownik ćwiczeń)
   - `id` (int, PK): Klucz główny.
   - `name` (text): Nazwa ćwiczenia.
   - `type` (enum): Typ ćwiczenia.
   - `muscle` (enum): Docelowa partia mięśniowa.
   - `difficulty` (enum): Poziom trudności.
   - `instructions` (text): Instrukcja wykonania.
   - `safety_info` (text): Informacje dotyczące bezpieczeństwa.

4. **workouts** (Definicje treningów)
   - `id` (int, PK): Klucz główny.
   - `user` (int, FK -> users): Twórca treningu.
   - `created_at` (timestamp): Data utworzenia.

5. **workout_exercises** (Ćwiczenia w strukturze treningu)
   - `id` (int, PK): Klucz główny.
   - `workout` (int, FK -> workouts): Powiązany trening.
   - `excercise` (int, FK -> exercises): Powiązane ćwiczenie.
   - `index` (int): Kolejność ćwiczenia w treningu.
   - `sets` (int): Liczba serii.
   - `reps` (int): Liczba powtórzeń w serii.
   - `duration` (time): Czas trwania (dla ćwiczeń czasowych).
   - `break_between` (time): Czas przerwy między seriami.
   - `break_after` (time): Czas przerwy po zakończeniu ćwiczenia.

6. **workout_history** (Historia sesji treningowych)
   - `id` (int, PK): Klucz główny.
   - `user` (int, FK -> users): Uczestnik treningu.
   - `workout` (int, FK -> workouts): Zrealizowany trening.
   - `start_time` (timestamp): Data i godzina rozpoczęcia.
   - `total_time` (time): Całkowity czas trwania sesji.

7. **exercises_history** (Historia pojedynczych ćwiczeń)
   - `id` (int, PK): Klucz główny.
   - `user` (int, FK -> users): Użytkownik wykonujący ćwiczenie.
   - `workout_history` (int, FK -> workout_history): Powiązanie z sesją treningową.
   - `excercise` (int, FK -> exercises): Wykonane ćwiczenie.
   - `index` (int): Kolejność wykonania.
   - `weight` (float): Obciążenie.
   - `reps` (float): Liczba powtórzeń.
   - `duration` (time): Czas trwania.
   - `utc_time` (timestamp): Znacznik czasu wykonania.


8. **media** (Pliki multimedialne)
    - `id` (int, PK): Klucz główny.
    - `type` (enum): Typ pliku.
    - `name` (text): Nazwa.
    - `url` (text): Adres URL zasobu.

## Wykorzystanie AI
AI zostanie wykorzystane do generowania danych testowych, wykrywania niespójności w strukturach projektowych, optymalizacji researchu rozwiązań technicznych i sfinalizowaniu dokumentacji.

## Zarządzanie projektem i podział zadań
Projektem pocżątkowo zarządzaliśmy z wykorzystaniem platformy Clickup.
Repozytorium kodu: https://github.com/SpeedfireV/gymbro.

**Podział roli w zespole:**
- Adrian Tarach – backend
- Grzegorz Niespodziany – design, zarządzanie, frontend
- Karol Konior – frontend, wsparcie backend
- Karol Siłuch – frontend
- Wojciech Kryński – struktura bazy danych, backend

## Tech stack
- **Frontend:** React Native
- **Backend:** Django
- **Baza danych:** PostgreSQL
- Pomniejsze biblioteki frontendowe

## Screenshoty aplikacji
<img width="250" alt="Wel4l71O" src="https://github.com/user-attachments/assets/9cd7d672-46de-4f5a-ba7b-4889d76d46dd" /> <img width="250" alt="vzlr-9X6" src="https://github.com/user-attachments/assets/8a920bd9-5506-4f72-8497-42dc365ff2e7" /> <img width="250" alt="sc4tVJ1U" src="https://github.com/user-attachments/assets/1cc9ec38-fe89-4eb9-bd54-eb3fc50096f1" /> <img width="250" alt="qN1rMfLW" src="https://github.com/user-attachments/assets/52825c8d-c98a-40db-b021-3dbf704705b9" /> <img width="250" alt="QD4D2nk2" src="https://github.com/user-attachments/assets/7477c0b6-faae-491b-948e-2b520753ac0a" /> <img width="250" alt="o-RlqD_h" src="https://github.com/user-attachments/assets/6147e6ce-378c-4211-be73-d4c58c6b93c6" /> <img width="250" alt="mtX43UFF" src="https://github.com/user-attachments/assets/34754852-9fe7-4a9b-bf0c-93f213ef16ec" /> <img width="250" alt="M9KvyRlS" src="https://github.com/user-attachments/assets/7ec1229c-857d-408c-bc65-fceb02259e64" /> <img width="250" alt="j2cVA6qD" src="https://github.com/user-attachments/assets/6dedf9c8-a681-43f4-9a48-20a5d6271b12" /> <img width="250" alt="HAIvVF-t" src="https://github.com/user-attachments/assets/78514fe8-1859-40bb-a058-37cb6bf12202" /> <img width="250" alt="Eq9R3amP" src="https://github.com/user-attachments/assets/92a84ae9-8087-4e71-a55d-fddf7b6a8646" /> <img width="250" alt="BgPaVzfy" src="https://github.com/user-attachments/assets/61a45223-39e2-4b32-85d0-80bc4e2c6336" /> <img width="250" alt="5MgGCoIQ" src="https://github.com/user-attachments/assets/32ac468f-5d19-4adb-b8b5-2274ec1f1d69" /> <img width="250" alt="5fgPs42I" src="https://github.com/user-attachments/assets/908426cb-83f2-4b92-8ea4-f8b0197dd8e8" />
