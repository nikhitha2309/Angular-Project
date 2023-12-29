import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("entered interceptor")
        return this.authService.userSubject.pipe(take(1),exhaustMap(user  =>{
            if(!user){
                console.log("user is null" + user)
                return next.handle(req)
            }
            const modReq = req.clone(
                {
                    params : new HttpParams().set('auth',user.token)
                }
            )
            return next.handle(modReq)
        }
            
        ))
    }

}