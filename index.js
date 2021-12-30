const config = require("./config.json");
const Discord = require("discord.js");
const chalk = require('chalk');
const gamedig = require("gamedig");

const client = new Discord.Client();

client.config = config;

var nb = 1000



const updateChannel = async () => {

		const channel = client.channels.cache.get(config.playerCountChannelID);
		if(!channel) throw new Error("La salon spécifié dans la configuration n'existe pas !");
		
	    const stats = await gamedig.query({
	        type: "garrysmod",
	        host: config.playerCountServerIP,
	        port: config.playerCountServerPort
		});
		
	    if (stats.raw.numplayers != nb) {
	    	channel.setName(`👥 ・GMod4Life : ${stats.raw.numplayers}/90`);
			client.user.setActivity(`👥 ・GMod4Life : ${stats.raw.numplayers}/90`, {type: "PLAYING"});
	    }
};

client.on("ready", () => {

	console.log(chalk.green("[BOT] Connected to Discord."));
	
	
	updateChannel();
	setInterval(updateChannel, 60000*0.05);
	
});

client.on("messageCreate", message => {
	if(message.author.bot) return;

	if(message.content === "+rules")
	const embed = new Discord.MessageEmbed()
		.setColor("#021c4a")
		.setTitle("**`` Règle L.S.P.D ``**")		
		.setFooter("LSPD | BOT, https://cdn.discordapp.com/attachments/923731758833360918/926102347816534056/LSPDfi24755436x391-1512x512.png")
		.setThumbnail("https://cdn.discordapp.com/attachments/923731758833360918/926102347816534056/LSPDfi24755436x391-1512x512.png");


	message.channel.send({ embeds: [embed]});
})
client.login(process.env.TOKEN);
