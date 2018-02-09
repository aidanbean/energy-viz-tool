import app from './app';
import env from './config/env';


const server = app.listen(process.env.PORT || 4000, () => {
  // console.log(`${env.name} server is listening at port ${env.port}`);
  console.log("Express server listening");
});

export default server;
