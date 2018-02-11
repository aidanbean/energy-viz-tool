'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var router = (0, _express.Router)(); /**
                                      *
                                      * Example route for API
                                      *
                                      */

router.route('/info').get(getInfo);

function getInfo(req, res) {
  res.status(200).json({
    message: 'GET INFO'
  });
}

exports.default = router;
//# sourceMappingURL=api_v1.js.map