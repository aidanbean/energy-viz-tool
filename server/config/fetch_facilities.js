/**
 * this puts the facilitiesLink dump into the "facilitiesLink" collection in
 * the database.
 */

import mongoose from 'mongoose';
import fetch from 'node-fetch';

const db = mongoose.connection;

const url = 'https://arm-tomcat1.ucdavis.edu/locations/buildings/thermalfeedback-1?apiKey=12345';

async function getFacilities(url) {
  try {
    console.log("Getting location");
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function processList() {
    const list = await getFacilities(url);
    for (const item of list) {
        // console.log(item);
        await storeEntry(item);
    }
}

async function storeEntry(item) {
    await db.collection('facilitiesLink').insertOne(item, function (error, response) {
        if(error) {
            console.log('Error occurred while inserting');
            // return
        } else {
            console.log('inserted record', response.ops[0]);
            // return
        }
    });
}

processList();
