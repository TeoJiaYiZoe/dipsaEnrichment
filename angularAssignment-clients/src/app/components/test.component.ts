import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardGameService } from '../boardgame.service';
import { CategoryList } from '../model';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
//in that category, the name of boardgames available
game='';
categoryList: CategoryList={boardgamename:[],timestamp:''}


  constructor(readonly activateRoute: ActivatedRoute, readonly router:Router,readonly boardgameSvc: BoardGameService) { }

  ngOnInit() {
    this.game=this.activateRoute.snapshot.params.game;
    this.boardgameSvc.categoryByName(this.game)
    .then(result=>{
      console.info('>>cate list',this.game);
      this.categoryList=result;
      console.info('>>cate list',result);
    })
  }
  selected(text){
    console.info('select',text);
    this.router.navigate(['/game',text]);
  }

}
