import { Component, OnInit } from '@angular/core';
import { BoardGameService } from '../boardgame.service';
import {NameList} from '../model';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent implements OnInit {
  nameList: NameList={boardgameinfo:[],timestamp:''}

  constructor(readonly boardgameSvc:BoardGameService,readonly router:Router) {}
  
  ngOnInit() {
    this.boardgameSvc.boardgameByName()
    .then(result=>{
      this.nameList=result;
      console.info('>>game list',result)
    })
    .catch(error=>{
      console.error('>>error: ',error)
    })
  }
  selected(text){
    console.info('selected gameid: ',text)
    this.router.navigate(['/game',text])
  }

}
