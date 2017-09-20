const Discord = require('discord.js');
//var auth = require('./auth.json');
var logger = require('winston');
var ua = require('universal-analytics');
var moment = require('moment');
var http = require('http');


const GA_KEY = process.env.GA_KEY;
var DISCORD_BOT_TOKEN=process.env.DISCORD_TOKEN;
var visitor = ua(GA_KEY);
//var got = require('got');
// Configure logger settings

//key will be username
var userPointsTracker = [];
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
var bot = new Discord.Client(
    
);
bot.login(DISCORD_BOT_TOKEN);

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    logger.info('start timer');
    setInterval(compileStats, 10000);



});

bot.on('message', function(message) {
    
    visitor.event("server-points", "chat-post", message.author.id + '-' + message.author.username).send();
    
});

/*
bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    // if(newUserChannel != null){
    //     if(checkIfUserInArray(userPointsTracker, newMember.user.username) == false){
    //         userPointsTracker.push(newMember.user.username, 0);

    //     }
    //     newUserChannel.members.forEach(member=>{
    //     console.log('user ', member.user.username, member.user.presence.status);

    //     });
    // }    
    //console.log('new member', newMember);
    let oldUserChannel = oldMember.voiceChannel
    var oldMemberJoinedDate = moment(oldMember.joinedTimestamp);
    var newMemberJoinedDate = moment(newMember.joinedTimestamp);
    //console.log('olMember joined time',oldMember.user, oldMember.user.presence);
    //console.log('newMember joined time',newMember.user, newMember.user.presence);
    //joinedTimestamp

    oldMember.voiceChannel


});    
*/
var compileStats = function(){
    let voiceUserCount = 0;
    console.log('compileStats called, voice user count ', voiceUserCount, new Date());
    let channels = bot.channels;
    
    channels.forEach( channel => {
        if(channel.type == 'voice'){
            console.log('channel is voice', channel.name);
            let channelMembers = channel.members;
            channelMembers.forEach(channelMember => {
                console.log('channel member ', channelMember.user.username);
                visitor.event("server-points", "voice-chat", channelMember.user.id + '-' + channelMember.user.username).send();
                //voiceUserCount++;
            });
        }
    });
}
var checkIfObjectInArray = function (arr, username){
    for(var i = 0; i < arr.length;i++){
        if (arr[i].username == username){
            return true
        }
    }
    return false;
}



                
               
                  


