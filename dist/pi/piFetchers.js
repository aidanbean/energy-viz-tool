'use strict';

/* TODO - convert JSON Timestamps from UTC to local 
        - ensure that JSON Timestamps are adjusted to daylight savings time */

var fetch = require('node-fetch');

var piBaseUrl = 'https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/';
var piWebIdPath = 'points?path=\\\\util-pi-p\\';
var dataServer = 'dataservers/s09KoOKByvc0-uxyvoTV1UfQVVRJTC1QSS1Q/points?nameFilter=';

var fetchWebId_byPoint = function fetchWebId_byPoint(tagName) {
    /* Example fetch URL: 
        https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/
        points?path=\\UTIL-PI-P\Giedt_Electricity_demand_kbtu
    */
    return fetch('' + piBaseUrl + piWebIdPath + tagName).then(function (res) {
        return res.json();
    }).then(function (json) {
        return json.WebId;
    });
};

var fetchWebId_byDataServer = function fetchWebId_byDataServer(tagName) {
    /*  Querying via dataServer allows fetching with wildcards (*)
         Example fetch URL:
        https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/
        dataservers/s09KoOKByvc0-uxyvoTV1UfQVVRJTC1QSS1Q/points?nameFilter=Ghausi.CHW*
    */
    return fetch('' + piBaseUrl + dataServer + tagName).then(function (res) {
        return res.json();
    });
};

var fetchStream_value = function fetchStream_value(WebId) {
    /*  Return a single JSON PI stream value using a WebId
         Example fetch URL:
        https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/
        streams/P09KoOKByvc0-uxyvoTV1UfQhyIAAAVVRJTC1QSS1QXEdIQVVTSV9DSElMTEVEV0FURVJfRVVJ/value
         Sample JSON Response:
        {
            "Timestamp": "2017-12-19T07:59:00Z",
            "Value": 65.44242,
            "UnitsAbbreviation": "",
            "Good": true,
            "Questionable": false,
            "Substituted": false
        }
    */
    return fetch(piBaseUrl + 'streams/' + WebId + '/value').then(function (res) {
        return res.json();
    });
};

var fetchStream_byMonths = function fetchStream_byMonths(WebId, startDate, endDate, interval) {
    /*  Return a JSON PI stream with data from startDate to endDate with
        interval months in between.
         startDate, endDate, interval formats:
        2016-01-01, 2016-12-01, 1
         Example fetch URL:
        https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/streams/
        P09KoOKByvc0-uxyvoTV1UfQhyIAAAVVRJTC1QSS1QXEdIQVVTSV9DSElMTEVEV0FURVJfRVVJ/
        interpolated?startTime=2016-01-01%20%2B1mo-1s&endTime=2016-12-01%20%2B1mo-1s&interval=1mo
         Sample JSON Response:
        {
          "Links": {},
          "Items": [
            {
              "Timestamp": "2016-01-01T07:59:59Z",
              "Value": 80.0,
              "UnitsAbbreviation": "",
              "Good": true,
              "Questionable": false,
              "Substituted": false
            },
            {
              "Timestamp": "2016-02-01T07:59:59Z",
              "Value": 81.0,
              "UnitsAbbreviation": "",
              "Good": true,
              "Questionable": false,
              "Substituted": false
            },
            ...
            {
              "Timestamp": "2016-12-01T07:59:59Z",
              "Value": 63.6807823,
              "UnitsAbbreviation": "",
              "Good": true,
              "Questionable": false,
              "Substituted": false
            }
          ],
          "UnitsAbbreviation": ""
        }
    */

    var startTime = startDate + '%20%2B0mo-1s'; // startMonth + 0 months - 1 second
    var endTime = endDate + '%20%2B0mo-1s'; // endMonth + 0 months - 1 second

    return fetch(piBaseUrl + 'streams/' + WebId + '/interpolated?startTime=' + startTime + '\n                &endTime=' + endTime + '&interval=' + interval).then(function (res) {
        return res.json();
    });
};

var fetchStream_byMinutes = function fetchStream_byMinutes(WebId, startTime, endTime, interval) {
    /*  Return a JSON PI stream with data from startMinute to endMinute with
        interval minutes in between.
         startMinute, endMinute, interval formats:
        12-11-2017-6am, 12-11-2017-12pm, 15m
         Example fetch URL:
        https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/streams/
        P09KoOKByvc0-uxyvoTV1UfQhyIAAAVVRJTC1QSS1QXEdIQVVTSV9DSElMTEVEV0FURVJfRVVJ/
        interpolated?startTime=12-11-2017-6am&endTime=12-11-2017-12pm&interval=15m
         Sample JSON Response:
        {
          "Links": {},
          "Items": [
          {
            "Timestamp": "2017-12-11T06:00:00Z",
            "Value": 65.34507,
            "UnitsAbbreviation": "",
            "Good": true,
            "Questionable": false,
            "Substituted": false
          },
          {
            "Timestamp": "2017-12-11T06:15:00Z",
            "Value": 65.34524,
            "UnitsAbbreviation": "",
            "Good": true,
            "Questionable": false,
            "Substituted": false
          },
            ...
          {
           "Timestamp": "2017-12-12T00:00:00Z",
           "Value": 65.35652,
           "UnitsAbbreviation": "",
           "Good": true,
           "Questionable": false,
           "Substituted": false
         }
         ],
         "UnitsAbbreviation": ""
        }
    */
    return fetch(piBaseUrl + 'streams/' + WebId + '/interpolated?startTime=' + startTime + '\n                &endTime=' + endTime + '&interval=' + interval).then(function (res) {
        return res.json();
    });
};

module.exports = {
    fetchWebId_byPoint: fetchWebId_byPoint,
    fetchWebId_byDataServer: fetchWebId_byDataServer,
    fetchStream_value: fetchStream_value,
    fetchStream_byMonths: fetchStream_byMonths,
    fetchStream_byMinutes: fetchStream_byMinutes
};
//# sourceMappingURL=piFetchers.js.map