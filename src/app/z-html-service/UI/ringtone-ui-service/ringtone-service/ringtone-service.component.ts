import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ringtone-service',
  templateUrl: './ringtone-service.component.html',
  styleUrls: ['./ringtone-service.component.scss']
})
export class RingtoneServiceComponent implements OnInit {

  @Input() title!: string;
  @Input() description!: string;
  @Input() type!: 'project' | 'company';
  @Input() icon!: string; // UR
  constructor() { }

  ngOnInit() {
  }

}
