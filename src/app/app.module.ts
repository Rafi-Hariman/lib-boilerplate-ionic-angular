import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideClientHydration(withHttpTransferCacheOptions({
    includePostRequests: true
  }))],
  bootstrap: [AppComponent],

})
export class AppModule { }

