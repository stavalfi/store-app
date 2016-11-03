import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FirebaseObjectObservable} from "angularfire2";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'account-information',
  templateUrl: 'account-information.component.html',
  styleUrls: ['account-information.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AccountInformationComponent implements OnInit {

  private user$:FirebaseObjectObservable<User>;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private userService:UserService) { }

  ngOnInit() {
    this.user$=<FirebaseObjectObservable<any>>this.route.params
      .map(params=>params['key'])
      .switchMap((userKey:string)=>this.userService.userByKey$(userKey));
  }
  private onUpdateUserDetails(userNewDetails:any)
  {
    //update user..
    this.user$.take(1)
      .toPromise()
      .then((user:User)=>this.userService.update(user.$key,{
        firstName:userNewDetails.firstName,
        lastName:userNewDetails.lastName,
        imageURL:userNewDetails.imageURL}));
  }
  public navigateProfile():void
  {
    this.user$.take(1)
      .toPromise()
      .then((user:User)=>this.router.navigate(['account/profile', user.$key]));
  }
  public navigateUserProducts():void
  {

  }
}
