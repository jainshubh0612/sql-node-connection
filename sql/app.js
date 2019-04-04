const express = require('express')
const app = express()

const mysql = require('mysql')
const bodyparser = require('body-parser')
const ejs = require('ejs')

app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine' ,'ejs')

const conn = mysql.createConnection({
    host:'localhost',
    database:'user',
    username:'users',
    password:''
})

app.get('/' , (req , res)=>{
    conn.query('select count(*) from persons' , (err , result)=>{
        // if(err) {throw err}
        if(err){console.log(err)} 
        // console.log(result);
        var count = result[1]
        res.render('index' ,{
                data:count , 
                title:'Sample form'
        })
    })
});



app.post('/register' ,(req , res)=>{

        var person={
            username :req.body.name,
            email : req.body.email,
            password : req.body.password
        }
        var q ='insert into persons(username , email , password) values set ?'
        conn.query(q ,person, (err , result)=>{
        if(err) {throw err} 
        res.redirect('/')
    })
});

app.use((req , res)=>{
   res.status(404).send('<h1>404 : File not found</h1>')
})

app.listen(8080 , ()=>{
    console.log('Server started at port number 8080')
});