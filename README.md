# Pizza 38 Landing Page

Sito statico vanilla HTML, CSS e JavaScript per Pizza 38, pizzeria artigianale a Bra.

## Struttura

- `index.html`: pagina principale con contenuto semantico, SEO di base, dati strutturati e asset locali.
- `styles.css`: reset, variabili, layout responsive, componenti e animazioni.
- `script.js`: menu mobile, stato header, anno corrente e funzione `isOpen()` per mostrare se il locale è aperto.
- `404.html`: pagina di errore coerente con l'identita visiva.
- `privacy.html`: informativa privacy bilingue IT/EN, collegata dal footer.
- `CNAME`: dominio personalizzato `pizza38.it` per GitHub Pages.
- `manifest.json`, `robots.txt`, `sitemap.xml`: file di supporto per browser, crawler e pubblicazione.
- `images/`: logo e immagini fotografiche del sito.
- `icons/`: favicon e icone PWA derivate dal logo.
- `fonts/`: file WOFF2 locali e relative istruzioni.

## Uso locale

Il sito non richiede build o dipendenze. Puoi aprire `index.html` direttamente nel browser oppure servirlo con un server statico se vuoi testare URL e file di supporto:

```bash
python -m http.server 8080
```

## Pubblicazione

Carica l'intera cartella su un hosting statico. Prima del deploy definitivo verifica il dominio in:

- `index.html` nel tag canonical e nei metadati Open Graph, se serve un URL assoluto;
- `robots.txt`;
- `sitemap.xml`.

Il dominio impostato è `https://pizza38.it/`.

Il file `CNAME` è già configurato con `pizza38.it`. Dopo il collegamento DNS e la generazione del certificato in GitHub Pages, verificare che l'opzione **Enforce HTTPS** sia attiva nelle impostazioni del repository.

## Asset e font

Le immagini sono locali e arrivano dal progetto originale. Il sito non carica pi&ugrave; Google Fonts ed &egrave; predisposto per usare tre file WOFF2 locali con `font-display: swap`:

- `fonts/inter-latin-400-800.woff2`;
- `fonts/bebas-neue-latin-400.woff2`;
- `fonts/caveat-latin-400-700.woff2`.

Le istruzioni complete sono disponibili in `fonts/README.md`. Finché i file non vengono aggiunti, il browser usa i fallback definiti nel CSS senza effettuare richieste a Google.

## Integrazioni esterne

La sezione contatti include uno screenshot della mappa collegato alla scheda Google Maps. Se in futuro verranno aggiunti analytics, pixel o altri script non tecnici, andranno collegati a un sistema di consenso cookie prima del caricamento.

## Note legali

La Privacy Policy è pubblicata in `privacy.html` e collegata nel footer. Descrive la configurazione senza cookie o tracciatori, con font locali e hosting tramite GitHub Pages. Prima del deploy devono essere inseriti i tre file WOFF2 indicati sopra. Se cambiano servizi esterni o modalità di trattamento, il testo deve essere verificato e aggiornato prima della pubblicazione delle modifiche.
