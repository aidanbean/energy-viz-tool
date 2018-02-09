import app from './app';
import env from './config/env';


const server = app.listen(eprocess.env.PORT || 8080, () => {
  console.log(`${env.name} server is listening at port ${env.port}`);
});

export default server;
