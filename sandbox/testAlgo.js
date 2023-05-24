let journeys = [{a:'a', b:1},{a:'b', b:2},{a:'a', b:3},{a:'c', b:4},{a:'b', b:5}]
journeys = journeys.filter(
    journey => journeys.findIndex(each => each.a === journey.a)
);


console.log('journeys : ',journeys)
console.log('journeys : ',journeys)
// console.log('filteredJourneys : ',filteredJourneys)

