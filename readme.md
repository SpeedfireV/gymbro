
# Opis projektu 
Dzień dobry,
w ramach projektu planujemy stworzyć aplikację mobilną pomagającą planować ćwiczenia i treningi. Aplikacja będzie umożliwiała udostępnianie planów treningowych innym użytkownikom jak i recenzję treningów innych z możliwością zamieszczania pod nimi komentarzy wraz z sugestiami co można poprawić lub zmienić. 

Przygotowaliśmy wstępny design aplikacji.
 Jest on dostępny pod linkiem https://www.figma.com/design/4Y7PKtcV89id21p9ZvnY56/GYMBRO?node-id=4-2&t=aN3qUNk3RvJu2Eh4-1.
## Potrzebne encje
W ramach projektu będziemy potrzebować bazy danych z ok. kilkunastoma encjami. Rozpisaliśmy wstępnie potrzebne encje:
- Użytkownicy
- Kalendarz
- Części ciała
- Ćwiczenia
- Historia ćwiczeń
- Multimedia
- Treningi
- Historia treningów
- Harmonogramy
- Komentarze
- Opinie komentarzy
- Opinie

Prawdopodobnie w trakcie tworzenia modelu ER zostanie dodatkowo kilka encji.
## Opis funkcjonalny
Użytkownik po włączeniu aplikacji będzie poproszony o zalogowanie/zarejestrowanie się. 
Po zweryfikowaniu użytkownika będzie miał on możliwość dodania nowego treningu do swojego kalendarza. 
Użytkownik będzie mógł dodać trening do kalendarza spośród istniejących lub stworzyć nowy trening.
W przypadku wyboru istniejącego treningu użytkownik wybierze następnie datę i godzinę oraz ew. doda notatkę na temat treningu.
W przypadku chęci stworzenia nowego treningu użytkownik zostanie poproszony o podanie jego nazwy i opisu. 
Po utworzeniu treningu użytkownik będzie mógł dodać do niego wybrane przez siebie ćwiczenia wraz z ilością serii oraz ilością powtórzeń w ramach jednej serii. Jeżeli ćwiczenie jest czasowe to użytkownik będzie mógł wybrać czas wykonywania ćwiczenia.
Użytkownik będzie miał możliwość stworzenia ćwiczenia wraz z nazwą, opisem, partiami ciała oraz zdjęciami/filmami.
Użytkownik będzie miał możliwość edycji lub usunięcia stworzonych przez siebie ćwiczeń i treningów.
Użytkownik ma możliwość udostępnienia swojego ćwiczenia/treningu innym użytkownikom.
Użytkownik ma możliwość skopiowania treningu/ćwiczenia udostępnionego przez innych użytkowników do swoich treningów/ćwiczeń.

## Wykorzystanie AI
W ramach projektu planujemy wykorzystać AI między innymi do tworzenia danych testowych, wyszukiwania niespójności/problemów w projekcie, researchowania rozwiązań.

## Zarządzanie projektem i podział zadań
Projekt planujemy zrealizować w przeciągu następnych 3 tygodni (+- 1 tydzień) licząc od piątku 17.04. 

W ramach projektu planujemy wykorzystać ClickUp do śledzenia postępów prac i rozdysponowywania zadań.
Clickup projektu dostępny jest pod linkiem https://sharing.clickup.com/90121609810/l/h/6-901216890765-1/670479abd7826a3.

Repozytorium projektu jest dostępne pod linkiem https://github.com/SpeedfireV/gymbro.

W ramach projektu zadecydowaliśmy podzielić się zadaniami w następujący sposób:
- Adrian Tarach - backend
- Grzegorz Niespodziany - design, zarządzanie zadaniami + wsparcie frontend/backend
- Karol Konior - frontend, ew. backend
- Karol Siłuch - frontend
- Wojciech Kryński - struktura bazy danych, backend

Szczegółowy podział zadań będziemy robić na bieżąco.

## Tech stack
Frontend - React Native, Tailwind
Backend - Django

Dodatkowo pomniejsze biblioteki do nawigacji, zapisywania danych lokalnie itp.

