import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from '../z-service/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuardService], // Proteksi seluruh tab
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuardService] // Proteksi rute home
      },
      {
        path: 'notif',
        loadChildren: () => import('../notif/notif.module').then(m => m.NotifPageModule),
        canActivate: [AuthGuardService] // Proteksi rute notif
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule),
        canActivate: [AuthGuardService] // Proteksi rute settings
      },
      {
        path: 'ringtone',
        loadChildren: () => import('../ringtone/ringtone.module').then(m => m.RingtonePageModule),
        canActivate: [AuthGuardService] // Proteksi rute ringtone
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/page/home',
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
