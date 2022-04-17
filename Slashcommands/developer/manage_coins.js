let devs = ['655426465852293131', '667753369858736148'];
const { parse } = require("dotenv");
const { Database } = require("quickmongo")
const coins = new Database(process.env.coins_db)

module.exports = {
	name: 'manage_coins',
	description: ``,
	  cooldown: 3,
	  UserPermission : ["SEND_MESSAGES"],
	async execute(client , interaction , language) {
        if(!devs.includes(interaction.user.id))return interaction.editReply(language.resetdata.devs)
        
        let action = interaction.options.getString("action")
        let idd = interaction.options.getString("user")
        let amount = interaction.options.getString("amount")

        let u = await client.users.fetch(idd)
        if(!u)return interaction.editReply(language.manage_coins.IuID)

        if(isNaN(amount))return interaction.editReply(language.manage_coins.NumOnly)

        if(u && !isNaN(amount) && action == "add"){
            coins.add(`coins_${u.id}` , parseInt(amount))
            await interaction.editReply(`>>> ** \`${amount}\` ${language.manage_coins.successA} <@${u.id}>`)
        }

        if(u && !isNaN(amount) && action == "remove"){
            coins.subtract(`coins_${u.id}` , parseInt(amount))
            await interaction.editReply(`>>> ** \`${amount}\` ${language.manage_coins.successR} <@${u.id}>`)
        }

    }
}