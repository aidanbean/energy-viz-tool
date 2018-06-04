/* TODO - convert JSON Timestamps from UTC to local
        - ensure that JSON Timestamps are adjusted to daylight savings time */

const fetch = require('node-fetch');

const piBaseUrl = 'https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/';
const piWebIdPath = 'points?path=\\\\util-pi-p\\';
const dataServer =
  'dataservers/s09KoOKByvc0-uxyvoTV1UfQVVRJTC1QSS1Q/points?nameFilter=';

const fetchWebId_byPoint = (tagName) => {
  /* Example fetch URL:
        https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/
        points?path=\\UTIL-PI-P\Giedt_Electricity_demand_kbtu
    */
  return fetch(`${piBaseUrl}${piWebIdPath}${tagName}`)
    .then((res) => res.json())
    .then((json) => json.WebId);
};

const fetchWebId_byDataServer = (tagName) => {
  /*  Querying via dataServer allows fetching with wildcards (*)

        Example fetch URL:
        https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/
        dataservers/s09KoOKByvc0-uxyvoTV1UfQVVRJTC1QSS1Q/points?nameFilter=Ghausi.CHW*
    */
  return fetch(`${piBaseUrl}${dataServer}${tagName}`).then((res) => res.json());
};

const fetchStream_value = (WebId) => {
  /*  Return a single JSON PI stream value using a WebId

        Example fetch URL:
        https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/streams/P09KoOKByvc0-uxyvoTV1UfQhyIAAAVVRJTC1QSS1QXEdIQVVTSV9DSElMTEVEV0FURVJfRVVJ/value

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
  return fetch(`${piBaseUrl}streams/${WebId}/value`).then((res) => res.json());
};

const fetchStream_byMonths = (WebId, startDate, endDate, interval) => {
  /*  Return a JSON PI stream with data from startDate to endDate with
        interval months in between.

        startDate, endDate, interval formats:
        2016-01-01, 2016-12-01, 1mo

        Example fetch URL:
        https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/streams/P09KoOKByvc0-uxyvoTV1UfQhyIAAAVVRJTC1QSS1QXEdIQVVTSV9DSElMTEVEV0FURVJfRVVJ/interpolated?startTime=2016-01-01%20%2B1mo-1s&endTime=2016-12-01%20%2B1mo-1s&interval=1mo

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

  let startTime = startDate + '%20%2B0mo-1s'; // startMonth + 0 months - 1 second
  let endTime = endDate + '%20%2B0mo-1s'; // endMonth + 0 months - 1 second

  return fetch(`${piBaseUrl}streams/${WebId}/interpolated?startTime=${startTime}
                &endTime=${endTime}&interval=${interval}`).then((res) =>
    res.json()
  );
};

const fetchStream_byMinutes = (WebId, startTime, endTime, interval) => {
  /*  Return a JSON PI stream with data from startMinute to endMinute with
        interval minutes in between.

        startMinute, endMinute, interval formats:
        12-11-2017-6am, 12-11-2017-12pm, 15m

        Example fetch URL:
        https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/streams/P09KoOKByvc0-uxyvoTV1UfQhyIAAAVVRJTC1QSS1QXEdIQVVTSV9DSElMTEVEV0FURVJfRVVJ/interpolated?startTime=12-11-2017-6am&endTime=12-11-2017-12pm&interval=15m

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
  return fetch(`${piBaseUrl}streams/${WebId}/interpolated?startTime=${startTime}
                &endTime=${endTime}&interval=${interval}`).then((res) =>
    res.json()
  );
};

const fetchStream_byDefault = (WebId) => {
  // default by previous 24 hours.

  return fetch(`${piBaseUrl}streams/${WebId}/interpolated?`);
};

const fetchStream_recorded = (WebId, startTime, endTime) => {
  /*  Return a JSON PI stream with data from startMinute to endMinute with
        interval minutes in between.

        startTime, endTime formats
        12-11-2017-6am, 12-11-2017-12pm

        Example fetch URL:
        https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/streams/P09KoOKByvc0-uxyvoTV1UfQhyIAAAVVRJTC1QSS1QXEdIQVVTSV9DSElMTEVEV0FURVJfRVVJ/recorded?startTime=12-11-2017-6am&endTime=12-11-2017-12pm
    */
  return fetch(`${piBaseUrl}streams/${WebId}/recorded?startTime=${startTime}
                &endTime=${endTime}`).then((res) => res.json());
};

const fetchStream_plot = (WebId, startTime, endTime) => {
  /*  Return a JSON PI stream with data from startMinute to endMinute with
        interval minutes in between.

        startTime, endTime formats
        12-11-2017-6am, 12-11-2017-12pm

        Example fetch URL:
        https://ucd-pi-iis.ou.ad3.ucdavis.edu/piwebapi/streams/P09KoOKByvc0-uxyvoTV1UfQhyIAAAVVRJTC1QSS1QXEdIQVVTSV9DSElMTEVEV0FURVJfRVVJ/recorded?startTime=12-11-2017-6am&endTime=12-11-2017-12pm
    */
  return fetch(
    `${piBaseUrl}streams/${WebId}/plot?startTime=${startTime}&endTime=${endTime}`
  ).then((res) => res.json());
};

const fetchStream_summary_AllType = (WebId) => {
  // {
  //     "Links": {},
  //     "Items": [
  //     {
  //         "Type": "PercentGood",
  //         "Value": {
  //             "Timestamp": "2018-04-27T17:28:01.1682014Z",
  //             "Value": 100,
  //             "UnitsAbbreviation": "",
  //             "Good": true,
  //             "Questionable": false,
  //             "Substituted": false
  //         }
  //     },
  //     {
  //         "Type": "Total",
  //         "Value": {
  //             "Timestamp": "2018-04-27T17:28:01.1682014Z",
  //             "Value": 66.06138119394916,
  //             "UnitsAbbreviation": "",
  //             "Good": true,
  //             "Questionable": false,
  //             "Substituted": false
  //         }
  //     },

  return fetch(`${piBaseUrl}streams/${WebId}/summary?summaryType=All`)
    .then((res) => res.json())
    .then((json) => json.Items);
};

const fetchStream_summary_AllType_WithTimes = (WebId, startTime, endTime) => {
  return fetch(
    `${piBaseUrl}streams/${WebId}/summary?startTime=${startTime}&endTime=${endTime}&summaryType=All`
  )
    .then((res) => res.json())
    .then((json) => json.Items);
};

const fetchStream_summary_byType = (WebId, startTime, endTime, type) => {
  return fetch(
    `${piBaseUrl}streams/${WebId}/summary?startTime=${startTime}&endTime=${endTime}&summaryType=${type}`
  )
    .then((res) => res.json())
    .then(json, json.Value);
};

module.exports = {
  fetchWebId_byPoint,
  fetchWebId_byDataServer,
  fetchStream_value,
  fetchStream_byDefault,
  fetchStream_byMonths,
  fetchStream_byMinutes,
  fetchStream_summary_AllType,
  fetchStream_summary_AllType_WithTimes,
  fetchStream_recorded,
  fetchStream_plot,
  fetchStream_summary_byType,
};
