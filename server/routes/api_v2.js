/**
 *
 * Trying to make a PI route callable by the react frontend.
 * DEPRECATED: we are using GraphQL, not this.
 */

import { Router } from 'express';
import fetchAPI from '../pi/piFetchers';

const router = Router();

router.route('/most_recent_summ').post(most_recent_summ);
router.route('/fetch_by_monthly').post(fetch_by_monthly);
router.route('/get_all_attributes').post(get_all_attributes);

/* fetch data using dataserver and wildcards */
function get_all_attributes(req, res) {
  fetchAPI.fetchWebId_byDataServer(req.body.wildcard).then(json_response => {
    res.status(200).send(json_response);
  });
}

/* get resource on a monthly basis */
function fetch_by_monthly(req, res) {
  fetchAPI.fetchWebId_byPoint(req.body.tagName).then(WebId_response => {
    // get Ghausi ChilledWater EUI on the first day of each month from 2016-01-01 to 2016-12-01
    fetchAPI
      .fetchStream_byMonths(
        WebId_response,
        (req.body.startTime = '2016-01-01'),
        (req.body.endTime = '2016-12-01'),
        (req.body.interval = '1mo')
      )
      .then(json_response => {
        console.log('fetchStream_byMonths test');
        console.log(json_response);
        res.status(200).send(json_response);
      });
  });
}

/* get the most-recent summary value of a resource */
function most_recent_summ(req, res) {
  fetchAPI.fetchWebId_byPoint(req.body.tagName).then(WebId_response => {
    fetchAPI.fetchStream_value(WebId_response).then(json_response => {
      console.log('fetchStream_value test:');
      console.log(json_response.Value); // Print Value (eg. Ghausi ChilledWater EUI = 65.44068...)
      console.log(json_response.Timestamp); // Print Timestamp (eg. 2017-12-18T18:27:17.9438976Z )
      res.status(200).send(json_response);
    });
  });
}

export default router;
