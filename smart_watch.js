/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global process */

const argv = require('minimist')(process.argv.slice(2))
const mqtt = require("./mqttservice")

if(argv.h || argv._.length === 0){
    console.log("node smart_watch.js [ip_address]")
    process.exit();
}

setInterval(() => {
    let heart = Math.floor(Math.random() * 60 + 140)
    let temp = Math.floor(Math.random()* 35 + 5)
    if(heart <= 50 || heart >= 210 || temp <= 34 || temp >= 40){
         mqtt.send_message(argv._[0], { warning: true , heart: heart , temp: temp }, "newborn/health");
    }else{
         mqtt.send_message(argv._[0], { warning: false , heart: heart , temp: temp }, "newborn/health");
    }
},7000);

