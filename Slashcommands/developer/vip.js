let devs = ['655426465852293131', '667753369858736148'];
const { Database } = require("quickmongo")
const prime = new Database(process.env.prime_db)
const langu = new Database(process.env.lang_db)
const time = require("../../time.js")
const ms = require("ms")
const emoji = require("../../emojis.js")
const { MessageEmbed } = require("discord.js")
const humanizeDuration = require("humanize-duration")

module.exports = {
	name: 'vip',
	description: ``,
	  cooldown: 3,
	  UserPermission : ["SEND_MESSAGES"],
	async execute(client , interaction , language) {
if(!devs.includes(interaction.user.id))return interaction.editReply(language.resetdata.devs)
        let lang = await langu.get(`lang_${interaction.guild.id}`)
if(lang == null){
    lang = "en"
}

        let primeR = "868191195183075368"
        let ac = interaction.options.getString("action")
        let iddd = interaction.options.getString("user")
        let guildd = interaction.options.getString("guild")
        let timee = interaction.options.getString("time")
        let idd = await client.users.fetch(iddd)
        if(guildd !== null){
        let guild = client.guilds.cache.get(guildd)
        if(ac == "add" && !guild)return interaction.editReply(language.vip.unknown_g)
        if(ac == "add" && guild){
            if(!timee){
            timee = Date.now() + time.month
            }else
                timee = Date.now() + parseInt(ms(timee))
            prime.set(`primeuserguilds_${idd.id}` , guild.id)
            prime.set(`primetime_${idd.id}` , `${parseInt(timee)}`)
            prime.set(`primestatus_${idd.id}` , true)
            let ppp = await prime.get(`primeguilds_${client.user.id}`)
            if(!ppp.includes(guild.id)){
            await prime.push(`primeguilds_${client.user.id}` , guild.id)
            let PU = await client.guilds.cache.get("757381619114967060").members.cache.find(m => m.id == idd.id)
                if(!PU)return;
                if(PU){
                    PU.roles.add(primeR)
                }
                await interaction.editReply(language.vip.success)
            }else
            if(ppp.includes(guild.id))return interaction.editReply(language.vip.Server_H_P)
        }
    }

    if(ac == "remove"){
        prime.delete(`primetime_${idd.id}`)
        prime.delete(`primestatus_${idd.id}`)
        let ppp = await prime.get(`primeguilds_${client.user.id}`)
        let pp = await prime.get(`primeuserguilds_${idd.id}`)
        if(ppp.includes(pp)){
        await prime.pull(`primeguilds_${client.user.id}` , pp.id)
        let PU = await client.guilds.cache.get("757381619114967060").members.cache.find(m => m.id == idd.id)
            if(!PU)return;
            if(PU){
                PU.roles.remove(primeR)
            }
            await interaction.editReply(language.vip.success2)
            if(idd){
                (await idd).send(`Hello ${(await idd).username}, your prime has been ended , you can re-new or re-subscribe later  \n اهلاً ${(await idd).username} ، البرايم الخاص بك قد انتهى بالفعل ، يمكنك التجديد او اعادة الاشتراك في أي وقت.`)
                }
        }else
        if(!ppp.includes(pp))return interaction.editReply(language.vip.Server_H_P2)
    }

    if(ac == "check"){

        let dd = await prime.get(`primestatus_${idd.id}`)
        if(dd == null){
            let embed = new MessageEmbed()
            .addField(`${language.vip.user}` , `<@${idd.id}> - ${idd.id} - ${idd.tag}`, true)
            .addField(`${language.vip.status}` , `${language.vip.paf}`, true)
            .addField(`${language.vip.guild}` , `${language.vip.paf}`, true)
            .addField(`${language.vip.end}` , `${language.vip.paf}` , true)
            .setColor("#ff0000")
            return interaction.editReply({embeds : [embed]})
        }
        if(dd == true){
            let pt = await prime.get(`primetime_${idd.id}`)
            let pgu = await prime.get(`primeuserguilds_${idd.id}`)
            let GN = client.guilds.cache.get(pgu)
            let embed = new MessageEmbed()
            .addField(`${language.vip.user}` , `<@${idd.id}> - ${idd.id} - ${idd.tag}`, true)
            .addField(`${language.vip.status}` , `${language.vip.pa}`, true)
            .addField(`${language.vip.guild}` , `${GN} - ${pgu}`, true)
            .addField(`${language.vip.end}` , `${humanizeDuration(pt , { language : lang , round : true })}`, true)
            .setColor("RANDOM")
             return interaction.editReply({embeds : [embed]})

        }

    }

}

}