import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {NgIf} from '@angular/common';
import {RecipeEntry} from "./recipe-entry.model";
import {RecipeEntryService} from "./recipe-entry.service";
import {AuthService} from './auth.service';
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import * as moment from 'moment';
import {Observable} from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService, RecipeEntryService]

})
export class AppComponent implements OnInit {

  @ViewChild(RecipeListComponent)
  private listComponent: RecipeListComponent;

  public recipeEntryForm: FormGroup;

  public submitted: boolean; // keep track on whether form is submitted

  public days = [{date:moment(this.now).format('YYYY-MM-DD'), checked:false, name:'day0'},
    {date:moment(this.now).add(1, 'd').format('YYYY-MM-DD'), checked:false, name:'day1'},
    {date:moment(this.now).add(2, 'd').format('YYYY-MM-DD'), checked:false, name:'day2'},
    {date:moment(this.now).add(3, 'd').format('YYYY-MM-DD'), checked:false, name:'day3'},
    {date:moment(this.now).add(4, 'd').format('YYYY-MM-DD'), checked:false, name:'day4'},
    {date:moment(this.now).add(5, 'd').format('YYYY-MM-DD'), checked:false, name:'day5'},
    {date:moment(this.now).add(6, 'd').format('YYYY-MM-DD'), checked:false, name:'day6'}];

  private now = new Date();



  constructor(private _fb: FormBuilder, private recipeEntryService: RecipeEntryService, private auth:AuthService) {
  } // form builder simplify form initialization


  ngOnInit() {
      this.recipeEntryForm = this._fb.group({
        title: ['', [<any>Validators.required]],
        url: ['', []]
      });

      let controls = [];

      for(let i = 0; i < this.days.length; i++ ){
        this.recipeEntryForm.addControl(this.days[i].name, new FormControl());
      }
  }

  // search(term: string) {
  //   if (term === '') {
  //     return Observable.of([]);
  //   }
  //
  //
  //   return this.recipeEntryService.suggest(term)
  //     .map(response => <string[]> response.json()[1]);
  // }

  /**
   * Save RecipeEntry.
   */
  save(model: RecipeEntry, isValid: boolean) {


    // check if model is valid
    // if valid, call API to save recipeEntry
    console.log(model, isValid);

    if(isValid){
      Observable.from(this.days).filter((day) => day.checked == true).subscribe((day) => {
        this.recipeEntryService.createRecipeEntry(new RecipeEntry(model.title, model.url, day.date)).map(res => {
          // If request fails, throw an Error that will be caught
          console.log(res);
          if (res.status != 201) {
            throw new Error('This request has failed ' + res.status);
          }
          // If everything went fine, return the response
          else {
            // clear model
            this.submitted = true; // set form submit to true

            //reload list
            this.listComponent.loadList();

            return res;
          }
        }).subscribe(
          data => {
            console.log(data)
          },
          err => {
            console.log(err)
          });
      })
    }
  }

  resetForm() {
    this.submitted = false;
    this.recipeEntryForm.reset();
  }

}
