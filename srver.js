/*var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://iot.eclipse.org')
var express=require('express');
var app=express();
var bodyParser =require('body-parser')
var http=require('http');
var server=http.createServer(app);

var io=require('socket.io')(server);


var mongojs = require('mongojs')
var db = mongojs("mongodb://datasoft:1234@ds125335.mlab.com:25335/datasoft", ['datasoft']);*/



/* JESON format for postman
var data = {
   
    "Device": "DS000",
    "Methane": "0.989"
}*/

// parse application/x-www-form-urlencoded
//app.use(express.static("public"));
//app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//app.use(bodyParser.json())

//Socket

//var connection=[]

//client.subscribe('arun');

/*io.sockets.on('connection',function(socket){
    socket.on('subscribe',function(data){
        console.log('Subscribing to'+data.topic);
        socket.join(data.topic);
        client.subscribe(data.topic);
    });

    socket.on('publish',function(data){
        console.log('Publishing to'+data.topic);
        client.publish(data.topic,data.payload);
    })

    client.on('message',function(topic,payload,packet){ 
        if(topic == 'arun')
            io.sockets.emit('mqtt',{'topic':String(topic),'payload':String(payload)})})

})

//MQTT protocal
/*client.on('connect', function () {
    client.subscribe('arun')
    client.publish('arun', 'Arun Biswas')
  })
   
     client.on('message', function (topic, message) {
         
          console.log(message.toString())
  
          saveObject = {
              "msg": message.toString()
             
          }
         
          db.datasoft.save(saveObject)
          
         // client.end()
        })*/

//...............................


//get function
//app.get('/',(req,res)=>{

    //db.datasoft.find(function(err,docs){
        
   // res.send(docs)}) 
  
  // res.sendFile(__dirname + '/index.html');
  //res.sendfile('index.html');
 // res.sendFile( __dirname + "/" + "index.html" );
  
//})

//response from Temperature
//app.get('/index.html',(req,res)=>{

  //  res.send('index.html');
//})

//response from Sound
/*app.get('/Sound',(req,res)=>{
    res.send('Sound');
})

//response from Light
app.get('/Light',(req,res)=>{
    res.send('Light');
})

//save data on database
app.post('/data',(req,res)=>{

    //console.log(req);
    //console.log(res.body.toString());
    var data=res.body;
    console.log(String(data));
    db.datasoft.save(req.body);
    res.json(req.body);
    console.log("Data Posted");
   
})


app.listen(3000,()=>{

    console.log('Server is running');
})
*/

var express = require('express');
//var bodyParser = require('body-parser');
//var mongojs = require('mongojs');
var mqtt = require('mqtt')
var path = require('path');
var http = require('http')

var app = express()
var server = http.createServer(app)

//var db = mongojs("mongodb://yoda:1@ds125195.mlab.com:25195/iotsecondbatch", ["sensordata"]);

var connection = [];
// viewed at http://localhost:3000
app.get('/', function(req, res) {

    res.sendfile('index.html');
    //res.sendFile(path.join(__dirname + '/index.html'));
    //res.sendFile(path.join(__dirname + '/Users/MIMORA/Desktop/dsiot/frontendcss/css/bootstrap.min.css')); 
});

//socket.io task
var io = require('socket.io')(server);
var client  = mqtt.connect('mqtt://iot.eclipse.org')
client.subscribe('arun')
io.sockets.on('connection',function(socket)
{
    //mqtt event binded with socket trigger
    socket.on('subscribe',function(data)
    {
        console.log('subscribing to'+data.topic);
        socket.join(data.topic);
        client.subscribe(data.topic);
    });

    //mqtt event binded with socket trigger
    socket.on('publish',function(data)
    {
        console.log('publishing  to'+data.topic);
        client.publish(data.topic,data.payload);
    });

    //just mqtt connction getting triggered whenever msg is recieved
    client.on('message',function(topic,payload,packet)
    {
        if(topic == 'arun')
        {
            io.sockets.emit('mqtt',{'topic':String(topic),'payload': String(payload)});
            console.log(JSON.parse(payload))
         
        }
    });


})

server.listen(process.env.PORT || 3000,function(){
    console.log('example app listenting on port 3000');
})







