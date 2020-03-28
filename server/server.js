
require('./database/connection');
require('./database/schema/Register')
require('./database/schema/News')
let express = require('express');
let server = express();
let { Log } = require('./common/log')
let morgan = require('morgan')
let bodyParser = require('body-parser');
let apis = require('./apiRoutes');

//MIDDLEWAER
server.use(bodyParser.json({}));
server.use(bodyParser.urlencoded({extended: false}));
server.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}));

//Routes
server.use('/', apis);

//PORT LISTEN
let PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    Log('SUCCESS', `Server running on Port ${PORT}`)
})