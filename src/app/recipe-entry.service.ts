import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from "rxjs";
import {RecipeEntry} from "./recipe-entry.model";


@Injectable()
export class RecipeEntryService {

  constructor(private http:Http) { }

  createRecipeEntry(recipeEntry) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(recipeEntry);
    return this.http.post('https://recipeagenda.appspot.com/recipeplanner/recipeEntries', body, options);
  }

  getRecipes() : Observable<RecipeEntry[]> {

    // ...using get request
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://recipeagenda.appspot.com/recipeplanner/recipeEntries', options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  removeRecipeEntry(entry:RecipeEntry){
    return this.http.delete('https://recipeagenda.appspot.com/recipeplanner/recipeEntries/' + entry.date)
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  suggest(term:String){

    console.log(term);
    // ...using get request
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get('/recipeplanner/recipeEntries?qry=' + term, options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

}
