import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RingtonePageRoutingModule } from './ringtone-routing.module';

import { RingtonePage } from './ringtone.page';
import { HtmlModule } from '../z-html-service/html.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RingtonePageRoutingModule,
    HtmlModule,
  ],
  declarations: [RingtonePage]
})
export class RingtonePageModule {}
