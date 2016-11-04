import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {RecipeEntry} from "./recipe-entry.model";
import {RecipeEntryService} from "./recipe-entry.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public recipeEntryForm:FormGroup;

  public submitted: boolean; // keep track on whether form is submitted

  constructor(private _fb: FormBuilder, private recipeEntryService:RecipeEntryService) { } // form builder simplify form initialization

  ngOnInit() {
    this.recipeEntryForm= this._fb.group({
      title: ['', [<any>Validators.required]],
      url: ['', []],
      date: ['', [<any>Validators.required]]
    });
  }

  save(model: RecipeEntry, isValid: boolean) {


    // check if model is valid
    // if valid, call API to save recipeEntry
    console.log(model, isValid);

    this.recipeEntryService.createRecipeEntry(new RecipeEntry(model.title, model.url, model.date)).map(res => {
      // If request fails, throw an Error that will be caught
      console.log(res);
      if (res.status != 201) {
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        // clear model
        this.submitted = true; // set form submit to true

       return res;
      }
    }).subscribe(
      data => {console.log(data)},
      err => {console.log(err)});
  }

  resetForm() {
    this.submitted = false;
    this.recipeEntryForm.reset();
  }

}
