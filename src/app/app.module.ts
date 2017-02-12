import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {RecipeEntryService} from "./recipe-entry.service";
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AUTH_PROVIDERS }      from 'angular2-jwt';


@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [RecipeEntryService, { provide: LOCALE_ID, useValue: "nl-NL" }, AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {
}
