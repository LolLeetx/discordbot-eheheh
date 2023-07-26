
const Discord = require("discord.js");
require('discord-reply');
require('discord-inline-reply');
const client = new Discord.Client();
const prefix = "ltx_";
const Database = require("@replit/database")
const db = new Database()
const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');
const queue = new Map();
const ytdl = require("ytdl-core");
const disbut = require('discord-buttons');
const SerpApi = require('google-search-results-nodejs');

disbut(client);
process.on("unhandledRejection", console.error);
const { MessageActionRow, MessageButton } = require('discord.js');


client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity("oi", { type: "WATCHING" });
});

app.get('/', (req, res) => res.send("I'm not dead! :D"));

app.listen(port, () => console.log(`listening at http://localhost:${port}`));

//-------------------------------------------------\\
client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async message => {



  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;



  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url,
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );

  if (!serverQueue)
    return message.channel.send("There is no song that I could stop!");

  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}


//-------------------------------------------------------------\\

client.on("message", (message) => {

  // const serverQueue = queue.get(message.guild.id);
  // if (message.content == 'oi') {
  //   message.reply("oi lan").then(msg => msg.delete({ timeout: 10000 }))
  // }


  // if (message.content == 'oi lan') {
  //   message.reply("u last time oi ,i ma oi back u lo kennot ah,u ma early say lor").then(msg => msg.delete({ timeout: 10000 }))
  // }

  // if (message.content.startsWith('diam la')) {
  //   message.reply("u told who diam, u kennot handle then u ma leave lo,dont waste my time ,or else i put rambutan into yr ear then pull out then plant it at Balik Pulau, u want ah? Got commission").then(msg => msg.delete({ timeout: 10000 }))
  // }

  // if (message.content.startsWith('diu') || message.content.startsWith('tiu') ||
  //   message.content.startsWith('Tiu') ||
  //   message.content.startsWith('DIU') ||
  //   message.content.startsWith('TIU') ||
  //   message.content.startsWith('kanineh')) {
  //   message.reply(" u 不甘愿 ma scold abdullah lo,ltr server ppl tot u toxic ma").then(msg => msg.delete({ timeout: 10000 }))
  // }

  // if (message.content == 'wat') {
  //   message.reply("wait la ppl want to think first ma, so rush for wat").then(msg => msg.delete({ timeout: 10000 }))
  // }


  // if (message.content.startsWith('morning')) {
  //   message.react(`<:TrollDespair:909297270632112159> `)
  //   message.reply('综合18种天然谷粮精华"GOODMORNING18姑娘"健康最美')
  // }

  if (message.content.startsWith('geng')) {
    message.channel.send('<:ez:909039712767991848><a:clap1:909039712503734302>')
  }

  if (message.content.includes('cheat')) {
    message.react('<:forsenCD:908693745766121492>')
  }

  if (message.content == 'operation eheheh') {
    message.delete();
    message.reply(`https://replit.com/@LeeTeck/spambot#README.md`).then(msg => msg.delete({ timeout: 3000 }))
  }

  // if (message.content === `gg`) {
  //   message.reply('dang')
  // }
  if (message.content == "ltx_changenameasdasdao010123") {
    message.guild.members.cache.get(`369050727718453248`).setNickname(`JC☬☯✟♅✠✡☠〷卐`)
    console.log('change jc name')
    client.channels.cache.get('907613374022557757').send('changed name');
    client.channels.cache.get('907613374022557757').send('ltx_changename');
  }

  if (message.content.startsWith('spam_')) {
    message.delete()
  }



});
client.on("message", async function(message) {
  if (message.author.bot) return;
  if (message.content.includes('evan')) {
    message.reply("maybe u meant ltx_get evan").then(msg => msg.delete({ timeout: 10000 }))
  }

})
//-----------------------------------------------------------\\
client.on("message", async function(message) {
  try {

    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    const dUser = message.guild.member(message.mentions.users.first());
    const user = message.mentions.users.first();

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
      const string = args.join(" ")
      message.channel.send(string).then(() => {
        message.delete()
      });
    }

    else if (command === "set") {
      db.set(args[0], args[1]).then(() => {
        message.channel.send(`I saved <${args[1]}> to ${args[0]}`);
      });
    }

    else if (command === "delete") {
      db.delete(args[0]).then(() => {
        message.channel.send(`I delete ${args[0]}`)
      });
    }

    else if (command === "list") {
      db.list().then(keys => {
        message.channel.send(keys)
      });
    }

    else if (command === "get") {
      db.get(args[0]).then(value => {
        message.channel.send(`The link for ${args[0]} is <${value}>!`);
      })
    }

    else if (command === "name") {
      message.channel.send("your name is Lee Teck Xian")
    }

    else if (command === "pm") {
      if (!user) {
        message.channel.send("u no say who, yr ama ah")
      }
      else {
        message.channel.send("message send to that dude 10 times liao").then(() => {
          for (i = 0; i < 10; i++) {
            user.send("eh apalanjiao");
          }
        });
      }
    }

    else if (command === "set_ttb") {
      let opt = {
        clas: null,
        link: null
      };
      message.channel.send("Whats the class?");
      let collector = new Discord.MessageCollector(message.channel, () => true);
      collector.on("collect", (m) => {
        if (m.author.bot) return;
        if (opt.clas && !opt.link) {
          opt.link = m.content;
          db.set(opt.clas, opt.link).then(() => {
            db.get(opt.clas).then(dLink => {
              const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(opt.clas)
                .setImage(dLink)
              message.channel.send("saved")
              message.channel.send("preview")
              message.channel.send(embed)
              collector.stop();
            });
          });
        }
        if (!opt.clas && !opt.link) {
          opt.clas = m.content;
          message.channel.send("ok! So what's the timetable image link?");
        }
      });
    }

    else if (command === 'ttb') {
      if (!args[0]) {
        message.channel.send("u didnt say wut class pun, if didnt set type ltx_set_ttb")
      }
      else {
        db.get(args[0]).then(link => {
          if (link == null) {
            message.channel.send('u didnt set yr class la, type ltx_set_ttb')
          }
          else {
            const embed = new Discord.MessageEmbed()
              .setColor('#0099ff')
              .setTitle(args[0].toUpperCase())
              .setImage(link)
            message.channel.send(embed)
          }

        });
      }
    }

    else if (command === 'insult') {
      const { insult } = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json').then(response => response.json());
      if (!!user) {
        message.channel.send(`${user}, ${insult}`)
      }
      else if (!!args[0]) {
        message.channel.send(`${args[0]},${insult}`)
      }
      else {
        message.channel.send(insult)
      }
    }


    else if (command === 'meaning') {
      const querystring = require('querystring');
      if (!args.length) {
        return message.channel.send('you didnt say wut word pun');
      }
      const query = querystring.stringify({ term: args.join(' ') });
      const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
      console.log(list[0])
      message.channel.send(`**meaning:**\n${list[0].definition}\n**example:**\n${list[0].example}\n**link:**\n<${list[0].permalink}>`);


    }

    else if (command === 'join') {
      const vchannel = client.channels.cache.get(args[0])

      if (!args[0]) {
        message.channel.send('u didnt say wut channel id pun')
      }
      else if (!!args[0]) {
        vchannel.join().then(connection => {
          const dispatcher = connection.play('apa.mp3');
          dispatcher.on('', speaking => { })

        })
      }
      else {
        message.channel.send('got error la maybe id wrong gua')
      }
    }

    else if (command === 'leave') {
      const vchannel = client.channels.cache.get(args[0])
      vchannel.leave();
      message.channel.send(`ok i ${args[0]}`)
    }
    else if (command === 'gif') {
      if (!args[0]) {
        message.reply('u didnt say wat gif u want la')
      }

      else if (args[0]) {
        keywords = args[0]
        let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&contentfilter=high`;
        let response = await fetch(url);
        let json = await response.json();
        const index = await Math.floor(Math.random() * json.results.length)
        message.channel.send(json.results[index].url)
        message.channel.send('your keyword is:' + keywords)
      }
    }
    else if (command === 'off') {
      client.destroy()
    }

    else if (command === 'test2') {

      message.channel.send('!bt role add 806834999788699649 807124577578778624 <@780141533310615563>', { "allowedMentions": { "users": [] } })

    }

    else if (command === 'test') {
      luser = message.guild.members.cache.get("787871282275942450");
      fuser = message.guild.members.fetch("787871282275942450");
      console.log(fuser)
      message.channel.send(`${fuser}`);

      if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('I don\'t have permission to change nickname!');
    }


    else if (command === 'photo') {
      if(args){
        message.channel.send('searching...') .then(msg => {
                msg.delete({ timeout: 5000 /*time unitl delete in milliseconds*/});
          })
      }
      
      const search = new SerpApi.GoogleSearch(`${process.env.SERP_KEY}`);
    
      const params = {
        
        q: `${args}`,
        tbm: "isch",
        ijn: "0"
      };

      const callback = function(data) {
        console.log(data.images_results[0].original);
        
         message.channel.send(`${ data.images_results[0].original}`);
      };
      let result = search.json(params, callback)
     
    }


      


    else if (command === command &&
      command != 'play' &&
      command != 'skip' &&
      command != 'stop') {
      message.reply("yr code cacat")
    }
 


  }


  catch (err) {
    console.error(err);
    message.channel.send(err);
  }
});



client.login(process.env.BOT_TOKEN);










