const { MessageEmbed } = require('discord.js');

module.exports = async (client, guild) => {
    const leavee = new MessageEmbed()
  .setAuthor(`❌ ${client.user.tag} out from server!`)
  .setDescription(`**⇏ | Server name: \`${guild.name}\`\n⇏ | Server id: \`${guild.id}\`\n⇏ | Member count: \`${guild.memberCount}\`\n⇏ | Server counter : \`${client.guilds.cache.size}\`**`)
  .setColor("RED")
  client.channels.cache.get("774007312474046475").send({ embeds : [leavee]})
}