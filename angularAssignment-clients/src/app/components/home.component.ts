import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(readonly router:Router) { }

  ngOnInit() {
    ;
    
  }
  findAllByName(){
    this.router.navigate(['/name']);
  }
  findAllByCategory(){
    this.router.navigate(['/category']);
  }

}
