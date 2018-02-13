'use strict';

/*  Some examples of PI Web API queries using the functions in "piFetchers.js". 
    Delete/Modify this file as you see fit during your development process */

var fetchAPI = require('./piFetchers.js');
var test_tagName = 'Ghausi_ChilledWater_EUI';
var test_wildcard = 'Giedt*';

/* get the most-recent summary value of a resource */
fetchAPI.fetchWebId_byPoint(test_tagName).then(function (WebId_response) {
    fetchAPI.fetchStream_value(WebId_response).then(function (json_response) {
        console.log("fetchStream_value test:");
        console.log(json_response.Value); // Print Value (eg. Ghausi ChilledWater EUI = 65.44068...)
        console.log(json_response.Timestamp); // Print Timestamp (eg. 2017-12-18T18:27:17.9438976Z )
    });
});

/* get resource on a monthly basis */
fetchAPI.fetchWebId_byPoint(test_tagName).then(function (WebId_response) {
    // get Ghausi ChilledWater EUI on the first day of each month from 2016-01-01 to 2016-12-01
    fetchAPI.fetchStream_byMonths(WebId_response, startTime = '2016-01-01', endTime = '2016-12-01', interval = '1mo').then(function (json_response) {
        console.log('fetchStream_byMonths test');
        console.log(json_response);
    });
});

/* get resource in a shorter time interval */
fetchAPI.fetchWebId_byPoint(test_tagName).then(function (WebId_response) {
    // get Ghausi ChilledWater EUI on 12-11-2017 from 6am to 12pm every 15 minutes
    fetchAPI.fetchStream_byMinutes(WebId_response, startTime = '12-11-2017-6am', endTime = '12-11-2017-12pm', interval = '15m').then(function (json_response) {
        console.log('fetchStream_byMinutes test');
        console.log(json_response);
    });
});

/* fetch data using dataserver and wildcards */
fetchAPI.fetchWebId_byDataServer(test_wildcards).then(function (json_response) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = json_response.Items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;
            // Retrieve names of all Giedt attributes
            console.log(item.Name);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
});
//# sourceMappingURL=PiFetchers.example.js.map