var app = require('express')();
var http = require('http').createServer(app);
var cors = require('cors')
const request = require('request');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swaggerDef');

//const { Server } = require('ws');

//const wss = new Server({ server:http });

//let onlineUsers = 0;

/*/*wss.on('connection', function connection(ws) {

  console.log('A new Client Connected');
  ws.send('Welcome new Client');
  
  onlineUsers++;

  let cache = [];
  
  // /api
  request(
    'https://dovizapi.herokuapp.com/api',
    (error, response, body) => {
      if (!response) return;
      if (error && response.statusCode != 200) return console.error(error);
      cache[0] = body;
      ws.send(JSON.stringify(["api",JSON.parse(body)[0]]));
    });
  
  // /api/altin
  request(
    'https://dovizapi.herokuapp.com/api/altin',
    (error, response, body) => {
      if (!response) return;
      if (error && response.statusCode != 200) return console.error(error);
      cache[1] = body;
      ws.send(JSON.stringify(["altin",body]));
    });
  
  // /api/gumus
  request(
    'https://dovizapi.herokuapp.com/api/gumus',
    (error, response, body) => {
      if (!response) return;
      if (error && response.statusCode != 200) return console.error(error);
      cache[2] = body;
      ws.send(JSON.stringify(["gumus",body]));
    });
  
  // /api/borsa
  request(
    'https://dovizapi.herokuapp.com/api/borsa',
    (error, response, body) => {
      if (!response) return;
      if (error && response.statusCode != 200) return console.error(error);
      cache[3] = body;
      ws.send(JSON.stringify(["borsa",body]));
    });

  // /api/kripto
  request(
    'https://dovizapi.herokuapp.com/api/kriptopara',
    (error, response, body) => {
      if (!response) return;
      if (error && response.statusCode != 200) return console.error(error);
      cache[4] = body;
      ws.send(JSON.stringify(["kriptopara",body]));
    });

  setInterval(() => {
    if (!onlineUsers) return;

    // /api
    request(
    'https://dovizapi.herokuapp.com/api',
      (error, response, body) => {
        if (!response) return;
        try {
          if (error && response.statusCode != 200) return console.error(error);
          
          if (cache[0] != body) {
            cache[0] = body;
            ws.send(JSON.stringify(["api",JSON.parse(body)[0]]));
          }
        } catch (err ) {
          console.error(err);
          sleep(5000);
        }
      
      });
    
    // /api/altin
    request(
    'https://dovizapi.herokuapp.com/api/altin',
    (error, response, body) => {
      if (!response) return;
      if (error && response.statusCode != 200) return console.error(error);

      if (cache[1] != body) {
        cache[1] = body;       
        ws.send(JSON.stringify(["altin",body]));
      }
      });
    
    // /api/gumus
    request(
    'https://dovizapi.herokuapp.com/api/gumus',
    (error, response, body) => {
      if (!response) return;
      if (error && response.statusCode != 200) return console.error(error);

      if (cache[2] != body) {
        cache[2] = body;    
        ws.send(JSON.stringify(["gumus",body]));

      }
      });
    
    // /api/borsa
    request(
    'https://dovizapi.herokuapp.com/api/borsa',
    (error, response, body) => {
      if (!response) return;
      if (error && response.statusCode != 200) return console.error(error);

      if (cache[3] != body) {
        cache[3] = body;     
        ws.send(JSON.stringify(["borsa",body]));
      }
      });
    
    // /api/kripto
    request(
    'https://dovizapi.herokuapp.com/api/kriptopara',
      (error, response, body) => {
      try {
        if (!response) return;
        if (error && response.statusCode != 200) return console.error(error);
        
        if (cache[4] != body) {
          cache[4] = body;       
          ws.send(JSON.stringify(["kriptopara",body]));
        }
        } catch (err) {
          setTimeout(console.error(err), 5000);
        }
        
      });
  }, 1000);
  
  /*ws.on('message', function incoming(message) {
    console.log('received : %s', message);
    
     wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });*/
/*
   ws.on('close', function() {
     console.log('Connection Closed');
     onlineUsers--;
    });
});*/

app.use(cors());

const routers = require('./routers');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/', routers);

const PORT = process.env.PORT || 3000;

http.listen(PORT, function () {
  console.log('The app is running... ' , PORT);
});



