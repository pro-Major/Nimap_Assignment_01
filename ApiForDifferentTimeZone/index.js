
const countries = {
    Afghanistan : ["en-Af" ,"Asia/Kabul"],
    America : ["en-US","America/Toronto"],
    Finland : ["en-IS","Atlantic/Reykjavik"],
    Iraq : ["en-IQ","Asia/Baghdad"],
    Pakistan : ["en-PK","Asia/Karachi"]

}
function timeZone(countries) {
    let finalData = []
    for (const [key,value] of Object.entries(countries)) {
    
        let currentTimeInIndia =  new Date().toLocaleTimeString(value[0],{
            timeZone: value[1]
    
        })
        // console.log(key,value)
        finalData.push(`The Time Zone of country ${key} is ${currentTimeInIndia}`)
    }
    return finalData;
}
console.log(timeZone(countries))
