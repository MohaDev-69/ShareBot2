const ms = require("ms")
const { Database } = require("quickmongo")
const prime = new Database(process.env.prime_db)

module.exports = {
	name: 'slowmode',
	description: `add slowmode to a channel`,
	  cooldown: 3,
	  UserPermission : ["MANAGE_CHANNELS"],
	async execute(client , interaction , language) {

        let time = interaction.options.getString("time")
        let channel = interaction.options.getString("channel")

        let g = await prime.get(`primeguilds_${client.user.id}`)
        if(!g.includes(interaction.guild.id)){
            return interaction.editReply(language.banner.NoSub)
        }

        if(g.includes(interaction.guild.id)){
            if(!channel){channel = interaction.channel;}
            let convert = ms(time);
            let toSecond = Math.floor(convert / 1000); 
            if(toSecond < 1)return interaction.editReply(language.slowmode.mTime)
            if(toSecond > 21600)return interaction.editReply(language.slowmode.maxTime)
            await channel.setRateLimitPerUser(toSecond)
            await interaction.editReply(language.slowmode.success)
        }

    }
}