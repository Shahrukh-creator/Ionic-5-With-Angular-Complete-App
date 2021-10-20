import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from './ionic-auth.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private splashScreen: SplashScreen,
    platform: Platform,
    private router: Router,
    private ionicAuthService: IonicAuthService) {

      // platform.ready().then(() => {
      //   this.hideSplashScreen();
      // });
    }

    // hideSplashScreen() {
    //   if (SplashScreen) {
    //     setTimeout(() => {
    //       this.splashScreen.hide();
    //     }, 100);
    //    }
    //   }

  
  signOut() {
    this.ionicAuthService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        console.log(error);
      })
  }
}
