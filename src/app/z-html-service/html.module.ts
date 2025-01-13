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
import { NotificationComponent } from './notification/notification.component';
import { SettingsServiceComponent } from './UI/settings-ui-service/settings-service/settings-service.component';
import { EditProfileComponent } from './UI/settings-ui-service/edit-profile/edit-profile.component';
import { SetnotificationComponent } from './UI/settings-ui-service/setnotification/setnotification.component';
import { PrivacyPoliceComponent } from './UI/settings-ui-service/privacy-police/privacy-police.component';
import { RingtoneServiceComponent } from './UI/ringtone-ui-service/ringtone-service/ringtone-service.component';
import { EditPillComponent } from '../z-modal/edit-pill/edit-pill.component';
import { AddPillComponent } from '../z-modal/add-pill/add-pill.component';
import { DeletePillComponent } from '../z-modal/delete-pill/delete-pill.component';
import { DetailPillComponent } from '../z-modal/detail-pill/detail-pill.component';


@NgModule({
  declarations: [
    FooterComponent,
    SettingsServiceComponent,
    PrivacyPoliceComponent,
    RingtoneServiceComponent,
    EditPillComponent,
    AddPillComponent,
    DetailPillComponent,
    DeletePillComponent,
    SetnotificationComponent,
    NotificationComponent,
    HeaderComponent,
    LoaderComponent,
    RefreshComponent,
    FabComponent,
    RegisterComponent,
    LoginComponent,
    VarifyEmailComponent,
    BreadcrumbsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeServiceComponent,
    EditProfileComponent,

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
    SettingsServiceComponent,
    PrivacyPoliceComponent,
    RingtoneServiceComponent,
    EditPillComponent,
    AddPillComponent,
    DetailPillComponent,
    DeletePillComponent,
    SetnotificationComponent,
    NotificationComponent,
    FabComponent,
    RegisterComponent,
    LoginComponent,
    VarifyEmailComponent,
    BreadcrumbsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeServiceComponent,
    EditProfileComponent,
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
