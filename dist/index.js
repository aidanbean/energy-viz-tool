'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _env = require('./config/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _app2.default.listen(process.env.PORT || 8080, function () {
  console.log(_env2.default.name + ' server is listening at port ' + _env2.default.port);
});

exports.default = server;
//# sourceMappingURL=index.js.map