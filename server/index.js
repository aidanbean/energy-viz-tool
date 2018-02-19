import app from './app';
import env from './config/env';


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}

const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`${env.name} server is listening at port ${env.port}`);
});


export default server;
