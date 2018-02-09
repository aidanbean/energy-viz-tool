/**
 *
 * Environment Config
 *
 */

const env = {
  production: {
    name: 'production',
    port: process.env.PORT || 4000
  },
  dev: {
    name: 'dev',
    port: process.env.PORT || 4000
  },
  test: {
    name: 'test',
    port: process.env.PORT || 4000
  }
};
export default env[process.env.NODE_ENV];
