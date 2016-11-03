import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../models/category";
import {FirebaseListObservable, AngularFire, FirebaseObjectObservable} from "angularfire2";


@Injectable()
export class CategoryService {

  private _categories$:FirebaseListObservable<Category[]>;
  constructor(private af: AngularFire){}
  public createCategory(name:string, details:string, imageUrl:string):string
  {
    return (<FirebaseListObservable<Category[]>>this.categories$()).push({
      name:name,
      creationDate:Date.now(),
      details:details,
      imageUrl:imageUrl
    }).key;
  }
  public categories$():Observable<Category[]>{
    if(this._categories$==null)
      this._categories$= this.af.database.list('/categories');
    return this._categories$;
  }
  public categoryByKey$(key:string):FirebaseObjectObservable<Category>
  {
    return this.af.database.object('/categories/'+key);
  }
  public isExist$(categoryID:string):Observable<boolean>
  {
    return this.categoryByKey$(categoryID)
      .map((category: Category)=>category!=null);
  }
}
