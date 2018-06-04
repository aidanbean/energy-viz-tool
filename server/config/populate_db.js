/**
 * this script queries the PI API and gets the webID for every POINT (tagName)
 * in the specified csv file. Then, it pairs the tagName and other metadata
 * (building, equipment type, etc.) with the webID, and inserts the document in
 * the "good_data" collection in the database.
 */

import mongoose from 'mongoose';
import fs from 'fs';
import parse from 'csv-parse';
import fetchAPI from '../pi/piFetchers';
import DataModel from './models/data_model';

const db = mongoose.connection;
const collection = 'good_data';
var filePath = './Good_PI_Data/Good_CHW.csv';

fs.open(filePath, 'r+', function(error) {
  if (error) {
    console.error('open error:  ' + error.message);
  } else {
    console.log('Successfully opened ' + filePath);
  }
});

/* process all data asynchronously. */
async function processRows(rows) {
  for (const column of rows) {
    await processColumn(column);
  }
  /* in-parallel solution (note: may be too many parallel connections) */
  // const promises = rows.map(processLine);
  // await Promise.all(promises);
}

async function processColumn(column) {
  try {
    console.log('Fetching webID for point:');
    console.log(column[1]);
    const webId_response = await fetchAPI.fetchWebId_byPoint(column[1]);
    console.log('webID fetched:');
    console.log(webId_response);
    var entry = {
      webId: webId_response,
      tagName: column[1],
      building: column[2],
      equipmentType: column[3],
      equipmentNumber: '',
      sensorType: column[4],
    };

    console.log('Putting the following data in the database:');
    console.log(JSON.stringify(entry));

    const dbEntry = new DataModel(entry);

    await db.collection(collection).insertOne(dbEntry);
  } catch (err) {
    console.log('Error: ' + err.message);
  }
}

var parser = parse({delimiter: ','}, function(err, data) {
  if (err) {
    console.log('Error:' + err.message);
  }
  console.log('Processing file');
  /* process all data asynchronously */
  processRows(data);
  console.log('Data successfully processed and input into database!');
});

/* read the inputFile, feed the contents to the parser */
fs
  .createReadStream(filePath, function(err) {
    if (err) {
      console.log('Error:' + err.message);
    }
  })
  .pipe(parser, function(err) {
    if (err) {
      console.log('Error:' + err.message);
    }
  });
