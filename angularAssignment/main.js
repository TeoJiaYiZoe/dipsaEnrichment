//load express
const express =require('express');
const MongoClient=require('mongodb').MongoClient;

//look for port
const PORT = parseInt(process.argv[2] || process.env.APP_PORT) ||3000;
const config=require('./config.json');
const URL=config.mongo || 'mongodb://localhost:27017'

//create an instance of mongo client
const client = new MongoClient(URL, { useNewUrlParser: true})

//create an sintance of the application
const app = express();

//GET/api/
//db.getCollection('boardgames').distinct('Name')
app.get('/api/name',
(req,resp)=> {
    const offset=parseInt(req.query.offset)||0;
    const limit=parseInt(req.query.limit)||5000;
    const db= client.db('games').collection('boardgames')
        .find({})
        .skip(offset)
        .limit(limit)
        .toArray()
        .then(result=>{
            console.info('>>result',result)
            resp.status(200)
            resp.type('application/json')
            resp.json(result)
            resp.end()
        })
        .catch(error=>{
            resp.status(400)
            resp.end()
        })

}
)

//GET/api/
//db.getCollection('boardgamedetail').distinct('Category')
app.get('/api/category',
(req,resp)=> {
    const db= client.db('games').collection('boardgamedetail')
    .distinct('boardgamecategory')
        .then(result=>{
            console.info('>>result',result)
            resp.status(200)
            resp.type('application/json')
            resp.json(result)
            resp.end()
        })
        .catch(error=>{
            resp.status(400)
            resp.end()
        })

}
)

//GET/api/category/<game>?offset=<number>,limit=<number>
// default to offset=0, limit=10
app.get('/api/category/:game',
(req, resp)=>{
    const offset=parseInt(req.query.offset)||0;
    const limit=parseInt(req.query.limit)||10;
    
    client.db('games')
    .collection('boardgamedetail')
    .find({boardgamecategory: {$regex: `^${req.params.game}\$`,
    $options:'i'}}
    )
    .project({ primary: 1,id:1 })
    //find return a cursor
    .skip(offset)
    .limit(limit)
    .toArray()
    .then(result=>{
        
        resp.status(200)
        resp.type('application/json')
        resp.json(result)
        resp.end()
    })
    .catch(error=>{
        resp.status(400)
        resp.end()
    })
})

//GET/api/game/:gameId
//GET/api/game?gameId=catan
app.get('/api/game/:gameId',
(req,resp)=>{
        console.log('gameId: ',req.params.gameId)
        const gameId= parseInt(req.params.gameId);
        client.db('games')
        .collection('boardgamedetail')
        .findOne({id:gameId})
        .then(result=>{
            resp.type('application/json');
            if(!result){
            resp.status(404)
            resp.json({message:`not found:${gameId}`})
            } else{
                resp.status(200);
                resp.json(result);
            }
        })
        .catch(error=>{
            resp.status(400)
            resp.json({message: error});
        })
        
    
    }
)

//GET/api/comments/:gameId
//GET/api/comments?gameId=catan
app.get('/api/comments/:gameId',
(req,resp)=>{
        console.log('gameId: ',req.params.gameId)
        const query= {ID:parseInt(req.params.gameId)};
        client.db('games')
        .collection('boardgamereview')
        .find(query)
        .toArray()
        .then(result=>{
            resp.type('application/json');
            if(!result){
            resp.status(404)
            resp.json({message:`not found:${gameId}`})
            } else{
                resp.status(200);
                resp.json(result);
            }
        })
        .catch(error=>{
            resp.status(400)
            resp.json({message: error});
        })
        
       
    }
    )
//GET/api/comment/:gameId
//GET/api/comment?gameId=catan
app.get('/api/comment/:gameId',
(req,resp)=>{
        console.log('gameId: ',req.params.gameId)
        const query= {ID:parseInt(req.params.gameId)};
        client.db('games')
        .collection('boardgamereview')
        .findOne(query)
        .then(result=>{
            resp.type('application/json');
            if(!result){
            resp.status(404)
            resp.json({message:`not found:${gameId}`})
            } else{
                resp.status(200);
                resp.json(result);
            }
        })
        .catch(error=>{
            resp.status(400)
            resp.json({message: error});
        })
        
       
    }
    )   
    
//POST/api
app.post('/api/comment', express.json(),
    (req, resp) => {
        console.info(req.body);
        const result = req.body;
        client.db('games').collection('boardgamereview')
            .insertOne({
                user: result.user,
                rating: result.rating,
                comment: result.comment,
                ID: result.id,
                name: result.name
            })
            .then(result => {
                resp.status(201).json(result);
            })
            .catch(error=>{
                resp.status(500).json(error);
            })
    })

    app.use(express.static(__dirname+'/dist'));
    
//connnect to mongo
client.connect(
    (err,client)=>{
        if(err){
            console.error('fail to connnect',err)
            return;
        }
        console.info('connected to board',client )
        //start the server
    app.listen(PORT,()=>{
    console.info(`application has started on ${PORT} at ${new Date()}`)
})
    }
)