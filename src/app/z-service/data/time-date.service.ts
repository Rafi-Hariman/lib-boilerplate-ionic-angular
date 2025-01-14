import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeDateService {

  constructor() { }

  // Method to get current time formatted as 'HH:mm'
  getCurrentTime(): string {
    const now = new Date();
    let hours: string | number = now.getHours();
    let minutes: string | number = now.getMinutes();

    // Format hours and minutes to ensure two digits
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes}`;
  }
}
