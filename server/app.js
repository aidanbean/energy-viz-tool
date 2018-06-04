import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import cors from 'cors';

import env from './config/env';
import routes from './routes';
import database from './config/database';

// imported these once to run the scripts once and populate our db.
// import populate from './config/populate_db';
// import facilities from './config/fetch_facilities';

const app = express();
/*==================================
=            Middleware            =
==================================*/
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(compression());
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// serve static files, this is for frontend React
app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

/*=====  End of Middleware  ======*/

/*===========================================
=            Basic Authentication            =
===========================================*/

// app.use(require('node-basicauth')({'haochuan': 'password'}));

/*=====  End of Basic Authentication  ======*/

/*===========================
=            COR            =
===========================*/

app.use(cors());

/*=====  End of COR  ======*/

/*===================================
=          GraphQL Route            =
===================================*/

import expressGraphQL from 'express-graphql';
import { schema, root } from './graphql/schema';

// use the GraphQL schema defined in server/graphql
app.use(
  '/api/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true,
    rootValue: root
  })
);

/*====== End of GraphQL Route =====*/

// Load React App
// Serve HTML file for production
if (env.name === 'production') {
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

export default app;
