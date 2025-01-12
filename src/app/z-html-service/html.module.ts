import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { RefreshComponent } from './refresh/refresh.component';
import { FabComponent } from './fab/fab.component';
import { RegisterComponent } from '../auth/register/register.component';
import { LoginComponent } from '../auth/login/login.component';
import { RouterModule } from '@angular/router';
import { VarifyEmailComponent } from '../auth/varify-email/varify-email.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ToastService } from '../z-service/html/toast.service';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../auth/forgot-password/reset-password/reset-password.component';
import { HomeServiceComponent } from './UI/home-ui-service/home-service/home-service.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    RefreshComponent,
    FooterComponent,
    FabComponent,
    RegisterComponent,
    LoginComponent,
    VarifyEmailComponent,
    BreadcrumbsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeServiceComponent,

  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,


  ],
  exports: [
    FooterComponent,
    FabComponent,
    RegisterComponent,
    LoginComponent,
    VarifyEmailComponent,
    BreadcrumbsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeServiceComponent,
    HeaderComponent,
    LoaderComponent,
    RefreshComponent,
    FooterComponent,
  ],
  providers: [
    ToastService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HtmlModule { }
