const { MessageActionRow, MessageSelectMenu , Permissions} = require('discord.js');
const { Database } = require("quickmongo")
const banner = new Database(process.env.banner_db)
const prime = new Database(process.env.prime_db)
module.exports = {
	name: 'banner',
	description: `Change Server Banner`,
	cooldown : 10,
	    UserPermission : ["MANAGE_GUILD"],
	async execute(client , interaction , language) {

        let g = await prime.get(`primeguilds_${client.user.id}`)
        if(!g.includes(interaction.guild.id)){
            await interaction.editReply(language.banner.NoSub)
        }else
        if(g.includes(interaction.guild.id)){
        let Banner = interaction.options.getString("link")

        let link = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');

        if (!!!link.test(Banner , 'i')){
            await interaction.editReply(language.banner.invalid)
            }else

            if (!!link.test(Banner , 'i')){

            await banner.set(`banner_${interaction.guild.id}` , Banner)
            await interaction.editReply(language.banner.success)
            }
        }
     }
}