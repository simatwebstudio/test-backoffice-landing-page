# Font locali richiesti

Inserire in questa cartella esattamente questi tre file, senza modificarne il nome:

| File richiesto | Famiglia e variante | Contenuto |
| --- | --- | --- |
| `inter-latin-400-800.woff2` | Inter Variable, stile normale | Pesi da 400 a 800, subset Latin |
| `bebas-neue-latin-400.woff2` | Bebas Neue Regular, stile normale | Peso 400, subset Latin |
| `caveat-latin-400-700.woff2` | Caveat Variable, stile normale | Pesi da 400 a 700, subset Latin |

Il subset Latin include i caratteri necessari per italiano e inglese, comprese le lettere accentate e il simbolo dell'euro. Il subset Latin Extended separato non è necessario per i contenuti attuali del sito.

## Download diretto

- Inter Variable: `https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@latest/latin-wght-normal.woff2`
- Bebas Neue Regular: `https://cdn.jsdelivr.net/fontsource/fonts/bebas-neue@latest/latin-400-normal.woff2`
- Caveat Variable: `https://cdn.jsdelivr.net/fontsource/fonts/caveat:vf@latest/latin-wght-normal.woff2`

Dopo ogni download, rinominare il file con il nome indicato nella tabella. Inter e Caveat possono essere scaricati entrambi con il nome generico `latin-wght-normal.woff2`, quindi vanno rinominati prima di scaricare il successivo per evitare sovrascritture.

I file devono essere realmente in formato WOFF2. Non rinominare file TTF come WOFF2.

Conservare nella cartella anche le licenze distribuite con ciascun font, ad esempio:

- `OFL-Inter.txt`;
- `OFL-Bebas-Neue.txt`;
- `OFL-Caveat.txt`.

Le dichiarazioni `@font-face` sono già presenti all'inizio di `styles.css`. Dopo aver copiato i tre file, verificare nella scheda Network del browser che vengano restituiti con stato 200 e che non compaiano richieste verso `fonts.googleapis.com` o `fonts.gstatic.com`.
