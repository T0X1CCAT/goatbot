const Discord = require('discord.js');
//var auth = require('./auth.json');
var logger = require('winston');
var ua = require('universal-analytics');


var GA_KEY = process.env.GA_KEY;
var DISCORD_BOT_TOKEN=process.env.DISCORD_TOKEN;
var visitor = ua(GA_KEY);
//var got = require('got');
// Configure logger settings


logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

function output(error, token) {
    if (error) {
            console.log(`There was an error logging in: ${error}`);
            return;
    } else
            console.log(`Logged in. Token: ${token}`);
}

// Initialize Discord Bot
var bot = new Discord.Client();
bot.login(DISCORD_BOT_TOKEN);

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function(message) {
    if (message.channel.isPrivate) {
            console.log(`(Private) ${message.author.name}: ${message.content}`);
    } else {
            console.log(`(${message} / ${message.channel.name}) ${message.author.username}: ${message.content}`);
            visitor.event("server-points", "Chat post").send();
            if(message.content.startsWith('g!ping')){
                message.reply( "jeff!");    
                visitor.event("test", "Event Action").send();
                console.log('after send');
            } 
           
    }
    
    
});

                
               
                  


