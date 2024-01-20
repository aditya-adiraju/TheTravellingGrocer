import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {importProvidersFrom} from "@angular/core";
import {SampleService} from "./app/services/sample.service";

const routes: Routes = [];

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: 'photoUrl',
      useValue: 'https://picsum.photos',
    },
    {provide: SampleService, useClass: SampleService },
    importProvidersFrom(RouterModule.forRoot([...routes])),
    importProvidersFrom(HttpClientModule)
  ],
}).catch(err => console.error(err));
