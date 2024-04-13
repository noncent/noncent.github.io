import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrerenderComponent } from './prerender/prerender.component';
import { SsrComponent } from './ssr/ssr.component';
import { SsgComponent } from './ssg/ssg.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'prerender', component: PrerenderComponent },
  { path: 'ssr', component: SsrComponent },
  { path: 'ssg', component: SsgComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
