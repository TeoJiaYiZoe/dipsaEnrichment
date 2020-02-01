export interface BoardGameName{
    name:string;
    id:string;
    _id:string;
    timestamp:string;
}
export interface BoardGameInfo{
    name:string;
    id:string;
    _id:string;
    year:BigInteger,
    rank:BigInteger,
    average:BigInteger,
    bayesaverage:BigInteger,
    usersrated:BigInteger;
    url:string;
    thumbnail:string;
    timestamp:string;
}
export interface BoardGameCategory{
    category: string[];
    timestamp: string;
}

export interface BoardGameDetail{
    boardgamecategory: String[];
    description:String;
    id: BigInteger;
    maxplayers: BigInteger;
    maxplaytime: BigInteger;
    minplayers: BigInteger;
    playingtime: BigInteger;
    suggested_num_players: string;
    suggested_playerage: string;
    type: string;
    usersrated: BigInteger;
    yearpublished: BigInteger;
    timestamp: string;
    primary: string;
}

export interface BoardGameComments{
    comment: string;
    rating:string;
    user:string;
    name:string;
    ID:string;
    
}
export interface CategoryList{
    boardgamename:BoardGameName[];
    timestamp:string;
}
export interface NameList{
    boardgameinfo:BoardGameInfo[];
    timestamp:string;
}
export interface BoardGameCommentsList{
    commentlist: BoardGameComments[];
    timestamp: string;
}