const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const mongoose = require('mongoose');
const shareModel = require('../../models/share');
const { Database } = require("quickmongo")
const prime = new Database(process.env.prime_db)

module.exports = {
	name: 'channel',
	description: `set the share channel`,
	cooldown : 5,
	UserPermission : ["MANAGE_CHANNELS"],
	async execute(client , interaction , language) {
await interaction.editReply(language.channel.wait)

let theC = interaction.options.getChannel('channel')

if(!theC){
	theC = "Not Found"
}
let perms = interaction.guild.me.permissionsIn(theC).toArray() && interaction.guild.me.permissions.toArray()

	if(theC.type !== "GUILD_TEXT"){
		if(theC.type === "GUILD_VOICE"){
			await interaction.editReply(`${language.channel.err} ${language.ctype.voice} ${language.channel.err2}`)
		}

			if(theC.type === "GUILD_CATEGORY"){
			await interaction.editReply(`${language.channel.err} ${language.ctype.category} ${language.channel.err2}`)
		}

	}else
    if(1 == 1){
        let pg = await prime.get(`primeguilds_${client.user.id}`)

if(!perms.includes("ADMINISTRATOR") && !pg.includes(interaction.guild.id)){
if(!perms.includes('VIEW_CHANNEL') && !pg.includes(interaction.guild.id)){
 await interaction.editReply(language.channel.vc)
}else


if(!perms.includes('SEND_MESSAGES') && !pg.includes(interaction.guild.id)){
await interaction.editReply(laugage.channel.sm)
}else

if(!perms.includes('EMBED_LINKS') && !pg.includes(interaction.guild.id)){
 await interaction.editReply(language.channel.me)
}}else


if(pg.includes(interaction.guild.id) || perms.includes("ADMINISTRATOR") || perms.includes('SEND_MESSAGES') && perms.includes('VIEW_CHANNEL') && perms.includes('EMBED_LINKS')){
await interaction.editReply({ content : `${language.channel.success} <#${theC.id}> **`})

let data = await shareModel.findOne({ guildID: interaction.guild.id });

  shareModel.findOne({
            guildID: interaction.guild.id
        }, async (err, doc) => {
            if (err) throw err;
            if (!doc) {
                await new shareModel({
                    guildID: interaction.guildId,
                    guildName: interaction.guild.name,
                    channel: theC.id,
                    limitDeleting: 3
                }).save();
            } else {
                await shareModel.findOneAndUpdate({ guildID: interaction.guild.id, guildName: interaction.guild.name }, { channel: theC.id, desc: data.desc });
            }
        })
    }

}

setTimeout(async() => {
    let aa = await interaction.fetchReply()
    let faa = aa.content;
    if(faa == language.channel.wait){
  interaction.editReply(language.channel.errr)
    }
} , 2500)

}
}