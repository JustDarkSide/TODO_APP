# Tworzenie szkiców interfejsu i mapy aplikacji
## Architektura informacji i User Flow
Zanim przystąpiono do szkicowania, opracowano ścieżkę użytkownika (User Flow), aby zapewnić logiczne przejścia między widokami. Główny proces obejmuje:

1. **Ekran główny**: Przegląd listy zadań z możliwością filtrowania.
2. **Akcja dodawania**: Przejście do formularza, wprowadzenie danych i powrót z informacją zwrotną.
3. **Zakończenie zadania**: Wybór zadań z listy do ukończenia.
3. **Zarządzanie zadaniem**: Możliwość edycji tytułu zadania, opisu, daty końcowej.
4. **Usunięcie wykonanych zadań**: Pogląd wykonanych zadań z możliwością usunięcia.

\begin{minipage}[t]{0.95\textwidth}
\vspace{0pt}
\includegraphics[width=\textwidth]{../frame0/userflow2.jpg}
\par\vspace{5pt}
\centering \small \textit{Diagram ścieżki użytkownika (User Flow).}
\end{minipage}

\begin{minipage}[t]{0.95\textwidth}
\vspace{0pt}
\includegraphics[width=\textwidth]{../frame0/userflow1.jpg}
\par\vspace{5pt}
\centering \small \textit{Diagram ścieżki użytkownika do urządzeń mobilnych.}
\end{minipage}

## Szkice Low-Fidelity Wireframes
Do projektowania prototypów w niskiej rozdzielczości wybrano program [Frame0](http://frame0.app). Program jest dostępny na OS Windows, GNU/Linux oraz Mac. Jest w wersji bezpłatnej podstawowej oraz płatnej rozszerzonej. Posiada intuicyjny interfejs, sterowanie podobne do Balsamiq i Figma. Dysponuje wystarczającą biblioteką standardowych elementów interfejsu.

Na tym etapie przygotowano szkice ramowe (wireframes) dla kluczowych ekranów aplikacji, z uwzględnieniem wersji mobilnej oraz desktopowej. [GitHub](https://github.com/ysychov1990/TODO_APP/tree/main/frame0) (Smartphone\*.f0 i Desktop\*.f0)

\begin{minipage}[t]{0.5\textwidth}
\vspace{0pt}
\subsubsection*{Wersja Mobilna}
Zgodnie z potrzebami \textbf{Persony 2 i 3} wersja mobilna stawia na obsługę "w biegu":

\begin{itemize}[label=\textbullet, topsep=10pt]
    \item Interfejs jednokolumnowy z dużymi obszarami klikalnymi (tzw. touch targets).
    \item Układ automatycznie dostosowuje się do mniejszych rozdzielczości, zachowując czytelność priorytetów.
\end{itemize}
\end{minipage}
\hfill
\begin{minipage}[t]{0.45\textwidth}
\vspace{0pt}
\includegraphics[width=\textwidth]{../frame0/Smartphone-01.jpg}
\par\vspace{5pt}
\centering \small \textit{Prototyp Lo-Fidelity interfejsu mobilnego.}
\end{minipage}

\begin{minipage}[t]{0.45\textwidth}
\vspace{0pt}
\includegraphics[width=\textwidth]{../frame0/Desktop-11.png}
\par\vspace{5pt}
\centering \small \textit{Prototyp Lo-Fidelity interfejsu desktop.}
\end{minipage}
\hfill
\begin{minipage}[t]{0.5\textwidth}
\vspace{0pt}
\subsubsection*{Wersja Desktop}
Według potrzeb \textbf{Persony 1 oraz 2} projekt skupia się na wykorzystaniu szerokości ekranu, aby umożliwić:

\begin{itemize}[label=\textbullet, topsep=10pt]
    \item Podobieństwo wersji desktopowej i wersji mobilnej wraz z łatwością użytkowania.
    \item Sidebar z osobnym miejscem na dodanie lub przegląd zadań oraz główny panel z listą zadań.
    \item Dodatkowe wskazówki ekranowe.
\end{itemize}
\end{minipage}

## Uzasadnienie rozwiązań na etapie szkicowania
* **Prostota**: Zrezygnowano ze skomplikowanych menu na rzecz czystego widoku listy, co realizuje zasadę prostoty UI.
* **Elastyczność**: Wprowadzono modularny układ, co ułatwia późniejszą implementację funkcji dodawania, edycji i usuwania zadań.
