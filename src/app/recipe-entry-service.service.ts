import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx'

@Injectable()
export class RecipeEntryServiceService {

  constructor(private http:Http) { }

  createRecipeEntry(recipeEntry) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(recipeEntry);
    return this.http.post('/api/food/', body, headers).map((res: Response) => res.json());
  }

}
