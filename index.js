require('dotenv/config');

const express = require('express');
const cors = require('cors');
const app = express();

//app.use(cors);
app.use(express.json());

app.get('/',function(req,res){
    res.send("Site de Tecnologia");
});

app.get('/portateis',function(req,res){
    res.send("Categoria de Portateis");
});

app.get('/smartphones',function(req,res){
    res.send("Categoria de Smartphones");
}); 

app.get('/tablets',function(req,res){
    res.send("Categoria de Tablets");
});

app.listen(process.env.SERVER_PORT,function(){
    console.log(`Servidor ativo na porta ${process.env.SERVER_PORT}`);
});