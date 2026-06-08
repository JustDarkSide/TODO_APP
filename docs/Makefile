SOURCES = 0_header.md \
		  1_zasady_dobrego_ui.md \
		  2_analiza_użytkowników.md \
		  3_tworzenie_prototypu.md \
		  4_tworzenie_prototypu_hi-fi.md \
		  5_testy_użyteczności.md \
		  6_implementacja_frontendowa.md \
		  7_testy_optymalizacja.md \
		  999_footer.md
# Nazwa pliku końcowego
OUTPUT = dokumentacja.pdf

ENGINE = pdflatex

all: $(OUTPUT)

run: $(OUTPUT)
	xdg-open $(OUTPUT)

$(OUTPUT): $(SOURCES)
	@echo "Łączenie i konwertowanie plików: $(SOURCES)..."
	pandoc $(SOURCES) -o $(OUTPUT) \
		--pdf-engine=$(ENGINE)
	@echo "Gotowe! Wygenerowano $(OUTPUT)."

clean:
	rm -f $(OUTPUT)

.PHONY: all clean
