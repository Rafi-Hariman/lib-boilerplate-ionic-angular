import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

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
