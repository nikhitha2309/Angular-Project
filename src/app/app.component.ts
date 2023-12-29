import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private router: Router,
    private authService: AuthService){}
  title = 'course_project';
  ngOnInit(): void {
    this.authService.autoLogin();
  }
  
}
