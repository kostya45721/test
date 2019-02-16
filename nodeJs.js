var express = require('express');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
let changeUser = new Array();

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

});

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
});

app.get('/chek_change', function(req,res) {
  res.sendFile(__dirname + "/chek_change.html");
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
});

app.get('/change', function(req,res) {
  res.sendFile(__dirname + "/change.html");
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
});

app.post('/chek_change' , urlencodedParser, function(req, res) {
    res.send("Пользователь успешно найден! Введите новые данные <br> <a href='/change'><button type='button'> Ввести новые данные </button></a>");
});

app.post('/change' , urlencodedParser, function(req, res) {
  if(!req.body) return res.sendStatus(400);
  else {
    readData = async () => {
        try {
            const response = await client.update({
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
    res.send("Пользователь успешно изменен! <br> <a href='/'><button type='button'> Home </button></a>");
  }
});

app.post('/delete' , urlencodedParser, function(req, res) {
  if(!req.body) return res.sendStatus(400);
  else {
    readData = async () => {
        try {
            const responseGet = await client.search({
              index: 'datauser',
              type: 'user',
              body: {
                name: req.body.name,
                surname: req.body.surname,
                dateOfBirth: req.body.dateOfBirth,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email
            }});
            const responseDelete = await client.deleteByQuery({
              index: 'datauser',
              type: 'user',
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
    res.send("Пользователь успешно удален! <br> <a href='/'><button type='button'> Home </button></a>");
  }
});

app.post('/create' , urlencodedParser, function(req, res) {
  if(!req.body) return res.sendStatus(400);
  else {
    readData = async () => {
        try {
            const response = await client.index({
              index: 'datauser',
              type: 'user',
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
    res.send("Пользователь успешно создан! <br> <a href='/'><button type='button'> Home </button></a>");
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
