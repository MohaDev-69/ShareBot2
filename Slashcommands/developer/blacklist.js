let devs = ['772546533203247115', '667753369858736148', '852704436391903252' , '702485137862033419' , '655426465852293131'];
const { Database } = require("quickmongo")
const blacklist = new Database(process.env.blacklist_db)
const emoji = require("../../emojis.js")
module.exports = {
	name: 'blacklist',
	description: ``,
	  cooldown: 3,
	  UserPermission : ["SEND_MESSAGES"],
	async execute(client , interaction , language) {

        if(!devs.includes(interaction.user.id))return interaction.editReply(language.resetdata.devs)

        let type = interaction.options.getString("type")
        let id = interaction.options.getString("id")
        let ac = interaction.options.getString("action")

if(type == "user"){
    let u = await client.users.fetch(id)
    if(!u)return interaction.editReply(language.blacklist.invalidU)
    if(u){
        let d = await blacklist.get(`usersBL_${client.user.id}`)
        if(d == null || !d){
            d = null
        }
        if(ac == "add"){
        if(d.includes(u.id))return interaction.editReply(language.blacklist.alreadyBL)
        blacklist.push(`usersBL_${client.user.id}` , u.id)
        if(!d.includes(u.id))return interaction.editReply(language.blacklist.success + u.username + language.blacklist.success2)
        }
        if(ac == "remove"){
            if(!d.includes(u.id))return interaction.editReply(language.blacklist.notBL)
            blacklist.pull(`usersBL_${client.user.id}` , u.id)
            if(d.includes(u.id))return interaction.editReply(language.blacklist.success + u.username + language.blacklist.usuccess2)

        }

        if(ac == "check"){
            if(!d.includes(u.id))return interaction.editReply(`>>> ** ${emoji.Mail}${u.username} ${language.blacklist.check} \`${language.blacklist.f}\`**`)
            if(d.includes(u.id))return interaction.editReply(`>>> ** ${emoji.Mail}${u.username} ${language.blacklist.check} \`${language.blacklist.t}\`**`)

        }
    }
}
 
if(type == "server"){
    let s = await client.guilds.cache.get(id)
    if(!s)return interaction.editReply(language.blacklist.invalidG)
    if(s){
        let d = await blacklist.get(`serversBL_${client.user.id}`)
        if(d == null || !d){
            d = null
        }
        if(ac == "add"){
        if(d.includes(s.id))return interaction.editReply(language.blacklist.alreadyBL2)
        blacklist.push(`serversBL_${client.user.id}` , s.id)
        if(!d.includes(s.id))return interaction.editReply(language.blacklist.success + s.name + language.blacklist.success2)
        }
        if(ac == "remove"){
            if(!d.includes(s.id))return interaction.editReply(language.blacklist.notBL2)
            blacklist.pull(`serversBL_${client.user.id}` , s.id)
            if(d.includes(s.id))return interaction.editReply(language.blacklist.success + s.name + language.blacklist.usuccess2)

        }

        if(ac == "check"){
            if(!d.includes(s.id))return interaction.editReply(`>>> ** ${emoji.Mail}${s.name} ${language.blacklist.check} \`${language.blacklist.f}\`**`)
            if(d.includes(s.id))return interaction.editReply(`>>> ** ${emoji.Mail}${s.name} ${language.blacklist.check} \`${language.blacklist.t}\`**`)

        }
    }
}

}
}

