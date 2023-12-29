import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData{
    kind:string,
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?: boolean
}

@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private http : HttpClient,
        private router : Router
        ){}
        userSubject = new BehaviorSubject<User>(null);
        token : string = null;
        private tokenExpirationToken:any = null;
    signUp(email: string , password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCwOwLi__hCYVOAIuFZXABjG4zcdXOEBA',
        {
            email:email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError (errorResponse => {
            let errorMessage = "An Unknown error occured"
            if(!errorResponse.error || !errorResponse.error.error){
                return throwError(errorMessage);
            }
            switch(errorResponse.error.error.message){
                
                case 'EMAIL_EXISTS':
                    errorMessage="The email already exists !!!"
            }
            return throwError(errorMessage);
        }), tap(
            (resData)=> {
                const expirationDate = new Date(new Date().getTime() + +resData.expiresIn*1000);
                const user = new User(resData.email ,resData.localId ,resData.idToken,expirationDate)
                console.log(user)
                this.userSubject.next(user);
                this.autoLogOut(+resData.expiresIn*1000)
                localStorage.setItem('userData',JSON.stringify(user));
            }
        ));
    }

    logIn(email:string , password : string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDCwOwLi__hCYVOAIuFZXABjG4zcdXOEBA',
        {
            email:email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError (errorResponse => {
            let errorMessage = "An Unknown error occured"
            console.log(errorResponse.error.error.message)
            if(!errorResponse.error || !errorResponse.error.error){
                return throwError(errorMessage);
            }
            switch(errorResponse.error.error.message){
                
                case 'INVALID_LOGIN_CREDENTIALS':
                    errorMessage="Credentials are invalid!!"
                    break;
                
            }
            return throwError(errorMessage);
        }), tap(
            (resData)=> {
                const expirationDate = new Date(new Date().getTime() + +resData.expiresIn*1000);
                const user = new User(resData.email ,resData.localId ,resData.idToken,expirationDate)
                console.log(user)
                this.userSubject.next(user);
                this.autoLogOut(+resData.expiresIn*1000)
                localStorage.setItem('userData',JSON.stringify(user));

            }
        ));
    }

    logOut(){
        this.userSubject.next(null);
        this.router.navigate(["/auth"])
        localStorage.removeItem('userData')
        if(this.tokenExpirationToken){
            clearTimeout(this.tokenExpirationToken);
            this.tokenExpirationToken=null;
        }

    }

    autoLogin(){
        const userData : 
        {
            email:string,
            id : string,
            _token: string,
            _tokenExpirationDate : string
        }  = JSON.parse(localStorage.getItem('userData'));
        if(userData){
            const loadedUser = new User(userData.email,userData.id,userData._token,
                new Date(userData._tokenExpirationDate));
            if(loadedUser.token){
                const expirationTime = new Date(userData._tokenExpirationDate).getTime()- new Date().getTime()
                this.userSubject.next(loadedUser);
                this.autoLogOut(expirationTime)
            }

        }else{
            return ;
        }
    }
    autoLogOut(expirationDuration : number){
        console.log(expirationDuration)
        this.tokenExpirationToken = setTimeout(()=> {
            this.logOut()
        },
        expirationDuration)
    }

}