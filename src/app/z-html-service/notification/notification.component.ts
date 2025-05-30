import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationModel } from 'src/app/z-service/notif/notification.model';
import { NotificationService } from 'src/app/z-service/notif/notification.service';
// import { NotificationModel } from 'src/app/models/notification';
// import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit, OnDestroy {

  showPanel: boolean = false;
  notification: NotificationModel | null = null;
  notificationSub!: Subscription;
  notificationTimeout: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    // this.notificationService.getNotification()
    // .subscribe(n => {
    //   this.notification = n;
    //   this.showPanel = n !== null;

    //   this.notificationTimeout = setTimeout(() => {
    //     this.showPanel = false;
    //   }, 3000);
    // });
  }

  dismissNotification() {
    this.showPanel = false;
  }

  ngOnDestroy() {
    this.notificationSub.unsubscribe();
    clearTimeout(this.notificationTimeout);
  }
}
