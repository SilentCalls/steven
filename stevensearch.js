const Discord = require("discord.js");
const yt = require('ytdl-core');
const destroy = require('destroy')
const client = new Discord.Client();
const YouTube = require("youtube-node")
const youtube = new YouTube()
	youtube.setKey('AIzaSyC_JNQTPwjD-IzGPrQFyvVu2c_eCf3Qrh4')
var music_list = []
var music_playing = false
var airhorn = false

client.login("");

client.on('message', message => {
	var youtube_play = function(){
		if(music_list[0] === undefined) {
			return message.member.voiceChannel.leave()
			music_playing = false
		}
		message.member.voiceChannel.join()
		.then(connection => {
			music_playing = true
			let stream = yt(music_list[0], {audioonly: true});
			var dispatcher = connection.playStream(stream);
				music_list.shift()
			dispatcher.on('end', () => {
					youtube_play()
			})
		})
	}


	if(message.content.startsWith('!!!')) {
		if(message.content.startsWith('!!!youtube')) {
			var search_term = message.content.substring(11)
			youtube.search(search_term, 1, function(error, result) {
				if(error) {
					message.reply(error);
				}else{
					var youtube_link = "https://www.youtube.com/watch?v=" + result.items[0].id.videoId
				}
					if(message.member.voiceChannel === null){
					return message.reply("Please join a voice channel!")
			}else{
				music_list.push(youtube_link)
				if(music_playing === false) {
				youtube_play()
			}
				};
			});
		};
		if(message.content === "!!!skip" && message.author.id === "201316754947964928"){
			youtube_play()
		}
	}
})

client.on('ready', () => {
	console.log("Started up fine!")
})
