const { MessageActionRow, MessageSelectMenu , Permissions} = require('discord.js');
const { Database } = require("quickmongo")
const langu = new Database(process.env.lang_db)

module.exports = {
	name: 'setlang',
	description: `Change Server Language`,
	cooldown : 5,
	    UserPermission : ["MANAGE_GUILD"],
	async execute(client , interaction , language) {
let langg = interaction.options.getString('language')

	if(langg === "ar"){
	langu.set(`lang_${interaction.guild.id}` , "ar")
	interaction.editReply({ content : '>>> ** :flag_iq: - تم تغيير اللغة الى العربية **' , components : []})
	}

	if(langg === "en"){
	 langu.set(`lang_${interaction.guild.id}` , "en")
	interaction.editReply({ content : '>>> ** :flag_us: - the language has been successfully changed to english**' , components : []})
}
		if(langg === "fr"){
	 langu.set(`lang_${interaction.guild.id}` , "fr")
	interaction.editReply({ content : 'the language has been changed to french' , components : []})
}

		if(langg === "de"){
	 langu.set(`lang_${interaction.guild.id}` , "de")
	interaction.editReply({ content : 'the language has been changed to german' , components : []})
}

		if(langg === "tr"){
	 langu.set(`lang_${interaction.guild.id}` , "tr")
	interaction.editReply({ content : 'the language has been changed to turkish' , components : []})
}

}
}