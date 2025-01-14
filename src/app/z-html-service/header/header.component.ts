import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../z-service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('popover') popover: any;

  isOpen = false;
  pageTitle: string = '';
  pageInfo: string = '';
  userProfile: any;

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setPageTitle();
    });
    this.authSvc.getUser().subscribe((user) => {
      this.userProfile = user;
    });
  }

  setPageTitle() {
    const currentRoute = this.router.url.split('/')[2];
    switch (currentRoute) {
      case 'home':
        this.pageTitle = 'Home';
        this.pageInfo = 'Education';
        break;
      case 'ringtone':
        this.pageTitle = 'Ringtone';
        this.pageInfo = 'Notification';
        break;
      case 'settings':
        this.pageTitle = 'Settings';
        this.pageInfo = 'Configuration';
        break;
      case 'notif':
        this.pageTitle = 'Notif';
        this.pageInfo = 'Notification';
        break;
      default:
        this.pageTitle = 'Default Title';
    }
  }

  onPresentPopover() {
    this.router.navigate(['/page/chart-baby']);
  }
}
