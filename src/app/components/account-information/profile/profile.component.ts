import {Component, OnInit, OnDestroy, EventEmitter, ChangeDetectionStrategy, Output} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {User} from "../../../models/user";

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit,OnDestroy{
  @Input() user:User;
  @Output() onUpdateUserDetails:EventEmitter<any>=new EventEmitter();
  //
  constructor(){}
  //

  ngOnInit(): void {
  }
  public updateUserDetails(firstName:string,lastName:string,imageURL:string):void
  {
    this.onUpdateUserDetails.emit({
      firstName:firstName,
      lastName:lastName,
      imageURL:imageURL
    });
  }
  ngOnDestroy(): void {
  }
}
