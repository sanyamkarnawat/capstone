const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req,res){
  console.log( req.body.city);


    const query = req.body.city;
    const apid = "6f8407707bbd441058bbb6a35d380a01";
      const unit= "metric";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ apid +"&units="+ unit;

    https.get(url,function(response){
      console.log(response.statusCode);
      response.on("data",function(data){
        const wd =JSON.parse(data);
      const t = wd.main.temp;
      const c = wd.name;
      const i =wd.weather[0].icon;
      const li= "http://openweathermap.org/img/wn/"+ i +"@2x.png"
      const d =wd.weather[0].description;

      res.render("tem", {v : c,w : t,x : i,y : li, z : d});


      })

    });
  // res.render("home");
})





app.listen(process.env.PORT || 3000,function(){
  console.log("started..");
})
