const { MessageEmbed } = require('discord.js');

module.exports = async (client, guild) => {
    const joinb = new MessageEmbed()
        .setAuthor(`✅ ${client.user.tag}  join new server!`)
        .setDescription(`**⇏ | Server name: \`${guild.name}\`\n⇏ | Server id: \`${guild.id}\`\n⇏ | Member count: \`${guild.memberCount}\`\n⇏ | Servers counter: \`${client.guilds.cache.size}\`**`)
        .setColor("GREEN")
    client.channels.cache.get("774007312474046475").send({ embeds : [joinb]})
}