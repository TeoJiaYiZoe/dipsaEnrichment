import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BoardGameService } from '../boardgame.service';
import {BoardGameDetail} from '../model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  gameId='';
  boardGameDetail:BoardGameDetail;
  constructor(readonly router:Router, readonly activateRoute: ActivatedRoute,
    readonly boardGameSvc:BoardGameService) { }

  ngOnInit() {
    this.gameId=this.activateRoute.snapshot.params.gameId;
    this.boardGameSvc.boardgameById(this.gameId)
    .then(result=>{
      console.info('boardGameDetail',result)
      console.info('gameid:',this.gameId)
      this.boardGameDetail=result;     
    })
    .catch(error=>{
      console.info('error: ',error)
    })
  }

selected(text){
  console.info('selected gameid: ',text)
  this.router.navigate(['/comments',text]);

}

}
