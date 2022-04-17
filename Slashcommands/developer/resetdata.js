const mongoose = require('mongoose');
let ShareModel = require('../../models/share');
let devs = ['667753369858736148', '655426465852293131', '599351862692544532'];
const { Database } = require("quickmongo")
const banner = new Database(process.env.banner_db)
const info = new Database(process.env.info_db)
module.exports = {
	name: 'resetdata',
	description: ``,
	  cooldown: 3,
	  UserPermission : ["SEND_MESSAGES"],
	async execute(client , interaction , language) {
if(!devs.includes(interaction.user.id))return interaction.editReply(language.resetdata.devs)
        let option = interaction.options.getString("guild")
        let check = client.guilds.cache.get(option)
        if(!check)return interaction.editReply(language.resetdata.IgID)
        if(check){
            await ShareModel.findOneAndDelete({ guildID: check.id });
            await banner.delete(`banner_${check.id}`)
            await info.delete(`sharetimes_${check.id}`)
            return interaction.editReply(language.resetdata.success)
            let g = client.channels.cache.find(c => c.id === "852525925089542164")
            await g.send(`>>> **\`${option}\`, has been reseted by: <@${interaction.user.id}>\nReason: All Data**`);
        }

    }

}