# Tukki web interface description

This document contains a general description of architecture and techniques of the frontend of the Tukki web interface for the program administrator. Document should be kept up to date. In order to understand the document, it would be useful to know the basics Angular's general concepts, such as *module* (or more precisely *ngModule*), *component*, *template* and *service*. You can read about these, for example in
[Angular official documentation](https://angular.io/guide/architecture).
In file names is used
[Angular recommendations](https://angular.io/guide/styleguide#naming), as well as
[in overall application structure](https://angular.io/guide/styleguide#overall-structural-guidelines).

## Table of contents

- [Techniques used](#techniques-used)
- [Main modules](#main-modules)
- [Components](#components)
- [Services](#services)
- [Inter-component communication](#inter-component-communication)
- [Theme and styles](#theme-and-styles)
- [Language and translations](#language-and-translations)
- [Project directory structure](#project-directory-structure)
- [Creating new tests](#create-new-tests)
- [ESLint](#eslint)
- [Programming style](#programming-style)
- [Troubleshooting](#troubleshooting)


## Techniques used

Techniques used to create the web interface. Most of these comes with Angular.

- [Angular Framework 16.2](https://angular.io/) - Used web frontend framework.
- HTML - Template definition.
- [SASS / SCSS](https://sass-lang.com/) - Used in style definitions. CSS preprocessing languages, used to translate style sheets made into CSS.
- [TypeScript 5.1](https://www.typescriptlang.org/) - JavaScript superset with type definitions.
- [Angular Material](https://material.angular.io/) - Component library for user interface elements.
- [Angular Router](https://angular.io/guide/router) - Routing and navigation.
- [Angular CLI](https://angular.io/cli) - Command line tool.
- [Angular Reactive Forms](https://angular.io/guide/reactive-forms) - Used for application forms.
- [Material Icons](https://fonts.google.com/icons)
- [RxJS](https://rxjs.dev/) - Library for implementing reactive programming using observables.
- [Compodoc](https://compodoc.app/) - Documentation generation.
- [NgxEditor](https://www.npmjs.com/package/ngx-editor) - Rich-text editor component.
- [Npm 9.8](https://www.npmjs.com/) - Package management.
- [Node.js 20.5](https://nodejs.org/en) - Mm. For running the development server.
- [Jasmine 4.3](https://jasmine.github.io/) - Testing framework for unit tests.
- [Karma 6.4](https://karma-runner.github.io/latest/index.html) - Test execution environment that works with Jasmine.
- [Git](https://git-scm.com/) - Version control.
- [ESLint](https://eslint.org/) - Static code analysis.


## Application architecture

![Application architecture schematic](Tukki-web-UI-architecture.svg)

The diagram shows the architecture of the application. The image can be viewed in the file documentation/description/Tukki-web-UI-architecture.svg. Arrows between modules point to the module in which it is imported. Between components
the parent component points to the child. The following sections describe
the application units shown in the figure. Their descriptions are also documented in in their source code files. They can be read from the automatically generated Compodoc -documentation by opening the file documentation/index.html in a web browser. 

## Main modules

The application consists of different Angular main modules, each in its own directory. In addition to these main modules, the different packages contain many modules of their own. The main modules typically contain the following files:

- **\*.module.ts** - Module definitions except for routing definitions.
- **\*.module.routing.ts** - Routing specifications provided by the module.
- **\*.models.ts** - Models used by the module, typically interfaces,
which are exported for use elsewhere in the application.
- **\*.service.ts** - Service provided by the module.
- Components that are in their own subdirectories.

### The application consists of the following main modules

#### app module

The root module of the application, which is loaded first and where the other modules are defined. Located in the **/src/app** directory. Contains subdirectories for other modules. The components used by the app component are in the core module.

#### core module

The core functionality of the application. Imported only in app.module. Contains the components used by the app module, such as *header* and *footer* and common view components such as *home* and *Page not found*, common services like auth.service and error.service. Also includes http-interceptor.ts, which logs HTTP calls.

#### Feature modules

Other application functionality is grouped by responsibility into these modules.  With the exception of the shared module all modules contains a service file and a routing module.

  - **ticket module** - Functionality related to tickets / questions,
  such as ticket listing, ticket and FAQ display and handling. Subdirectory
  *components* contains the non-routed components used in the module,
  such as the *comment* which is a comment of a ticket.

- **user module** - User-related functionality, such as the login view,
  display and manipulation of user profiles.

  - **course module** - Course related functionality, such as join course -view, as well as handling of course settings and ticket bases.

#### shared module

Contains features used in several other modules. Common *Material* theme imports are in  separate **material.module** -file. The **components** subdirectory contains many of the components used by different views. The module also contains pipes and directives.


## Components

Each component is responsible for a specific part of the user interface. App.module contains a root component *AppComponent*, which serves as the basis for the application view, and on which, depending on the routing, the corresponding view component is rendered.

In addition to these components, there are components corresponding to a more limited part of the UI components, such as a header or ticket's comment. Components may contain other components. Components belong to a specific module and are located in their directory in their own subdirectory.

Component directories usually contain the following files:

- **\*.component.ts** - The definition of the component, and it's TypeScript class, which handles the logic needed to display the component.

- **\*.component.html** - The template associated with the component, according to which the component view of the component is rendered. 

- **\*.component.scss** - The SCSS / SASS style definitions used in the template.

- **\*.component.spec.ts** - The component's Jasmine tests.

- **\*.dummydata.ts** - Data used by the tests.


## Services

Contain functionality that is not directly related to the interface being displayed. All communication with the backend takes place in the services. Common servicet are in the directory
**/src/app/core/services**, with feature modules each having their own except for the shared.module. The services are in *.service.ts files. In the same directory also contains the corresponding *.service.spec.ts file with the service tests.

### The different services and their responsibilities

#### auth service

Functionality related to user authentication, such as logging in and processing of related data. These include, for example, the status of the login and the logged-in information about the user. The information is retrieved from the server and always set in store service whenever the routing changes. Users are identified by cookies, which are used to automatically from a web interface perspective.

#### store service

This is where global, session-time information about RxJS behavior subjects is stored, which is intended to be available to all components and services. Such information is, for example, the logged-in user information.
[Information stored over sessions](#information-stored-over-sessions).

#### error service

Errors in the services are first passed here, where they are logged with console.log. 403 i.e. *No rights* error conditions are routed from here to the corresponding error view. Errors are re-thrown, allowing components to catch them and present them to the user or take other actions if necessary. The service also has the possibility to generate errors for testing purposes. HTTP calls are logged by *http-interceptor*.

#### utils service

Utility functions that are not directly related to the responsibilities of other services.

### Feature module services

#### ticket service

Handles functionality related to tickets, i.e. questions, such as handling tickets and their comments and attachments.

#### course service

Handles functionalities related to courses, such as course retrieval, handling ticket bases and importing and exporting course data to files.

#### user service

Handles the processing of user profile data on the server such as settings, data upload and data deletion.


## Communication between parts

Communication between parent and child components is done mainly with direct Angular's @Input and @Output decorators. Global, session-wide state is stored in the [store service](#storeservice) behavior subjects via method calls. Entities injecting these services receive this information via method calls, which return typically observables. Global state is for example the state of login and messages passed between components that are not direct relatives.

Components communicate other information to services via method calls and receive return values, which typically are promises. Information stored across sessions is stored in local storage, which can be found in documentation/description/local-storage.md. This is not used much in the application.

## Teema ja tyylit

Tyylimäärittelyissä käytetään [SASS / SCSS:ää.](https://sass-lang.com/). Yleiset
tyylimäärittelyt ovat hakemistossa **src/styles/**. Sovellus käyttää
[Angular Material](https://material.angular.io/) -kirjaston kustomoitua teemaa,
jonka määrittelyt ovat tiedostossa
**custom-theme.scss**. [Tietoa teeman muokkaamisesta](https://material.angular.io/guide/theming).

Kaikkiin templateihin vaikuttavat määrittelyt ovat tiedostossa **styles.scss**.
Se sisältää kaikkialla sovelluksessa käytettyjä CSS -luokkia, joiden nimet ovat
*.theme-* -alkuisia. **variables.scss** sisältää joitain globaaleja variableja,
jotka voi importoida tarvittaessa komponenttien tyylitiedostoissa. Niissä
sijaitsevat komponenttikohtaiset tyylit.

Tyylimäärittelysäännöt on pyritty esittämään SCSS-tiedostoissa siinä järjestyksessä
kuin niihin viittaavat elementit ovat komponentin templatessa. Mahdolliset
media queryt ovat tiedoston lopussa.


## Kieli ja käännökset

Angularissa käännökset voidaan natiivisti tehdä kahdella eri tavalla: yleisemmin
build-aikana tai ajonaikaisesti. Tässä sovelluksessa noudatetaan jälkimmäistä tapaa.
Kieli haetaan ja alustetaan ohjelman käynnistyessä tiedostossa **src/app/app.initializers.ts**.
Käännöksen vaihtaminen ajon aikana aiheuttaa aina sovelluksen uudelleenkäynnistyksen.
Tämä on normaalia. Kielen valinnan logiikka, joka tarkistetaan tässä järjestyksessä
sovelluksen alustuksessa:
1. Käyttäjän valikon kautta valitsema.
2. URL-parametrina asetettu. Yleensä LTI-kautta upotuksessa.
3. Oletus, joka upotuksessa on englanti ja muulloin suomi.

Englanninkieliset käännökset sijaitsevat
tiedostossa **src/assets/en-US.json**. Käännökset ovat muodossa:

  ```"Suomenkielinen käännösavain": "Englanninkielinen käännös"```

Suomenkielinen, alkuperäinen teksti on komponenttien templateissa tai komponentin
koodissa. Käännös haetaan käännösavaimeen viittaamalla. Templatessa tämä tapahtuu
yleensä *i18n* - tai sen alkuisella alkuisella tunnisteella tai Angularin
interpolaatiolla komponentin muuttujaan, jossa käännös tapahtuu yleensä
[$localize](https://angular.io/api/localize) -funktiolla.


## Tietosuojaseloste

Tukki-tikettijärjestelmän tietosuojaseloste sijaitsee tiedostossa 
**src/app/core/footer/privacy-modal/privacy-modal.component.html**. Oletuksena
tietosuojaseloste sisältää Digivertaisverkko-hankkeen oman tietosuojaselosteen.
Jos järjestelmä otetaan muualla käyttöön, niin tietosuojaseloste tulee muokata
sisältämään käyttöönottaneen organisaation tiedot.


## Projektin hakemistorakenne

Tärkeitä tai huomionarvoisia  tiedostoja ja hakemistoja.

- **angular.json** - [Angularin asetuksia](https://angular.io/guide/workspace-config).
Mm. eri tiedostojen sijaintien määrittely.
- **package.json** - [Node.js -asetukset](https://angular.io/guide/npm-packages),
kuten npm -skriptien määrittelyt ja pakettiriippuvuudet.
- **tsconfig.json** - [TypeScript -käännösasetukset](https://angular.io/guide/typescript-configuration). 
- **documentation/** - [Compodocilla](https://compodoc.app/) generoitu dokumentaatio.
- **.eslintrc.json** - ESLint asetukset.
  - **index.html** - Avaamalla tämän tiedoston selaimella voi lukea dokumentaatiota.
  - **kuvaus/** - Hakemisto, jossa kuvailevaa dokumentaatiota:
    - **kuvaus.md** - Tämä tiedosto.
    - **local-storage.md** - Local storageen tallennettavat muuttujat.
- **src/** - Sovelluksen lähdekoodi.
  - **app/** - [App moduulin](#app--moduuli) hakemisto. Sisältää myös muiden
  moduulien alihakemistot.
  - **assets/** - Logot, ikonit ja [käännökset](#kieli-ja-käännökset).
  - **styles/** - Teeman määrittely ja globaalit [tyylimäärittelyt](#teema-ja-tyylit).
  - **main.ts** - Täällä asetettu, että production buildissa ei näytetä logeja.
  - **index.html** - Sovelluksen selain-title, fonttien, faviconin osoitteet,
  sekä mitä näytetään, jos selaimessa ei ole JavaScript -käytössä.
  - **environments/** - Environment -variablet. Sisältää sovelluksen nimen ja
  base URL:n. Tiedostot:
    - **environments.ts** - Development build:lle.
    - **environments.prod.ts** - Production build:lle.

## Uusien testien tekeminen

- Komponenttitesteissä servicen palauttama data ja servicetesteissä palvelimen
palauttama on hyvä laittaa moduulin [moduuli nimi].dummydata.ts -tiedostoon ja
käyttää oikeita interfaceja [moduulin nimi].models.ts -tiedostoista.
- Käyttäjätietoja on saatavilla auth.dummydata.ts -tiedostosta.
- Jos testattava yksikkö käyttää store servicen -tietoja, on hyvä injektoida
testissä oikeaa service ja tallentaa haluttu data sinne.
- Usein on helpointa käyttää funktioita fakeAsync ja tick.
- Näkymän päivitys voi joissain komponenteissa tarvita toisen detectChanges -
kutsun.

## ESLint

- ESLintillä tehdään virheiden etsintää staattisella koodinanalyysillä.
- Voi ajaa komennolla: "ng lint" tai "npm run lint" tai käyttää koodieditorilla (voi tarvita ESLint -pluginin).
- Asetukset: /.eslintrc.json.
  - Voi halutessa määritellä uusia sääntöjä.

## Ohjelmointityyli

- Pyritään noudattamaan yleisiä Angular, HTML, CSS/SCSS ja Typescript -tyyli-
suosituksia.
- Rivin pituus pyritään rajoittaa 80 merkkiin ja voivat olla enintään 90 merkkiä
käännöksiä lukuunottamatta.
- Jos HTML-elementtien määrittelyt ovat pituudeltaan yli tämän rajan,
järjestetään ne allekkain 1 per rivi aakkosjärjestyksessä.
- SCSS -attribuutit aakkosjärjestyksessä.
- **/.editorconfig** sisältää yleisimpiä asetuksia, osalla editoreista tämän
käyttäminen vaatii pluginin. Kkts. [editorconfig.org/](https://editorconfig.org/)

## Vianmääritys

### Virhetilanteissa

- Tarkista, ilmeneekö virheitä automaattitesteissä.
- Tarkkaile virheilmoituksia selainkonsolissa / browser console:ssa. Developer
buildissa myös tavalliset console.log -logitukset ovat käytössä toisin kuin
production buildissa. Tällöin mm. kaikki HTTP-kutsut logitetaan.
  - Lisää tarvittaessa omia console.log -logituksia.

### Jokin elementti näyttää päivityksen jälkeen väärältä

Jos kyseessä on Angular Materialin -elementti, voi tämä johtua muutoksesta
Angularin generoimassa CSS-luokkien nimissä. Tyylitiedostot sisältävät joitain
muokkauksia, joissa käytetään näitä luokkia. Esimerkkinä alla *listing* -komponentin
tyylitiedosto muuttaa taulukon sarakkeen otsikon väriä, jonka mukaan lajittelu tehdään.

```
:host ::ng-deep .mat-sort-header-content {
  color: #595959;
}
```
*.mat-sort-header-content* on Angularin generoima luokka, jota ei ole templatessa.
Pelkästään templatessa oleviin elementteihin viittaamalla ei näissä tapauksissa
saataisi haluttua vaikutusta. Niihin viittaaminen voi vaatia toimiakseen
**::ng-deep** -yhdistäjän. Jos tämä määritys lakkaisi toimimasta, kannattaa
ensimmäisenä tarkastaa selaimen kehittäjätyökalulla, onko nimeämisessä tai
elementin rakenteessa tapahtunut muutoksia. 

### Child komponentin sisältö ei päivity kun pitäisi

Jos komponentin *.component.ts -tiedostossa on määritelty:

```changeDetection: ChangeDetectionStrategy.OnPush```

niin esimerkiksi observabjela kuunneltaessa näkymän päivittyminen pitää
tehdä manuaalisesti ChangeDetectorRef -luokan olion detectChanges() metodikutsulla.

[Takaisin alkuun](#tukki-web-käyttöliittymän-kuvaus)
