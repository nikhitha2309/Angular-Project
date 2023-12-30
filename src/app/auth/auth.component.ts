import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { Subscription } from "rxjs";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{
    closeSub: Subscription;
    constructor(private authService : AuthService,
        private router : Router,
        private componentFactory : ComponentFactoryResolver){}
    isLoginMode = false;
    isLoading = false;
    error:string=null;
    @ViewChild(PlaceholderDirective,{static:false}) alertHost: PlaceholderDirective;

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
                this.showErrorAlert(errorMessage)
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
                    this.showErrorAlert(errorMessage)
                    this.isLoading = false;
                }
            );
            console.log("login")
        }
    }
    onHandleError(){
        this.error = null;
    }
    private showErrorAlert(message : string){
        const alertCmpFactory = this.componentFactory.resolveComponentFactory(AlertComponent);
        const hostViewContRef = this.alertHost.viewContainerRef
        hostViewContRef.clear()
        const componentRef = hostViewContRef.createComponent(alertCmpFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(()=>{
            this.closeSub.unsubscribe();
            hostViewContRef.clear();
        }
        )

    }
    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

    
}