import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css']
})
export class RefreshComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  onHandleRefresh(event: { target: { complete: () => void; }; }) {
    setTimeout(() => {
      event.target.complete();
      window.location.reload();
    },722)
  }
}
