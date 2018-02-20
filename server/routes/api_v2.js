/**
 *
 * Trying to make a PI route callable by the react frontend.
 *
 */

import { Router } from 'express';
import fetchAPI from '../pi/piFetchers';

const test_tagName = 'Ghausi_ChilledWater_EUI';

const router = Router();

router.route('/resource_summary').get(resource_summary);

function resource_summary(req, res) {
    fetchAPI.fetchWebId_byPoint(test_tagName).then((WebId_response) => {
        fetchAPI.fetchStream_value(WebId_response).then((json_response) => {
            console.log("fetchStream_value test:")
            console.log(json_response.Value);     // Print Value (eg. Ghausi ChilledWater EUI = 65.44068...)
            console.log(json_response.Timestamp); // Print Timestamp (eg. 2017-12-18T18:27:17.9438976Z )
            res.status(200).json({
                message: 'Fetched the data successfully!! How do I make it show up???'
            });
        });
    });
}

export default router;
