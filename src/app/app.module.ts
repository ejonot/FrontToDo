import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListeComponent } from './liste/liste.component';
import { EditionTacheComponent } from './edition-tache/edition-tache.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

const routes : Routes =[
  {path:'', component : ListeComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ListeComponent,
    EditionTacheComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
   HttpClientModule,
   FormsModule,
   AngularFontAwesomeModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
