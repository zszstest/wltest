import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wltest test2';

  constructor(private authenticationService: AuthenticationService) {}

  public clickHandler(): void {
    this.authenticationService.authGoogle().subscribe(console.log);
  }
}
