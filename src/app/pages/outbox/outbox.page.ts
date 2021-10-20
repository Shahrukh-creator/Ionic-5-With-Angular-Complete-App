import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.page.html',
  styleUrls: ['./outbox.page.scss'],
})
export class OutboxPage implements OnInit {

  
constructor(private callNumber: CallNumber) { }

  ngOnInit() {
  }

  
launchDialer(n){
  this.callNumber.callNumber(n, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
}

}
