import { NgModule, PLATFORM_ID, Inject, Optional, getPlatform } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateCacheModule, TranslateCacheService, TranslateCacheSettings } from 'ngx-translate-cache';
import { Observable, of } from 'rxjs';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

import { readFileSync } from 'fs';
import { join } from 'path';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [HttpClient, PLATFORM_ID]
      }
    }),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: translateCachedFactory,
        deps: [TranslateService, TranslateCacheSettings]
      },
      cacheMechanism: 'Cookie'
    })
  ],
  exports: [TranslateModule]
})

export class I18nModule {
  constructor(
    translate: TranslateService,
    translateCacheService: TranslateCacheService,
    @Optional() @Inject(REQUEST) private req: Request,
    @Inject(PLATFORM_ID) private platform: any
  ) {
    if (isPlatformBrowser(this.platform)) {
      translateCacheService.init();
    }

    translate.addLangs(['en', 'bn']);

    const browserLang = (isPlatformBrowser(this.platform))
      ? translateCacheService.getCachedLanguage() || translate.getBrowserLang()
      : this.getLangFromServerSideCookie() || 'en';

    translate.use(browserLang.match(/en|bn/) ? browserLang : 'en');
  }

  getLangFromServerSideCookie(): any {
    if (this.req) {
      return this.req.cookies.lang;
    }
  }
}

export function TranslateLoaderFactory(httpClient: HttpClient, platform: any): any {
  return (isPlatformBrowser(platform))
    ? new TranslateHttpLoader(httpClient)
    : new TranslateFSLoader() ;
}

export function translateCachedFactory(
    translateService: TranslateService,
    translateCacheSettings: TranslateCacheSettings
  ): any {
  return new TranslateCacheService(translateService, translateCacheSettings);
}

export class TranslateFSLoader implements TranslateLoader {
  constructor(private prefix = './assets/i18n', private suffix = '.json') { }

  public getTranslation(lang: string): Observable<any> {
    const path = join(__dirname, '../browser', this.prefix, `${lang}${this.suffix}`);
    const data = JSON.parse(readFileSync(path, 'utf8'));

    return of(data);
  }
}
