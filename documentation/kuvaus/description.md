# Tukki web interface description

This document contains a general description of architecture and techniques of
the frontend of the Tukki web interface for the program administrator. Document
should be kept up to date. In order to understand the document, it would be
useful to know the basics Angular's general concepts, such as *module* (or more
precisely *ngModule*), *component*, *template* and *service*. You can read about
these, for example in
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

![Application architecture schematic](Tukki-web-UI-arkkitehtuuri.svg)

The diagram shows the architecture of the application. The image can be viewed
in the file documentation/description/Tukki-web-UI-architecture.svg. Arrow
between modules point to the module in which it is imported. Between components
the parent component points to the child. The following sections describe
the application units shown in the figure. Their descriptions are also documented
in in their source code files. They can be read from the automatically generated
Compodoc -documentation by opening the file documentation/index.html in a web
browser. 

## Main modules

The application consists of different Angular main modules, each in its own
directory. In addition to these main modules, the different packages contain
many modules of their own. The main modules typically contain the following files:

- **\*.module.ts** - Module definitions except for routing definitions.
- **\*.module.routing.ts** - Routing specifications provided by the module.
- **\*.models.ts** - Models used by the module, typically interfaces,
which are exported for use elsewhere in the application.
- **\*.service.ts** - Service provided by the module.
- Components that are in their own subdirectories.

### The application consists of the following main modules

#### app module

The root module of the application, which is loaded first and where the other
modules are defined. Located in the **/src/app** directory. Contains subdirectories
for other modules. The components used by the app component are in the core module.

#### core module

The core functionality of the application. Imported only in app.module. Contains
the components used by the app module, such as *header* and *footer* and common
view components such as *home* and *Page not found*, common services like auth.service
and error.service. Also includes http-interceptor.ts, which logs HTTP calls.

#### Feature modules

Other application functionality is grouped by responsibility into these modules.
With the exception of the shared module all modules contains a service file and a routing module.

  - **ticket module** - Functionality related to tickets / questions,
  such as ticket listing, ticket and FAQ display and handling. Subdirectory
  *components* contains the non-routed components used in the module,
  such as the *comment* which is a comment of a ticket.

- **user module** - User-related functionality, such as the login view,
  display and manipulation of user profiles.

  - **course module** - Course related functionality, such as join course -view,
  as well as handling of course settings and ticket bases.

#### shared module

Contains features used in several other modules. Common *Material* theme imports
are in  separate **material.module** -file. The **components** subdirectory
contains many of the components used by different views. The module also contains
pipes and directives.


## Components

Each component is responsible for a specific part of the user interface. App.module
contains a root component *AppComponent*, which serves as the basis for the 
pplication view, and on which, depending on the routing, the corresponding view
component is rendered.

In addition to these components, there are components corresponding to a more
limited part of the UI components, such as a header or ticket's comment.
Components may contain other components. Components belong to a specific module
and are located in their directory in their own subdirectory.

Component directories usually contain the following files:

- **\*.component.ts** - The definition of the component, and it's TypeScript class, which handles the logic needed to display the component.

- **\*.component.html** - The template associated with the component, according to which the component view of the component is rendered. 

- **\*.component.scss** - The SCSS / SASS style definitions used in the template.

- **\*.component.spec.ts** - The component's Jasmine tests.

- **\*.dummydata.ts** - Data used by the tests.


## Services

Contain functionality that is not directly related to the interface being
displayed. All communication with the backend takes place in the services.
Common servicet are in the directory
**/src/app/core/services**, with feature modules each having their own except
for the shared.module. The services are in *.service.ts files. In the same
directory also contains the corresponding *.service.spec.ts file with the
service tests.

### The different services and their responsibilities

#### auth service

Functionality related to user authentication, such as logging in and processing
of related data. These include, for example, the status of the login and the
logged-in information about the user. The information is retrieved from the
server and always set in store service whenever the routing changes. Users are
identified by cookies, which are used to automatically from a web interface
perspective.

#### store service

This is where global, session-time information about RxJS behavior subjects is
stored, which is intended to be available to all components and services. Such
information is, for example, the logged-in user information.
[Information stored over sessions](#information-stored-over-sessions).

#### error service

Errors in the services are first passed here, where they are logged with
console.log. 403 i.e. *No rights* error conditions are routed from here to the
corresponding error view. Errors are re-thrown, allowing components to catch
them and present them to the user or take other actions if necessary. The
service also has the possibility to generate errors for testing purposes.
HTTP calls are logged by *http-interceptor*.

#### utils service

Utility functions that are not directly related to the responsibilities of other
services.

### Feature module services

#### ticket service

Handles functionality related to tickets, i.e. questions, such as handling
tickets and their comments and attachments.

#### course service

Handles functionalities related to courses, such as course retrieval, handling
ticket bases and importing and exporting course data to files.

#### user service

Handles the processing of user profile data on the server such as settings,
data upload and data deletion.


## Communication between parts

Communication between parent and child components is done mainly with direct
Angular's @Input and @Output decorators. Global, session-wide state is stored in
the [store service](#storeservice) behavior subjects via method calls. Entities
injecting these services receive this information via method calls, which return
typically observables. Global state is for example the state of login and
messages passed between components that are not direct relatives.

Components communicate other information to services via method calls and receive
return values, which typically are promises. Information stored across sessions
is stored in local storage, which can be found in documentation/description/local-storage.md.
This is not used much in the application.

## Theme and styles

Style definitions use [SASS/SCSS.](https://sass-lang.com/). General
style definitions are in the **src/styles/** directory. The application uses
[Angular Material](https://material.angular.io/) library's custom theme,
whose specifications are in the file **custom-theme.scss**.
[About customizing the theme](https://material.angular.io/guide/theming).

The specifications affecting all templates are in **styles.scss**.
It contains the CSS classes used throughout the application, whose names are
*.theme-*. **variables.scss** contains some global variables,
which can be imported into component style files as needed. They contain
component-specific styles.

The style definition rules are presented in the SCSS files in the order in which
the elements they are referring appear in component templates. Possible media
queries are at the end of the files.

## Language and translations

In Angular, translations can be done natively in two different ways: at build
time or at runtime. In this application, the latter is used. The language is
fetched and initialized at startup in the file **src/app/app.initializers.ts**.
Changing the translation at runtime always causes the application to restart.
This is normal. Language selection logic to be checked in this order
at application initialization:
1. Selected by the user through the menu.
2. Set as a URL parameter. Usually in the LTI path when embedded.
3. Default, which while embedded is English and otherwise Finnish.

The English translations are located in the
file **src/assets/en-US.json**. The translations are in the format:

  ```"Finnish translation key": "English translation"```

The Finnish, original text is in the component template or in the component's
code. The translation is retrieved by referring to the translation key. In
templates this is done usually with tag *i18n*  or with Angular's interpolation
to a component variable, where the translation is usually done by [$localize](https://angular.io/api/localize)
function.


## Project directory structure

Important or noteworthy files and directories.

- **angular.json** - [Angular settings](https://angular.io/guide/workspace-config). For example, defining the locations of different files.
- **package.json** - [Node.js options](https://angular.io/guide/npm-packages), such as npm script definitions and package dependencies.
- **tsconfig.json** - [TypeScript compiler settings](https://angular.io/guide/typescript-configuration). 
- **documentation/** - Documentation generated by [Compodoc](https://compodoc.app/).
- **.eslintrc.json** - ESLint settings.
  - **index.html** - Open this file in browser to read the documentation.
  - **description/** - Directory containing descriptive documentation:
    - **description.md** - This file.
    - **local-storage.md** - Variables to be stored in local storage.
- **src/** - Application source code.
  - **app/** - [App module](#app--module) directory. Also contains other   subdirectories of other modules.
  - **assets/** - Logos, icons and [translations](#languages-and-translations).
  - **styles/** - Theme definition and global [style definitions](#theme-and-styles).
  - **main.ts** - Set here to not show logs in production build.
  - **index.html** - Application browser title, fonts, favicon addresses,
  and what to show if the browser does not have JavaScript enabled.
  - **environments/** - Environment variable. Contains the application name and  base URL. Files:
    - **environments.ts** - For the development build.
    - **environments.prod.ts** - For the production build.

# Making new tests

- In component tests, data returned by the service and in service tests, data
returned by the server should be put in the module [module name].dummydata.ts file and
use the correct interfaces from the [module name].models.ts files.
- User data is available in auth.dummydata.ts file.
- If the unit under test uses store service data, it is recommended to inject
the real service in the test and store the desired data there.
- It is often easiest to use the functions fakeAsync and tick.
- Updating the view may require another detectChanges -call.

## ESLint

- ESLint is used for error detection using static code analysis.
- Can be run with "ng lint" or "npm run lint" or run with a code editor (may require ESLint plugin).
- Settings: /.eslintrc.json.
  - Can define new rules if desired.

## Programming style

- Aim to comply common Angular, HTML, CSS/SCSS and Typescript style guides and
recommendations.
- Line lengths have soft limit of 80 characters and hard limit of 90 characters
except for translations.
- If HTML element specifications are longer than this limit,
they will be ordered 1 per line, alphabetically.
- SCSS attributes in alphabetical order.
- **/.editorconfig** contains the most common settings, some editors have this
requires a plugin to use. See [editorconfig.org/](https://editorconfig.org/)
