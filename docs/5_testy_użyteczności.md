# Testy użyteczności i optymalizacja interfejsu
## Scenariusz testowy

Przygotowaliśmy listę trzech zadań (tasków), które każdy z uczestników musiał wykonać w prototypie:

1. Dodaj pierwsze zadanie do listy i oznacz je jako "Nieważne" na jutro.
2. Dodaj drugie zadanie do listy i oznacz je jako "Ważne" na dzisiaj.
3. Edytuj pierwsze zadanie, oznacz jako "Ważne", przesuń datę na dzisiaj.
4. Edytuj drugie zadanie, zmień opis.
5. Oznacz drugie zadanie jako wykonane.
6. Usuń drugie zadanie.

## Wyniki testów

Testy przeprowadzono na reprezentantach grup docelowych (zgodnie z Personami):

* Użytkownik 1 (Student): Szybko odnalazł funkcje, ale zauważył, że stale aktywne przyciski zakończenia zadania, jego edycji lub jego usunięcia, wprowadzają użytkownika w błąd.
* Użytkownik 2 (Pracownik biurowy): Miał problem z wejściem do trybu edycji.
* Użytkownik 3 (Osoba starsza): Miała problem z usunięciem zadania. Zasugerowała zwiększenie rozmiaru checkboxów.

## Wprowadzone poprawki

Na podstawie obserwacji wprowadziliśmy następujące zmiany:

1. Rozmiar checkboxów został zwiększony na urządzeniach typu: tablet, laptop, komputer. Dodatkowo zwiększony został margines wewnętrzny (padding) na element checkbox-a, przez co nawet kliknięcie w jego okolicę powoduje jego aktywację lub wyłączenie.
   
2. Ikony wejścia w tryb edycji, zakończenia zadania bądź jego usunięcia aktywują się dopiero po wyborze zadania/zadań.
   
3. Dla użytkowników tabletów, laptopów i komputerów stacjonarnych dodano informację, co należy zrobić w danej sekcji. Napis jest widoczny z boku ekranu po wejściu w sekcję oznaczania zadań jako wykonane, usuwania oraz edycji. Niestety dodanie takiego napisu na urządzeniach o małej szerokości ekranu nie było możliwe lub negatywnie wpłynęłoby na przejrzystość interfejsu.

4. Dla użytkowników wszytkich urządzeń dodano informację (widoczną w sekcji usuwania zadania) informującą o potrzebie uprzedniego oznaczenia zadań/zadania jako wykonane, w celu możliwości późniejszego jego usunięcia.

5. Naprawiono błędy dotyczące możliwości dodania lub edycji zadania, zostawiając puste pole tytułu lub daty, do której zadanie ma zostać wykonane.

6. Dodano legendę ikonek wyjaśniającą znaczenie każdej z nich.

7. Poprawiono wygląd niektórych elementów UI.
