import express from 'express';
import {sequelize} from './sequelize';

import {IndexRouter} from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import {config} from './config/config';
import {V0_USER_MODELS} from './controllers/v0/model.index';


(async () => {
  await sequelize.addModels(V0_USER_MODELS);
  await sequelize.sync();

  const app = express();
  const port = 8080;

  app.use(bodyParser.json());


  app.use('/api/v0/', IndexRouter);

  // Root URI call
  app.get( '/', async ( req, res ) => {
    var origin = req.get('origin');
    var host = req.get('host');
    console.log( `The origin is : ${origin}` );
    console.log( `The host is : ${host}` );
    res.send( '/api/v0/' );
  } );

  // Start the Server
  app.listen( port, () => {
    console.log( `server running ${config.url}` );
    console.log( `press CTRL+C to stop server` );
  } );
})();
