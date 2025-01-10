import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setPageTitle();
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
        this.pageInfo = 'Music';
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
