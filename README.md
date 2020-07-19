# SsrWithNgx

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

This project uses SSR with Angular Universal 
build - `npm run build:ssr` and serve - `npm run serve:ssr`

## Dependencies

ngx-translate
`npm install @ngx-translate/core @ngx-translate/http-loader --save`
cache implementaion
`npm install ngx-translate-cache --save`
added SSR
`ng add @nguniversal/express-engine --clientProject ssr-with-ngx`
used the below helper to switch between client and server
`isPlatformBrowser(this.platform)`

## Improvements
use `transferState` to Improve Performance
[Making an extra request to load language translations that are already loaded]

use md5 hashing for translation files to auto refresh browser cache
`npm install md5 -D`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
Awesome article - https://indepth.dev/implementing-multi-language-angular-applications-rendered-on-server/
Also check - https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular8-app-with-ngx-translate
