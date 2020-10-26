var app = require('express')();
var http = require('http').createServer(app);
var cors = require('cors')

app.use(cors());

const routers = require('./routers');

app.use('/api/', routers);

const PORT = process.env.PORT || 3000;

http.listen(PORT, function () {
  console.log('The app is running...');
});



