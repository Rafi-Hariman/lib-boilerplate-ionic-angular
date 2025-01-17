import { NgModule, isDevMode } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthService } from './z-service/auth/auth.service';
import { DataService } from './z-service/data/data.service';
import { FirebaseService } from './z-service/firebase/firebase.service';
import { HtmlModule } from './z-html-service/html.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingComponent } from './auth/landing/landing.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AuthModule, getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai-preview';
import { environment } from '../environments/environment';
import { AuthGuardService } from './z-service/auth/auth-guard.service';
import { FcmTokenService } from './z-service/token/fcm-token.service';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { NotificationService } from './z-service/notif/notification.service';
import { ApiFirebaseService } from './z-service/firebase/api-firebase.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    // LoginComponent,
    // RegisterComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HtmlModule,
    AngularFireMessagingModule,
    AuthModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    AuthGuardService,
    DataService,
    FirebaseService,
    ApiFirebaseService,
    FcmTokenService,
    NotificationService,
    // provideFirebaseApp(() => initializeApp({"projectId":"lib-pill-notification-angular","appId":"1:392629802330:web:221efc5a8afd0565470f63","databaseURL":"https://lib-pill-notification-angular-default-rtdb.asia-southeast1.firebasedatabase.app","storageBucket":"lib-pill-notification-angular.firebasestorage.app","apiKey":"AIzaSyCJ14cjEAtXP2-9L84FmJ_R0RuYSuRh8rI","authDomain":"lib-pill-notification-angular.firebaseapp.com","messagingSenderId":"392629802330","measurementId":"G-RX5QSJK4YQ"})),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,

    // provideAppCheck(() => {
    //   // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
    //   const provider = new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key */);
    //   return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
    // }),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideVertexAI(() => getVertexAI()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
