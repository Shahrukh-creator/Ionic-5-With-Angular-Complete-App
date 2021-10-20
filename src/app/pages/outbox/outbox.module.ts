import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutboxPageRoutingModule } from './outbox-routing.module';

import { OutboxPage } from './outbox.page';

import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutboxPageRoutingModule
  ],
  providers: [ CallNumber ],
  declarations: [OutboxPage]
})
export class OutboxPageModule {}
