const { MessageEmbed , MessageButton , MessageActionRow , Permissions} = require("discord.js")
const ms = require("humanize-duration")
const { Database } = require("quickmongo")
const langu = new Database(process.env.lang_db)
module.exports = {
	name: 'bot',
	description: `Show ShareBot Info + Statics.`,
	  cooldown: 3,
	  UserPermission : ["SEND_MESSAGES"],
	async execute(client , interaction , language) {

		let lang = await langu.get(`lang_${interaction.guild.id}`)
		if(lang == null){
			lang = "en"
		}

		const inv = new MessageButton()
	.setLabel(`${language.botinfo.inviteBTN}`)
	.setStyle('LINK')
	.setURL(client.generateInvite({ scopes: ['bot' , 'applications.commands'], permissions: [Permissions.FLAGS.ADMINISTRATOR] }))


		const sup = new MessageButton()
	.setLabel(`${language.botinfo.supportBTN}`)
	.setStyle('LINK')
	.setURL(`https://discord.gg/sharebot`)

const row = new MessageActionRow()
			.addComponents(inv)
			.addComponents(sup)

		let embed = new MessageEmbed()
		.setTitle(`${client.user.username}${language.botinfo.title}`)
		.addField(`${language.botinfo.servers}` , `\`${client.guilds.cache.size.toString()}\`` , true)
		.addField(`${language.botinfo.users}` , `\`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0).toString()}\`` , true)
		.addField(`${language.botinfo.channels}` , `\`${client.channels.cache.size.toString()}\`` , true)
		.addField(`${language.botinfo.uptime}` , `\`${ms(client.uptime , { language : lang , round : true})}\`` , true)
		.addField(`${language.botinfo.createdAt}` , `\`${client.user.createdAt.toLocaleString()}\`` , true)
		.addField(`${language.botinfo.ram}` , `\`${(process.memoryUsage().rss / 1048576).toFixed()} MB\``, true)
		.setThumbnail(client.user.displayAvatarURL({dynamic : true , format : "png"}))
		.setAuthor(interaction.user.username , interaction.user.displayAvatarURL({dynamic : true , format : "png"}) , client.generateInvite({ scopes: ['bot' , 'applications.commands'], permissions: [Permissions.FLAGS.ADMINISTRATOR]}))
    await interaction.editReply({embeds : [embed] , components : [row]})
	}
}