import * as moment from 'moment';

export class RecipeEntry {

  title:string;
  url:string;
  date:string;

  constructor(title:string, url:string, date:string){
    this.title = title;
    this.url = url;
    this.date = moment(date).format('YYYY-MM-DD').toString();
  }
}
