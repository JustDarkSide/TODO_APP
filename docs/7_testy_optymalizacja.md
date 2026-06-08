# Ostateczne testy i optymalizacja interfejsu

Po zakończeniu poprzedniego etapu zweryfikowano odporność interfejsu na błędy typu Injection, łamanie układu (Layout Breaking) oraz poprawność przetwarzania znaków specjalnych.
Sprawdzono, czy aplikacja poprawnie izoluje kod od treści oraz w jaki sposób aplikacja reaguje na ekstremalne dane tekstowe.

\begin{table}[h]
\centering
\begin{tabular}{p{0.20\textwidth} p{0.3\textwidth} p{0.38\textwidth}}
\toprule
Przypadek testowy & Wprowadzony ciąg znaków & Wynik testu \\
\midrule
HTML Injection & <b>Pogrubienie</b> & Tekst wyświetlony bez pogrubienia \\
XSS Injection & <script>alert('XSS')\newline</script> & Skrypt nie został wykonany \\
CSS Injection & <style>body{background: red;}</style> & Tło pozostało bez zmian \\
Test cudzysłowów & Zdanie z " i ' & Widoczne są znaki cudzysłowów \\
Test systemowych symboli & \$, \{, \}, \# & Symbole systemowe bez zmian \\
Test długich ciągów znaków & Aaaaaaaa.... (512 symboli) & Tekst się nie zawinął, pojawił się horyzontalny scrollbar \\
Test białych znaków & ' ' \it{(spacja)} & Zadanie dodało się z "pustym" tytułem \\
\bottomrule
\end{tabular}
\end{table}

Wykonano obserwacje użytkowników bez jakiejkolwiek wiedzy o projekcie.
Użytkownicy byli proszeni o zgłaszanie uwag podczas celowego przebiegu użytkowania: dodawanie zadania, zakończenie, edycja, usuwanie.
Obserwacje zostały udokumentowane w systemie zarządzania projektami Jira [todoapp.atlassian.net](https://todoapp.atlassian.net/jira/software/projects/KAN/boards/2) Wszystkie uwagi zostały rozpatrzone, co skutkowało wprowadzeniem zmian do implementacji albo odrzuceniem z podaniem przyczyny.

\begin{table}[H]
\centering
\begin{tabular}{p{0.63\textwidth} p{0.15\textwidth} p{0.15\textwidth}}
\toprule
Uwaga & Rodzaj & Status \\
\midrule
Dodanie zadania z pustą datą zakończenia & Bug & Uwzględnione \\
Przycisk usunięcia zadania zawsze aktywny & UI/UX issue & Uwzględnione \\
Edycja zadania - pusty tytuł & Bug & Uwzględnione \\
Dodanie pustego zadania & Bug & Uwzględnione \\
Brak zawijania długich słów & Bug & Uwzględnione \\
Użytkownik oczekuje zamknięcie dialogu po dodaniu zadania & UI/UX issue & Odrzcuone \\
Niejasny proces edycji zadania & UI/UX issue & Odrzcuone \\
Zablokowane usuwanie aktywnych zadań i brak informacji o tym dla użytkownika & UI/UX issue & Uwzględnione \\
Niejasne znaczenie zielonego oznaczenia (zielone kółko) & UI/UX issue & Uwzględnione \\
Brak jasności, jak ukończyć zadanie & UI/UX issue & Uwzględnione \\
Nieintuicyjne przyciski w dolnym panelu & UI/UX issue & Uwzględnione \\
Etykieta "Important?" jest daleko od przełącznika & UI/UX issue & Uwzględnione \\
Biały scrollbar na liście zadań w Chrome (v148.0+) & Bug & Odrzcuone \\
Pusta lista zadań generuje scrollbar & Bug & Uwzględnione \\
\bottomrule
\end{tabular}
\end{table}


