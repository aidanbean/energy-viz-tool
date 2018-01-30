/*  Some examples of PI Web API queries using the functions in "piFetchers.js". 
    Delete/Modify this file as you see fit during your development process */

const fetchAPI = require('./piFetchers.js');
const test_tagName = 'Ghausi_ChilledWater_EUI';
const test_wildcard = 'Giedt*';

/* get the most-recent summary value of a resource */
fetchAPI.fetchWebId_byPoint(test_tagName).then((WebId_response) => {
    fetchAPI.fetchStream_value(WebId_response).then((json_response) => {
        console.log("fetchStream_value test:")
        console.log(json_response.Value);     // Print Value (eg. Ghausi ChilledWater EUI = 65.44068...)
        console.log(json_response.Timestamp); // Print Timestamp (eg. 2017-12-18T18:27:17.9438976Z )
    });
});

/* get resource on a monthly basis */
fetchAPI.fetchWebId_byPoint(test_tagName).then((WebId_response) => {
    // get Ghausi ChilledWater EUI on the first day of each month from 2016-01-01 to 2016-12-01
    fetchAPI.fetchStream_byMonths(  WebId_response, 
                                    startTime = '2016-01-01', 
                                    endTime = '2016-12-01', 
                                    interval = '1mo')
                                    .then((json_response) => {
        console.log('fetchStream_byMonths test')
        console.log(json_response);
    });
});

/* get resource in a shorter time interval */
fetchAPI.fetchWebId_byPoint(test_tagName).then((WebId_response) => {
    // get Ghausi ChilledWater EUI on 12-11-2017 from 6am to 12pm every 15 minutes
    fetchAPI.fetchStream_byMinutes( WebId_response,
                                    startTime = '12-11-2017-6am', 
                                    endTime = '12-11-2017-12pm', 
                                    interval = '15m')
                                    .then((json_response) => {
        console.log('fetchStream_byMinutes test');
        console.log(json_response);
    });
});

/* fetch data using dataserver and wildcards */
fetchAPI.fetchWebId_byDataServer(test_wildcards).then((json_response) => {
    for(let item of json_response.Items) { // Retrieve names of all Giedt attributes
        console.log(item.Name);
    }
});
