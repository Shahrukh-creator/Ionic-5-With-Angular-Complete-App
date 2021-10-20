import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  studentsData: any;

  constructor( 
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService,
    public alertController: AlertController) { 

      this.studentsData = [];
    }

    ngOnInit() {
      // this.getAllStudents();

      
    }
  
    ionViewWillEnter() {
      // Used ionViewWillEnter as ngOnInit is not 
      // called due to view persistence in Ionic
      this.getAllStudents();
    }
  
    getAllStudents() {
      //Get saved list of students
      this.apiService.getList().subscribe(response => {
        console.log(response);
        this.studentsData = response;
      })

    }
  
  
    delete(item) {
      //Delete item in Student data
      this.apiService.deleteItem(item.id).subscribe(Response => {
        //Update list after delete is successful
        this.getAllStudents();
      });
    }
  

}
