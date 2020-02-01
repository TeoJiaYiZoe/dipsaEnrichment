import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';

import {BoardGameName,CategoryList,BoardGameCategory,BoardGameComments, BoardGameDetail,NameList, BoardGameCommentsList, BoardGameInfo} from './model';

@Injectable()
export class BoardGameService{

    constructor(readonly http:HttpClient){}
    boardgameById(gameId: string):Promise<BoardGameDetail>{
        return(
            this.http.get<any>(`/api/game/${gameId}`)
            .toPromise()
        .then(result => {
          const r = <BoardGameDetail> {
            boardgamecategory: result.boardgamecategory,
            maxplayers: result.maxplayers,
            minplayers:result.minplayers,
            maxplaytime: result.maxplaytime,
            type: result.type,
            id:result.id,
            primary:result.primary,
            yearpublished: result.yearpublished,
            timestamp: (new Date()).toUTCString()
                    }
          return (r);
            })
            
        )
    }
    boardgameCommentsByName(gameId: string):Promise<BoardGameCommentsList>{
        return(
            this.http.get<any>(`/api/comments/${gameId}`)
            .toPromise()
        .then(result => { return <BoardGameCommentsList>{
          commentlist:result,
          timestamp:(new Date()).toUTCString() 
        }
        })
            
        )
    };
    boardgameCommentsById(gameId:string):Promise<BoardGameComments>{
        return(
            this.http.get<any>(`/api/comment/${gameId}`)
            .toPromise()
            .then(result=>{
                return (<BoardGameComments>{
                    comment: result.comment,
                    rating:result.rating,
                    user:result.user,
                    name:result.name,
                    ID:result.ID,
                    timestamp:(new Date()).toUTCString()
                });
            })
        );
    }
    categoryByName(game:string):  Promise<CategoryList>{
        return(
            this.http.get<BoardGameName[]>(`/api/category/${game}`)
            .toPromise()
            .then(result=>{ return <CategoryList>{
                boardgamename:result,
                timestamp:(new Date()).toUTCString() 
            }

            })
        )
    };

    boardgameByName():Promise<NameList>{
        return(
            this.http.get<BoardGameInfo[]>('/api/name')
            .toPromise()
            .then(result=>{ return <NameList>{
                    boardgameinfo:result,
                    timestamp:(new Date()).toUTCString()
                }
            })
        )
    };
    boardgameByCategory():Promise<BoardGameCategory>{
        return(
            this.http.get<string[]>('/api/category')
            .toPromise()
            .then(result=>{
                return (<BoardGameCategory>{
                    category:result,
                    timestamp:(new Date()).toUTCString()
                });
            })
        );
    }
    saveComments(commentdata){

        return this.http.post(`/api/comment`, commentdata).toPromise();
    }
}