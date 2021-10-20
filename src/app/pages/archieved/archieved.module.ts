import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchievedPageRoutingModule } from './archieved-routing.module';

import { ArchievedPage } from './archieved.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchievedPageRoutingModule
  ],
  declarations: [ArchievedPage]
})
export class ArchievedPageModule {}
