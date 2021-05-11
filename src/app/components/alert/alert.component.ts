import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from 'src/app/models/alert';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alert: Alert = {status: false, message: ''};

  constructor(private alertService: AlertService) {
    this.alertService.getOpen().subscribe(
      (alert) => this.alert = {...alert}
    );
  }

  ngOnInit(): void {
  }

  closeAlert() {
    this.alertService.closeAlert();
  }

}
