import { Component, OnInit } from '@angular/core';
import { NgxNotificationService } from 'ngx-notification';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomComponent implements OnInit {

  constructor(private ngxNotificationService: NgxNotificationService) {}

  
  ngOnInit() {
  }

  sendNotification() {
  	this.ngxNotificationService.sendMessage('This is my message to you!', 'dark', 'bottom-right');
  }
  
}
