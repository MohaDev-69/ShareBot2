const { MessageEmbed , MessageButton , MessageActionRow , Permissions} = require("discord.js")
const { Database } = require("quickmongo")
module.exports = {
	name: 'help',
	description: `i can help you , show you my commands and info about it`,
	  cooldown: 3,
	  UserPermission : ["SEND_MESSAGES"],
	async execute(client , interaction , language) {
let op = interaction.options.getString("command")

            let prefix;
    prefix = "/"
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

      if(!op){
        let embed1 = new MessageEmbed()
        .setThumbnail(interaction.user.avatarURL({ dynamic:true }))
        .setDescription(`${language.help.title} \`${prefix}help command\` Ex. \`${prefix}help channel\`**`)
        .addField(`${language.help.general}`, `\`${prefix}help\`,\`${prefix}ping\`,\`${prefix}bot\`,\`${prefix}preview\``)
        .addField(`${language.help.share}`,`\`${prefix}channel\`,\`${prefix}desc\`,\`${prefix}share\`,\`${prefix}banner\``)
        .addField(`${language.help.settings}`,`\`${prefix}setlang\`,\`${prefix}prefix\``)
        .addField(`${language.help.coins}`, `\`${prefix}coins\`,\`${prefix}salary\`,\`${prefix}leaderboard\``)
        .addField(`${language.help.prime}`, `\`${prefix}slowmode\`,\`${prefix}prime\``)

        await interaction.editReply({embeds : [embed1] , components : [row]})
      }else
        if(op){
          const command = client.commands.get(op.toLowerCase());
      if(!command) {
        let embed2 = new MessageEmbed()
        .setTitle(`**✨ - invaild command! use \`${prefix}help\` for show all my commands!**`)
        .setColor('#36393e')
        return interaction.editReply({ embeds : [embed2]  , components : []});
      }
      let embed3 = new MessageEmbed()
      .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
      .setTitle(`${command.name} information:`)
      .setDescription(`${command.name}'s Description:\n**${command.description ? `${command.description}` : "No Description for that command."}**\n\n${command.name} Usage:\n\`${command.usage ? `\`${command.usage}\`` : "No Usage for that command."}\`\n\n${command.name} Cooldown:\n\`${command.cooldown}s\``)
      //\n\n${command.name} Aliases:\n\`${command.aliases ? `\`${prefix}${command.aliases.join(`, ${prefix}`)}\`` : "No Aliases for that command."}\`
      .setColor('#36393e')
     return interaction.editReply({ embeds : [embed3] , components : []});
      } 

    }
}