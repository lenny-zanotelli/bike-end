const { isInCache, addToCache, getCache } = require("../app/services/cache");

const hello = async ()=>{
    await addToCache('test2', [1,2,3])
    console.log("hekllo")
    const result = await getCache('test2')
    console.log('result : ',result)

}
hello()