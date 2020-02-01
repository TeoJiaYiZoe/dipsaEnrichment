import { Component, OnInit } from '@angular/core';
import { BoardGameService } from '../boardgame.service';
import {BoardGameCategory} from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  boardGameCategory: BoardGameCategory={category:[],timestamp:''}

  constructor(readonly boardgameSvc:BoardGameService,readonly router:Router) {}

  ngOnInit() {
    this.boardgameSvc.boardgameByCategory()
    .then(result=>{
      this.boardGameCategory=result;
      console.info('result',result)
    })
    .catch(error=>{
      console.error('>>error: ',error)
    })
  }
  selected(text){
    console.info('result2',text)
    this.router.navigate(['/category',text])
  }

}
