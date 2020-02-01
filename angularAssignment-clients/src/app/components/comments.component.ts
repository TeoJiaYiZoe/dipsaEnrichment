import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BoardGameService } from '../boardgame.service';
import {BoardGameCommentsList,BoardGameDetail} from '../model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  gameId='';
  boardGameDetail:BoardGameDetail;
  boardGameCommentsList:BoardGameCommentsList={commentlist:[],timestamp:''}

  constructor(readonly router:Router, readonly activateRoute: ActivatedRoute,
    readonly boardGameSvc:BoardGameService) { }

    ngOnInit() {
      
      const gameId=this.activateRoute.snapshot.params.gameId;
      this.boardGameSvc.boardgameById(gameId)
      .then(result=>{
        console.info('boardGameDetail',result)
        console.info('gameid:',gameId)
        this.boardGameDetail=result;
             
      })
      .catch(error=>{
        console.info('error: ',error)
      })
      this.boardGameSvc.boardgameCommentsByName(gameId)
      .then(result=>{
        console.info('boardGameComments',result)
        console.info('gameid:',gameId)
        this.boardGameCommentsList=result;     
      })
      .catch(error=>{
        console.info('error: ',error)
      })
    }
  
  selected(text){
    
    console.info('selected gameid: ',text)
    this.router.navigate(['/comment',text]);
  }
  
  }

  