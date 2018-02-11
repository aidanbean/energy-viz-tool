'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var router = (0, _express.Router)(); /**
                                      *
                                      * Example route for page
                                      *
                                      */

router.route('/getPageData').get(getPageData);

function getPageData(req, res) {
  res.status(200).json('Page Data');
}

exports.default = router;
//# sourceMappingURL=page.js.map