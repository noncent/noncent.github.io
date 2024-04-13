import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PrerenderComponent } from './prerender/prerender.component';
import { SsrComponent } from './ssr/ssr.component';
import { SsgComponent } from './ssg/ssg.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PrerenderComponent,
    SsrComponent,
    SsgComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
