
const express= require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

  var crypto=req.body.crypto;
  var fiat=req.body.fiat;
  var link="https://api.coinbase.com/v2/prices/"+crypto+"-"+fiat+"/spot";

  request(link,function(error,response,body){
    console.log(link);
    var dataa = JSON.parse(body);
    var price = dataa.data.amount;

    res.write("<h1>The current price of "+crypto+" is "+price+fiat+ ".</h1>");
    res.write("1 "+crypto+" = "+price+fiat);

    res.send();
  });

});

app.listen(3000,function(){
  console.log("Server Started at port 3000");
});
