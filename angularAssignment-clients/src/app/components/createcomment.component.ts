import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BoardGameService } from '../boardgame.service';
import {BoardGameComments,BoardGameDetail} from '../model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createcomment',
  templateUrl: './createcomment.component.html',
  styleUrls: ['./createcomment.component.css']
})
export class CreatecommentComponent implements OnInit {
  
  
  gameId='';
  boardGameComments:BoardGameComments;
  boardGameDetail:BoardGameDetail;
  constructor(readonly router:Router, readonly activateRoute: ActivatedRoute,
    readonly boardGameSvc:BoardGameService){}
    
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
      this.boardGameSvc.boardgameCommentsById(gameId)
      .then(result=>{
        console.info('boardGameComments',result)
        this.boardGameComments=result;
        console.info('gameid: ',gameId)    
      })
      .catch(error=>{
        console.info('error: ',error)
      })
    
  }
  processForm(form: NgForm){
    console.log(form);
    const commentData = {
      user: form.value.user,
      rating: form.value.rating,
      name: this.boardGameDetail.primary,
      id: this.boardGameDetail.id,
      comment: form.value.comment
    }

    this.boardGameSvc.saveComments(commentData)
      .then(result => {
        console.info(result);
      })
      .catch(error => {
        console.info(error);
      })
      this.router.navigate(['/']);
  }
}
