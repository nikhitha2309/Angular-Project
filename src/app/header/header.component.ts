import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html'
  })
export class HeaderComponent implements OnInit,OnDestroy{
  isAuthenticated = false;
  userSub: Subscription
  constructor(private dataStorageService : DataStorageService,
    private authService: AuthService){}

  onSaveData(){
      this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe(
      (user: User)=> {
          if(user != null){
            this.isAuthenticated = true
          }else{
            this.isAuthenticated = false;
          }
      }
    )
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
  onLogout(){
    this.authService.logOut();
    this.isAuthenticated = false;
  }
}