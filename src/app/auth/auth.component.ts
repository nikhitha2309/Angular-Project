import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{
    constructor(private authService : AuthService,
        private router : Router){}
    isLoginMode = false;
    isLoading = false;
    error:string=null;
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(authForm: NgForm){
        if(authForm.invalid){
            return
        }
        
        const email = authForm.value.email;
        const password = authForm.value.password;
        this.isLoading = true;
        this.error = null;
        if(!this.isLoginMode){
        this.authService.signUp(email,password).subscribe(
            (resData)=>{
                this.isLoading = false
                this.router.navigate(['recipes'])
            },errorMessage => {
                this.error = errorMessage
                this.isLoading = false;
            }
        );
        authForm.reset();
        }else{
            this.authService.logIn(email,password).subscribe(
                (resData)=>{
                    this.isLoading = false
                    this.router.navigate(['recipes'])
                } ,errorMessage => {
                    this.error = errorMessage
                    this.isLoading = false;
                }
            );
            console.log("login")
        }
    }
    onHandleError(){
        this.error = null;
    }

    
}