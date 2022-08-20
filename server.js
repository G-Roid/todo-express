const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000

require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'task-database'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })


app.set('view engine', 'ejs')       
app.use(express.static('public'))  
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',async (request, response)=>{
    const todoItems = await db.collection('tasks').find().toArray()
    const itemsLeft = await db.collection('tasks').countDocuments({completed: false})
    response.render('index.ejs', { items: todoItems, left: itemsLeft })

})


app.post('/addToDo', (request, response) => {
    db.collection('tasks').insertOne({thing: request.body.todoItem, completed: false})
    .then(result => {
        console.log('todo added')
        response.redirect('/')
    })
    .catch(err => console.error(err))
})

app.delete('/deleteItem', (request, response) => {
    db.collection('tasks').deleteOne({thing: request.body.itemFromJS})
    .then(result => {
        console.log(result)
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
    .catch(error => console.error(error))

})

app.put('/markComplete', (request, response) => {
    db.collection('tasks').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))

})

app.put('/markNotComplete', (request, response) => {
    db.collection('tasks').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Not Complete')
        response.json('Marked Not Complete')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, () => {
    console.log(`server running on ${PORT}`)
})