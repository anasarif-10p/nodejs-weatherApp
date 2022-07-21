import { createRequire } from "module";

const require = createRequire(import.meta.url);
const request = require("postman-request");

const weatherInfo = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=76404ed940231ab0f17949efb29af08d&query=${latitude},${longitude}`;
    request({url, json: true}, (error, response)=>{
        if (error) {
            callback('unable to connect to the api', undefined);
        }else if (response.success == false) {
            callback(response.error.info)
        } else{
            callback(undefined, response.body.current.temperature)
        }
    })
    
}

export default weatherInfo;