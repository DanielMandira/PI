import express from 'express'
import connection from './config/sequelize-config.js'

const app = express()

// connection.authenticate().then(()=>{
//     console.log('Conexão com o banco de dados feita com sucesso!')
// }).catch((error)=>{
//     console.log(error)
// })

// connection.query('CREATE DATABSE IF NOT EXISTS banco de dados;').then(()=>{
//     console.log('O Banco de dados está criado.')
// }).catch((error)=>{
//     console.log(error)
// })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

app.get("/",function(req,res){
    res.render("index")
})

app.listen(8080,function(erro){
    if(erro) {
        console.log("Ocorreu um erro!"+ erro)

    }else{
        console.log("Servidor iniciado com sucesso!")
    }
})