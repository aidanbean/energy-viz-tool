//TODO: edit dataFetcher to get stats data from PI client
import React, { Component } from 'react';
// implement data fetcher, depends on what client want to display in the table

console.log("test statement");
// console.log("props: " + this.props);


class fetchData extends Component {
    constructor(prop) {
        super(prop);
        console.log("prop value: " + prop);
    }
}

// export default fetchData;

const buildingArray = [
  'Kemper',
  'ACAD',
  'Silo',
  'Dutton',
  'Miller',
  'Peter A. Rock',
  'MU',
  'Bainer',
  'Wellman',
  'Meyer',
  'Giedt',
];
const equipmentArray = ['CCV', 'AHU', 'HCV', 'HVO'];

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const fakeData = () => {
  var num = Math.floor(Math.random() * 11);
  return {
    building: buildingArray[num],
    equipmentType: equipmentArray[Math.floor(Math.random() * 4)],
    equipmentNumber: Math.floor(Math.random() * 30),
    IndoorTemperature: Math.floor(Math.random() * 100),
    OutdoorTemperature: Math.floor(Math.random() * 100),
  };
};

function dataFetcher(len = 5553) {
  return range(len).map(d => {
    return {
      ...fakeData(),
      children: range(10).map(fakeData),
    };
  });
}

export default dataFetcher;
