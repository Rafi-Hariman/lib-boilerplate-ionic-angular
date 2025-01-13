import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './auth/landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VarifyEmailComponent } from './auth/varify-email/varify-email.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { EditProfileComponent } from './z-html-service/UI/settings-ui-service/edit-profile/edit-profile.component';
import { SetnotificationComponent } from './z-html-service/UI/settings-ui-service/setnotification/setnotification.component';
import { PrivacyPoliceComponent } from './z-html-service/UI/settings-ui-service/privacy-police/privacy-police.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'varify-email',
    component: VarifyEmailComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'page/edit-profile',
    component: EditProfileComponent
  },
  {
    path: 'page/edit-notification',
    component: SetnotificationComponent,
  },
  {
    path: 'page/edit-policy',
    component: PrivacyPoliceComponent,
  },
  {
    path: 'page',
    loadChildren: () => import('../app/tabs/tabs.module').then(m => m.TabsPageModule)
  },

  {
    path: '**',
    redirectTo: 'landing',
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
