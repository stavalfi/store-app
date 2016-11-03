import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Perchase} from "../models/perchase";
import {FirebaseListObservable, AngularFire} from "angularfire2";

@Injectable()
export class PerchaseService {

  constructor(private af: AngularFire){}

  public getPerchases():FirebaseListObservable<Perchase[]>{
    return this.af.database.list('/perchases');
  }
}
