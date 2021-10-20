import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  email = '';

  error = '';
  

  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Required.' 
      },
      { 
        type: 'pattern', 
        message: 'Email is not valid.' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'Required.' 
      },
      { 
        type: 'minlength', 
        message: 'Password should be minimum 6 characters.' 
      }
    ]
  };

  constructor(
    private router: Router,
    private fireauth: AngularFireAuth,
    private ionicAuthService: IonicAuthService,
    private fb: FormBuilder,
    private toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public menuCtrl: MenuController
  ) { }



  ionViewWillEnter() {
    this.menuCtrl.enable(false);
 }
 
 ionViewDidLeave() {
  this.menuCtrl.enable(true);
} 
 hideShowPassword() {
  this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}


  ngOnInit() {

    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  
 


  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

  recover(value) {
    this.fireauth.sendPasswordResetEmail(value.email)
      .then(data => {
        console.log(data);
        this.presentToast('Password reset email sent',  'bottom', 1000); // this is toastController
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  async presentToast(message, position, duration) {
    const toast = await this.toastController.create({
      message,
      duration,
      position
    });
    toast.present();
  }



  signIn(value) {
    this.ionicAuthService.signinUser(value)
      .then((response) => {
        console.log(response)
        this.errorMsg = "";
        this.router.navigateByUrl('dashboard');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToSignup() {
    this.router.navigateByUrl('register');
  }

}