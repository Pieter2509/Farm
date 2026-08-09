# 🌾 Mijn Boerderij

Een rustig boerderijspel voor telefoon en computer. Ploegen, zaaien, oogsten,
verkopen en dieren houden — zonder advertenties, zonder aankopen, zonder wachttijden
die je kunt afkopen.

Het hele spel zit in **één bestand**: `index.html`. Geen installatie, geen bouwstap.

---

## 1. Online zetten met GitHub Pages

Je hebt al een repository die `Farm` heet. 

1. Open je repository op github.com en klik op **Add file → Upload files**.
2. Sleep `index.html` en `README.md` erin en klik onderaan op **Commit changes**.
3. Ga naar **Settings** → in het linkermenu naar **Pages**.
   - *Source*: **Deploy from a branch**
   - *Branch*: **main**, map **/ (root)** → **Save**
4. Wacht een minuutje en ververs. Bovenaan staat je adres:

   ```
   https://JOUWNAAM.github.io/Farm/
   ```

Let op de hoofdletter F — GitHub Pages let daarop.

## 2. Als app op je beginscherm

| Toestel | Hoe |
|---|---|
| iPhone / iPad (Safari) | Deelknop → **Zet op beginscherm** |
| Android (Chrome) | Menu ⋮ → **Toevoegen aan startscherm** |
| Windows / Mac (Chrome, Edge) | Adresbalk → installeer-icoontje, of Menu → **Installeren** |

Het spel opent dan schermvullend, zonder adresbalk.

---

## 3. Zelfde boerderij op telefoon én pc

Standaard bewaart het spel je voortgang in de browser waarin je speelt. Telefoon en
pc zijn dan aparte boerderijen. Wil je overal dezelfde boerderij, dan heb je een klein
sync-servertje nodig. Dat is gratis en je regelt het één keer.

### Stap 1 — Cloudflare-account

Maak een gratis account op [dash.cloudflare.com](https://dash.cloudflare.com).

### Stap 2 — Opslagruimte aanmaken

Ga naar **Storage & Databases → KV → Create instance**.
Noem 'm `farm-saves` en klik **Add**.

### Stap 3 — Worker aanmaken

1. Ga naar **Compute (Workers) → Create → Start from Hello World → Deploy**.
   Noem 'm bijvoorbeeld `farm-sync`.
2. Klik op **Edit code**, verwijder alles wat er staat, plak de inhoud van
   `worker.js` uit deze repository en klik **Deploy**.
3. Ga naar het tabblad **Settings → Bindings → Add → KV namespace**:
   - *Variable name:* `SAVES` (precies zo, in hoofdletters)
   - *KV namespace:* `farm-saves`
   - **Deploy** opnieuw.

Je krijgt een adres zoals `https://farm-sync.jouwnaam.workers.dev`.

### Stap 4 — Aanzetten in het spel

Open `index.html` en zet bovenin, bij de instellingen, je adres neer met een
schuine streep op het eind:

```js
const SYNC_URL = "https://farm-sync.jouwnaam.workers.dev/";
```

Commit het bestand. Klaar.

### Stap 5 — Je apparaten koppelen

1. Open het spel op je pc en klik op **💾**. Daar staat je **boerderijcode**
   (bijvoorbeeld `K7PQ2M9X`). Kopieer die.
2. Open het spel op je telefoon, klik **💾 → Andere code invullen** en vul dezelfde
   code in.

Vanaf nu synchroniseert het spel automatisch: bij het openen, bij het wegleggen,
en elke minuut tijdens het spelen. De versie die het laatst is bijgewerkt wint,
dus sluit het spel netjes af op het ene apparaat voor je op het andere verder gaat.

> **Geen zin in een server?** Gebruik dan **💾 → Deel-link maken**. Je krijgt een
> link met je hele boerderij erin; open die op je andere apparaat en je speelt daar
> verder. Handmatig, maar het werkt meteen.

---

## 4. Updaten zonder je voortgang te verliezen

Je voortgang staat in de `localStorage` van je browser, gekoppeld aan het webadres.

- ✅ Je mag `index.html` zo vaak vervangen als je wilt — je boerderij blijft staan.
- ✅ Nieuwe gewassen of dieren toevoegen werkt gewoon door: de functie `migreer()`
  vult ontbrekende velden in oude opgeslagen spellen automatisch aan.
- ⚠️ Verander **nooit** `SAVE_KEY` (staat bovenin als `"boerderij"`).
- ⚠️ Verander ook de naam van de repository niet — dan verandert het webadres,
  en dus de plek waar je voortgang ligt.

**Zo update je:** open `index.html` op GitHub → potloodje ✏️ → plak de nieuwe code →
**Commit changes**. Binnen een minuut staat het online.

## 5. Back-up

Druk op **💾** rechtsboven:

- **Back-up kopiëren** — een lange tekstcode van je hele boerderij. Bewaar 'm in je notities.
- **Back-up terugzetten** — plak die code terug, waar dan ook.
- **Opnieuw beginnen** — wist alles en start vers.

Doe dit even voor een grote wijziging, dan kan er nooit iets misgaan.

---

## Hoe het spel werkt

| Stap | Wat je doet |
|---|---|
| 🚜 Ploegen | Sleep de tractor op een groen, overwoekerd veld |
| 🌱 Zaaien | Sleep een zaadje op een geploegd veld (kost munten) |
| ⏳ Groeien | Het gewas komt op en kleurt rijp; de teller loopt af |
| 🧺 Oogsten | Tik op het gouden mandje; de oogst gaat naar de schuur |
| 💰 Verkopen | Verkoop in de schuur per stuk of alles tegelijk |
| 🐔 Dieren | Koop ze in de winkel; ze krijgen hun eigen wei en leveren producten |

Elk level ontgrendelt nieuwe gewassen en dieren. Extra akkers koop je op het veld
met de **＋ land**-tegel, tot maximaal twaalf.

## Zelf aanpassen

Bovenin het `<script>`-blok staan twee overzichten die je vrij mag wijzigen:

- **`CROPS`** — gewassen: prijs, opbrengst, groeitijd, kleur, hoogte, plantdichtheid
- **`ANIMALS`** — dieren: prijs, product, opbrengst, wachttijd, benodigd level

Een nieuw gewas is één regel in `CROPS`. De winkel, de schuur, de gereedschapsriem
en de velden passen zich vanzelf aan.

Wil je de boerderij anders indelen? Kijk bij *ISOMETRIE* naar `AKKER_X`, `AKKER_Y`,
`RUIMTE` en `WEI_X` — daarmee schuif je de akkers en weides over het gras.
De huisjes en bomen staan in `bouwGebouwen()`.
