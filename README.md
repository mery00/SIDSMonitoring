# SIDSMonitoring
With the term SIDS(Sudden Infant Death Syndrome) we refer to the sudden death of children under one year of age, which occurs during sleep and which, even after very accurate investigations, finds no explanation.
So, to prevent this, the project simulates a smartwatch that at certain intervals detects the newborn's vital parameters(heartbeat and temperature). This parameters are sent to the Nuclio function; if the parameters are abnormal, the function sends a SMS through an [IFTTT](https://ifttt.com/) applet which gets triggered by a [Webhook](https://ifttt.com/maker_webhooks) and can forward the data to any device compatible with [IFTTT](https://ifttt.com/).
The project could be improved by introducing an IFTTT compatible alarm clock, so we would have the security that the newborn's parents are alerted. 

SIDSmonitoring is a simple function made for [Nuclio](https://nuclio.io/), an open source and managed serverless platform that we can run on our home server. It uses [RabbitMQ](https://www.rabbitmq.com/) as broker to share MQTT messages around.

This was the final project for the Serverless Computing class at [Università degli Studi di Salerno](https://www.unisa.it/), we used Nuclio to simulate a fully fledged serverless infrastructure.

### Prerequisite
* [Docker](https://www.docker.com/)
* [Node.js](https://nodejs.org/en/)

### How to use it

First of all, clone this repository, then you need to start a Docker to start up a docker instance of Nuclio, with the command: \
 \
```$ sudo docker run -p 8070:8070 -v /var/run/docker.sock:/var/run/docker.sock -v /tmp:/tmp nuclio/dashboard:stable-amd64``` \
 \
And to start up a docker instance of RabbitMQ, with the command: \
 \
```$ sudo docker run -p 9000:15672  -p 1883:1883 -p 5672:5672  cyrilix/rabbitmq-mqtt``` 

Make an applet on [IFTTT](https://ifttt.com/) to send a notificaton, or a SMS, through [Webhooks](https://ifttt.com/maker_webhooks) service. \
Browse to [http://localhost:8070](http://localhost:8070/), create a project, load the ```sidsmonitoring.yaml``` file by changing the IP address, the event name and the secret key from IFTTT in the post-card section and deploy it. Anything should work just fine.
Remember that you can retrieve your secret key through the webhooks service documentation on IFTTT.
 \
 
 To run the ```logger.js``` file, open the terminal, browse to the SIDSmonitoring folder and install the dependencies: 
 
 ```$ npm install```
 
 Then, you need to run the file smart_watch.js, with the command:
 
 ```$ node smart_watch.js *INSERT YOUR IP*```
 
 Finally, run the file logger.js with the command:
 
 ```$ node logger.js *INSERT YOUR IP*```
 
 
### Technologies used
* [Nuclio](https://nuclio.io/)
* [Docker](https://www.docker.com/)
* [RabbitMQ](https://www.rabbitmq.com/)
* [IFTTT](https://ifttt.com/)

