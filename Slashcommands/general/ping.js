/*
const { Database } = require("quickmongo")
const db = new Database(process.env.prefix_db)
*/
module.exports = {
	name: 'ping',
	description: `Show ShareBot Ping.`,
	cooldown : 15,
	UserPermission : ["SEND_MESSAGES"],
	async execute(client , interaction , language) {
		await interaction.editReply(`${language.ping.msg1}`);
		await interaction.editReply(`${language.ping.msg2} **\`${Date.now() - interaction.createdTimestamp}\`**`);
		/*let ping = await db.ping()
		await interaction.editReply(`** :ping_pong: - Pong \n >>> Shard ${interaction.guild.shard.id + 1} : \`${client.ws.ping}\` \n Host : \`${Date.now() - interaction.createdTimestamp}\` \n Database : \`${ping.average}\` \n Cluster ID : \`1\`**`)
	*/
	},
};