/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global process, connection */

var amqp = require('amqplib');
var argv = require('minimist')(process.argv.slice(2))
const TOPIC = 'newborn/log'

if(argv.h || argv._.length === 0){
    console.log("node logger.js [ip_address]")
    process.exit();
}

let main = async (ip) => {
	const connection = await amqp.connect('amqp://guest:guest@' +ip+ ':5672');
	process.once('SIGINT', () => connection.close());

    const channel = await connection.createChannel();
    console.log(' [*] Waiting for messages. To exit press CTRL+C');
	await channel.assertQueue(TOPIC,{durable:false});
	await channel.consume(TOPIC, (msg) => {
		if (msg !== null) {
            const d = new Date()
            const now = d.getUTCFullYear() +"/"+ (d.getUTCMonth()+1) +"/"+ d.getUTCDate() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds()
            console.log(" ["+now+"] %s: '%s'", msg.fields.routingKey, msg.content.toString());
			channel.ack(msg);
		}
	});
}

main(argv._[0])
	.then((msg) => console.log('Logging on queue:' + TOPIC))
	.catch((err) => console.error(''+ err));

