import app from './app';
import env from './config/env';


const server = app.listen(process.env.PORT || 8080, () => {
  // console.log(`${env.name} server is listening at port ${env.port}`);
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

export default server;
