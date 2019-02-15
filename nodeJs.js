var express = require('express');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get('/create', function(req,res) {
  res.sendFile(__dirname + "/create.html");
  readData = async () => {
      try {
        const response = await client.search({
        });
          console.log(response.hits.hits)
      } catch (error) {
          console.trace(error.message)
      }
  };

  readData();

})

app.get('/delete', function(req,res) {
  res.sendFile(__dirname + "/delete.html");
  readData = async () => {
      try {
        const response = await client.search({
        });
          console.log(response.hits.hits)
      } catch (error) {
          console.trace(error.message)
      }
  };

  readData();
})

app.post('/delete' , urlencodedParser, function(req, res) {
  if(!req.body) return res.sendStatus(400);
  else {
    readData = async () => {
        try {
            const response = await client.delete({
              index: 'datauser',
              type: 'user',
              id: '3',
              body: {
                name: req.body.name,
                surname: req.body.surname,
                dateOfBirth: req.body.dateOfBirth,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email
              }
            });
        } catch (error) {
            console.trace(error.message)
        }
    };

    readData();
  }
});

app.post('/create' , urlencodedParser, function(req, res) {
  if(!req.body) return res.sendStatus(400);
  else {
    readData = async () => {
        try {
            const response = await client.create({
              index: 'datauser',
              type: 'user',
              id: '3',
              body: {
                name: req.body.name,
                surname: req.body.surname,
                dateOfBirth: req.body.dateOfBirth,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email
              }
            });
        } catch (error) {
            console.trace(error.message)
        }
    };

    readData();
  }
});


app.listen(3100, '127.0.0.1');

/*readData = async () => {
    try {
        const response = await client.search({});
        console.log(response.hits.hits)
    } catch (error) {
        console.trace(error.message)
    }
};

readData();
*/
