import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

const WINDOW = new InjectionToken('WINDOW');

export function windowFactory() {
  return window;
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: WINDOW,
      useFactory: windowFactory,
    },
    {
      provide: AuthenticationService,
      useClass: AuthenticationService,
      deps: [WINDOW]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
