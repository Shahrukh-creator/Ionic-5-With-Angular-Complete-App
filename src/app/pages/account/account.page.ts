import { Component, OnInit } from '@angular/core';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  public title: string;
  public title_2: string;
  public description: string;
  public name: string;
  public language: string;
  constructor(private globalization: Globalization, private _translate: TranslateService) { }

  ngOnInit() {
  }

  
   //This function is called instead of ngOninit() to 
   // set the defaualt browser language 

   ionViewDidEnter(): void {
    this.getDeviceLanguage()
  }


  // get is the key command to fetch the JSON data from JSON file
  // after subscribing the file page

  _initialiseTranslation(): void {
    this._translate.get('TITLE').subscribe((res: string) => {
      this.title = res;
    });
    this._translate.get('description').subscribe((res: string) => {
      this.description = res;
    });
    this._translate.get('TITLE_2', { value: 'Hamza' }).subscribe((res: string) => {
      this.title_2 = res;
    });
    this._translate.get('data.name', { name_value: 'Amna Khan' }).subscribe((res: string) => {
      this.name = res;
    });

  }

  public changeLanguage(): void {
    this._translateLanguage();
  }

  _translateLanguage(): void {
    this._translate.use(this.language);
    this._initialiseTranslation();
  }

  _initTranslate(language) {

    // Set the default language for translation strings, and the current language.

    this._translate.setDefaultLang('en');
    if (language) {
      this.language = language;
    }
    else {
      // Setting the language here
      this.language = 'en';
    }
    this._translateLanguage();
  }


  // On page load we will check if we have 
  // default browser internationalization API 
  // by checking window.Intl. We then get default browser language 
  // using navigator.language .

  getDeviceLanguage() {
    if (window.Intl && typeof window.Intl === 'object') {
      this._initTranslate(navigator.language)
    }

    //   We also set a backup Funtion on Cordova globalization plugin if it is deprecated in 
  // this specific version and set a default language if neither browser nor Cordova plugin works.
 
    else {
      this.globalization.getPreferredLanguage()
        .then(res => {
          this._initTranslate(res.value)
        })
        .catch(e => {console.log(e);});
    }
  }
}
