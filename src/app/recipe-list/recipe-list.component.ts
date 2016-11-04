import { Component, OnInit } from '@angular/core';
import {RecipeEntryService} from "../recipe-entry.service";
import {RecipeEntry} from "../recipe-entry.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeEntries:RecipeEntry[];

  constructor(private recipeService:RecipeEntryService) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(
      recipeEntries => this.recipeEntries = recipeEntries,
      err => {
        console.log(err);
      }
    )

  }

}
