# Implementacja Frontendowa

## Struktura

Stworzona implementacja frontendowa aplikacji składa się z kilku sekcji i ekranów (wysuwanych kart), które są niezbędne do realizacji zadań i funkcji aplikacji.

Strukturę aplikacji można przedstawić w sposób zorientowany na element zadania:

- sekcja główna (lista zadań, punkt startowy),
- ekran(wysuwana karta) podglądu informacji zadania (dostępny w każdej z sekcji),
- ekran (wysuwana karta) dodawnia zadania,
- sekcja oznaczania zadań jako wykonane,
- sekcja usuwania zadań,
- sekcja edycji zadania,
- ekran (wysuwana karta) edycji zadania.

## Kluczowe decyzje i zabiegi projektowe 

Rozmieszczenie poszczególnych sekcji i ekranów oraz zastosowanie elementu "cienia" ułatwiają zrozumienie działania interfejsu i pomagają uniknąć komplikacji.
Użytkownik widzi tylko to, co powinno go w danej chwili interesować.
Przykładowo, wchodząc w sekcję usuwania zadania, nie mamy dostępu do sekcji edycji.
W takiej sytuacji użytkownik może jedynie wykonywać akcję związaną z procesem usuwania zadania.
Jedynym wyjątkiem od tej reguły jest stałe dostępna opcja podglądu zadania, wywoływana poprzez kliknięcie w element zadania.
Wysuwa się wtedy schowana wcześniej karta z informacjami o zadaniu.
Opcja ta jest dostępna niezależnie od sekcji, w której przebywa użytkownik.
Wspomniany wcześniej element "cienia" zapewnia zablokowanie możliwości przejścia do innej sekcji, w trakcie gdy któryś z ekranów (wysuwanych kart) jest widoczny.
Użytkownik nie powinien mieć dostępu do elementów interfejsu, które nie dotyczą akcji, którą chce wykonać.
Pozwala to zachować prostotę, a jednocześnie eliminuje możliwość powstania potencjalnych błędów lub zwyczajnego zagubienia się użytkownika w interfejsie.
