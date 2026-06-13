
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
- Użytkownik po włączeniu aplikacji będzie poproszony o zalogowanie/zarejestrowanie się. 
- Po zweryfikowaniu użytkownika będzie miał on możliwość dodania nowego treningu do swojego kalendarza. 
- Użytkownik będzie mógł dodać trening do kalendarza spośród istniejących lub stworzyć nowy trening.
- W przypadku wyboru istniejącego treningu użytkownik wybierze następnie datę i godzinę oraz ew. doda notatkę na temat treningu.
- W przypadku chęci stworzenia nowego treningu użytkownik zostanie poproszony o podanie jego nazwy i opisu. 
- Po utworzeniu treningu użytkownik będzie mógł dodać do niego wybrane przez siebie ćwiczenia wraz z ilością serii oraz ilością powtórzeń w ramach jednej serii. Jeżeli ćwiczenie jest czasowe to użytkownik będzie mógł wybrać czas wykonywania ćwiczenia.
- Użytkownik będzie miał możliwość stworzenia ćwiczenia wraz z nazwą, opisem, partiami ciała oraz zdjęciami/filmami.
- Użytkownik będzie miał możliwość edycji lub usunięcia stworzonych przez siebie ćwiczeń i treningów.
- Użytkownik ma możliwość udostępnienia swojego ćwiczenia/treningu innym użytkownikom.
- Użytkownik ma możliwość skopiowania treningu/ćwiczenia udostępnionego przez innych użytkowników do swoich treningów/ćwiczeń.

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

## Screenshoty aplikacji
<img width="912" height="2048" alt="Wel4l71O" src="https://github.com/user-attachments/assets/9cd7d672-46de-4f5a-ba7b-4889d76d46dd" />
<img width="912" height="2048" alt="vzlr-9X6" src="https://github.com/user-attachments/assets/8a920bd9-5506-4f72-8497-42dc365ff2e7" />
<img width="912" height="2048" alt="sc4tVJ1U" src="https://github.com/user-attachments/assets/1cc9ec38-fe89-4eb9-bd54-eb3fc50096f1" />
<img width="912" height="2048" alt="qN1rMfLW" src="https://github.com/user-attachments/assets/52825c8d-c98a-40db-b021-3dbf704705b9" />
<img width="912" height="2048" alt="QD4D2nk2" src="https://github.com/user-attachments/assets/7477c0b6-faae-491b-948e-2b520753ac0a" />
<img width="912" height="2048" alt="o-RlqD_h" src="https://github.com/user-attachments/assets/6147e6ce-378c-4211-be73-d4c58c6b93c6" />
<img width="912" height="2048" alt="mtX43UFF" src="https://github.com/user-attachments/assets/34754852-9fe7-4a9b-bf0c-93f213ef16ec" />
<img width="912" height="2048" alt="M9KvyRlS" src="https://github.com/user-attachments/assets/7ec1229c-857d-408c-bc65-fceb02259e64" />
<img width="912" height="2048" alt="j2cVA6qD" src="https://github.com/user-attachments/assets/6dedf9c8-a681-43f4-9a48-20a5d6271b12" />
<img width="912" height="2048" alt="HAIvVF-t" src="https://github.com/user-attachments/assets/78514fe8-1859-40bb-a058-37cb6bf12202" />
<img width="912" height="2048" alt="Eq9R3amP" src="https://github.com/user-attachments/assets/92a84ae9-8087-4e71-a55d-fddf7b6a8646" />
<img width="912" height="2048" alt="BgPaVzfy" src="https://github.com/user-attachments/assets/61a45223-39e2-4b32-85d0-80bc4e2c6336" />
<img width="912" height="2048" alt="5MgGCoIQ" src="https://github.com/user-attachments/assets/32ac468f-5d19-4adb-b8b5-2274ec1f1d69" />
<img width="912" height="2048" alt="5fgPs42I" src="https://github.com/user-attachments/assets/908426cb-83f2-4b92-8ea4-f8b0197dd8e8" />



