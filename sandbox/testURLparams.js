
"/journey/search?from=2.37825371181375%3B48.84915325462162&datetime=20230517T180000&max_duration=1200"

const myURL = new URL('http://localhost/search')
const filters = {start:'Paris', end: 'danemark', duration : 9000}
const keys = Object.keys(filters)
keys.map((key)=>myURL.searchParams.set(key, filters[key]))

 
//--- back ---
const params = new URLSearchParams(myURL.search)
console.log('myURL.search : ',myURL.search)
console.log('params.getAll("start") : ',params.getAll('start'))
console.log('params : ',params)
// console.log('URLSearchParams.getAll(myURL) : ',URLSearchParams.getAll(myURL))
console.log('myURL.searchParams : ',myURL.searchParams)
const paramObject = {}
for (const [key, value] of myURL.searchParams){paramObject[key]=value}
// myURL.searchParams.forEach((key, value)=> paramObject[key]=value)


console.log('paramObject : ',paramObject)


