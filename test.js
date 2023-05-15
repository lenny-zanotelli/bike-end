const myURL = new URL('http://localhost/search')
const filters = {start:'Paris', end: 'danemark', duration : 9000}
const keys = Object.keys(filters)
keys.map((key)=>myURL.searchParams.set(key, filters[key]))
console.log(myURL.toString())
 
//--- back ---
const params = new URLSearchParams(myURL.search)
console.log('params.getAll("start") : ',params.getAll('start'))
console.log('params : ',params)
// console.log('URLSearchParams.getAll(myURL) : ',URLSearchParams.getAll(myURL))
console.log('myURL.searchParams : ',myURL.searchParams)
const paramObject = {}

for (const [key, value] of myURL.searchParams){paramObject[key]=value}
// myURL.searchParams.forEach((key, value)=> paramObject[key]=value)


console.log('paramObject : ',paramObject)
