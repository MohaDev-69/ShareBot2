const { MessageEmbed } = require("discord.js")
const { Database } = require("quickmongo")
const { Discord } = require("../../emojis.js")
const prime = new Database(process.env.prime_db)
const info = new Database(process.env.info_db)
const banner = new Database(process.env.banner_db)
const emoji = require("../../emojis.js")
const ShareModel = require('../../models/share');
module.exports = {
	name: 'preview',
	description: `preview your advertising`,
	cooldown : 8,
	    UserPermission : ["MANAGE_GUILD"],
	async execute(client , interaction , language) {
        let op = interaction.options.getString("prev")
    	let invite = await interaction.channel.createInvite({ maxAge : 0 , maxUses : 0})
		let data = await ShareModel.findOne({ guildID: interaction.guild.id });
		let sTT = await info.get(`sharetimes_${interaction.guild.id}`)
		if(sTT == null){sTT = 0}
		let bannerr = await banner.get(`banner_${interaction.guild.id}`)
		if(bannerr == null){bannerr = "https://miro.medium.com/max/2400/1*-H6prGWbj7F9kmiimYhCMA.png"}
		let g = await prime.get(`primeguilds_${client.user.id}`)

		if(op == "channel"){
			let c = data.channel
			if(c == "Not Selected"){
				c = language.preview.notSelected
			}
			if(c !== "Not Selected"){
				c = `<#${c}>`
			}
			await interaction.editReply(c)
		}else
		if(op == "desc"){

			let d = data.desc
			if(d == "Not Selected"){
				d = language.preview.notSelected
			}
			if(d !== "Not Selected"){
				d = `${d}`
			}
			await interaction.editReply(d)

		}else

		if(op == "banner"){
			if(!g.includes(interaction.guild.id)){
				await interaction.editReply(language.banner.NoSub)
			}else
			if(bannerr !== null){
				bannerr = bannerr
			} if(g.includes(interaction.guild.id)){
			await interaction.editReply(bannerr)
			}
		}else

        if(!g.includes(interaction.guild.id)){
			await interaction.editReply(`${emoji.Discord}**Guild: ${interaction.guild.name}\n**${emoji.Discovery}**Desciption: ${data.desc || "Not Selected"}**\n${invite}`)
			await interaction.followUp({content : `${language.preview.st} \`${sTT}\` **` , ephemeral: true})
		}else
		if(g.includes(interaction.guild.id)){
			let embed = new MessageEmbed().setDescription(`${emoji.Discord}**Guild: ${interaction.guild.name}\n**${emoji.Discovery}**Desciption: ${data.desc || "Not Selected"}**`).setImage(bannerr)
			await interaction.editReply({content : `${invite}` , embeds : [embed]})
			await interaction.followUp({content : `${language.preview.st} \`${sTT}\` **` , ephemeral: true})
		}
	}
}