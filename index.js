const Discord = require("discord.js");

const client = new Discord.Client();

const prefix = "ltx_";

const Database = require("@replit/database")

const db = new Database()
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send("I'm not dead! :D"));

app.listen(port, () => console.log(`listening at http://localhost:${port}`));


client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  
  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }
  

  else if (command === "sum") {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  }
  
  else if (command === "yell") {
  const string = args.join(" ");
  message.channel.send(string);
}
else if (command === "set") {
  db.set(args[0], args[1]).then(() => {
    message.channel.send(`I saved <${args[1]}> to ${args[0]}`);
  });
}
// args[0] is the key, args[1] is the value
else if (command === "get") {
  db.get(args[0]).then(value => {
    message.channel.send(`The link for ${args[0]} is <${value}>!`);
  })
}

else if (command === "name"){
  message.channel.send("your name is Lee Teck Xian")
 
}


else if (command === "pm"){
  for(i=0;i<10;i++){
    author = 369050727718453248 //johnchua eh user id
message.author.send("testing testing 123")

}

}
});
 



client.login(process.env.BOT_TOKEN);