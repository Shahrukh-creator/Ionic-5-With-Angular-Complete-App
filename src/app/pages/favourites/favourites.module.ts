import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicModule } from '@ionic/angular';

import { FavouritesPageRoutingModule } from './favourites-routing.module';

import { FavouritesPage } from './favourites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritesPageRoutingModule
  ],
  providers: [ Camera ],

  declarations: [FavouritesPage]
})
export class FavouritesPageModule {}
