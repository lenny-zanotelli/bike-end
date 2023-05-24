const results = [{a:'a', b:1},{a:'b', b:2},{a:'a', b:3},{a:'c', b:4},{a:'b', b:5}]
const allJourneys = results.filter((journey, index) =>
    results.findIndex((journey) => journey.a === index)
);
console.log(allJourneys)