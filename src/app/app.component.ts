import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {RecipeEntry} from "./recipe-entry.model";
import {RecipeEntryService} from "./recipe-entry.service";
import { Response} from "@angular/http";

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
    this.submitted = true; // set form submit to true



    // check if model is valid
    // if valid, call API to save recipeEntry
    console.log(model, isValid);

    this.recipeEntryService.createRecipeEntry(new RecipeEntry(model.title, model.url, model.date)).
    subscribe((r: Response) => {console.log(r)});
  }

}
