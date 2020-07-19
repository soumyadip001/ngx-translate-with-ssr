import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  template: `
    <p>
      {{ 'chooseLang.helper' | translate }} :
      <select #langSelect (change)="translate.use(langSelect.value)" style="padding:5px">
        <option *ngFor="let lang of translate.getLangs()"
          [value]="lang"
          [attr.selected]="lang === translate.currentLang ? '' : null"
        > {{ lang }}</option>
      </select>
    </p>
  `,
  styles: [
  ]
})
export class SelectLanguageComponent {
  constructor(public translate: TranslateService) { }
}
