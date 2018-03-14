// implement data fetcher, depends on what client want to display in the table

const buildingArray = ["Kemper", "ACAD", "Silo", "Dutton", "Miller", "Peter A. Rock", "MU", "Bainer", "Wellman", "Meyer", "Giedt"];
const equipmentArray = ["CCV", "AHU", "HCV", "HVO"];


const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};


const fakeData = () => {
    const statusChance = Math.random();
    var num = Math.floor((Math.random() * 11));
    return {
        building: buildingArray[num],
        equipmentType: equipmentArray[Math.floor((Math.random() * 4))],
        equipmentNumber: Math.floor(Math.random() * 30),
        IndoorTemperature: Math.floor(Math.random() * 100),
        OutdoorTemperature: Math.floor(Math.random() * 100),
        // status:
        //     statusChance > 0.66
        //         ? "relationship"
        //         : statusChance > 0.33 ? "complicated" : "single"
    };
};

function dataFetcher(len = 5553) {
    return range(len).map(d => {
        return {
            ...fakeData(),
            // children: range(10).map(fakeData)
        };
    });
}

export default dataFetcher;


