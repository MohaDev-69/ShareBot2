const { MessageEmbed } = require("discord.js")
const { Database } = require("quickmongo")
const coins = new Database(process.env.coins_db)
const emoji = require("../../emojis.js")
module.exports = {
	name: 'leaderboard',
	description: `show the leaderboard - (top 10 coins)`,
    cooldown : 35,
    UserPermission : ["SEND_MESSAGES"],
	async execute(client , interaction , language) {
        const money = await coins.startsWith("coins_", { sort: ".data" });
        money.length = 10;
        let finalLb = "";
        for (var i in money) {
          let user = `${(await client.users.fetch(money[i].ID.split('_')[1])).tag ? (await client.users.fetch(money[i].ID.split('_')[1])).tag : "Unknown#0000"}`
          finalLb += `${money.indexOf(money[i])+1} - **${user}**: ${emoji.Coin2} \`$${money[i].data}\`\n`;
        }
        let embed = new MessageEmbed()

        .setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
        .setColor("RANDOM")
        .addField(`${language.leaderboard.title}`, finalLb)

        await interaction.editReply({embeds : [embed]})
    }
}