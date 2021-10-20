import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { passwordStrength } from 'check-password-strength';
import {  MenuController } from '@ionic/angular';
import { Student } from '../models/student';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  label = 'danger';
  change = false;
  strength = 'Too weak';
  strengthValue = 0;
  strengthCheck = ['lowercase', 'uppercase', 'number', 'symbol'];
  // signup: UserOptions = { username: '', password: '', email: '', imgPath: '' };
  submitted = false;
  password;


  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
 

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  
  data: Student

  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Required.' 
      },
      { 
        type: 'pattern', 
        message: 'Email is invalid.' 
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
    public apiService: ApiService,
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private fb: FormBuilder,
    public menuCtrl: MenuController,
    public alertController: AlertController
  ) { 
    this.data = new Student();
  }



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


  
  
  passwordChange(value) {
    this.change = true;

    this.strength = passwordStrength(value.password).value;
    if (this.strength == 'Medium' || this.strength == 'Strong') {
      this.label = 'success';
    } else {
      this.label = 'danger';
    }

    if (this.strength == 'Too weak') {
      this.strengthValue = 0.125;
    } else if (this.strength == 'Weak') {
      this.strengthValue = 0.25;
    } else if (this.strength == 'Medium') {
      this.strengthValue = 0.5;
    } else {
      this.strengthValue = 1;
    }
  }

  signUp(value) {

    /// Firebase User Created for Authorization 
    this.ionicAuthService.createUser(value)
      .then((response) => {

        this.alertController.create({
          header: 'Alert',
          subHeader: 'Registered',
          message: 'User Is Created.',
          buttons: ['OK']
        }).then(res => {
    
          res.present();
    
        });

        this.errorMsg = "";
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })


      /// HTTP Server loaded with User Info

      {
        this.apiService.createItem(value).subscribe((response) => {
          // this.router.navigate(['student-list']);
        });
      }

      this.router.navigateByUrl('login');
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }

}