const { MessageActionRow, MessageButton , MessageEmbed} = require('discord.js');
const { Database } = require("quickmongo");
const time = require("../../time.js")
const humanizeDuration = require("humanize-duration");
const emoji = require("../../emojis.js");
const primee = new Database(process.env.prime_db)
const coins = new Database(process.env.coins_db)
const langu = new Database(process.env.lang_db)
module.exports = {
    name: "prime",
    description: `prime control`,
    cooldown: 10,
    UserPermission: ["SEND_MESSAGES"],
    async execute(client, interaction, language) {
        let primeR = "868191195183075368"
        const subscription = await primee.startsWith("primetime_", { sort: ".data" });
        const guildd = await primee.startsWith("primeuserguilds_", { sort: ".data" });
        for (var i in subscription) {
         let time = subscription[i].data;
         let gg = guildd[i].data;
        if(time - Date.now() < "1000"){
        let user = await client.users.fetch(subscription[i].ID.split('_')[1])
        if(!user)return;
        if(user){
        (await user).send(`Hello ${(await user).username}, your prime has been ended , you can re-new or re-subscribe later  \n اهلاً ${(await user).username} ، البرايم الخاص بك قد انتهى بالفعل ، يمكنك التجديد او اعادة الاشتراك في أي وقت.`)
        }
        let g = client.channels.cache.find(c => c.id === "885500974532280400") 
        await g.send(`**<@${user.id}> , prime has neded now !** `)

        let PU = await client.guilds.cache.get("757381619114967060").members.cache.find(m => m.id == interaction.user.id)
        if(!PU)return;
        if(PU){
            PU.roles.remove(primeR)
        }
        primee.delete(`primetime_${user.id}`)
        primee.delete(`primestatus_${user.id}`)
        primee.delete(`primeuserguilds_${user.id}`)
        primee.pull(`primeguilds_${client.user.id}` , gg)
    }
        
        }

let lang = await langu.get(`lang_${interaction.guild.id}`)
if(lang == null){
    lang = "en"
}


let omP = new MessageButton()
.setCustomId('1mP')
.setLabel('1 Month (300 coin)')
.setStyle('PRIMARY');

let tmP = new MessageButton()
.setCustomId('2mP')
.setLabel('2 Month(s) (600 coin)')
.setStyle('SECONDARY');

let thmP = new MessageButton()
.setCustomId('3mP')
.setLabel('3 Month(s) (900 coin)')
.setStyle('DANGER');

const row = new MessageActionRow().addComponents(omP).addComponents(tmP).addComponents(thmP);

        let Option = interaction.options.getString('option')
        let gID = interaction.options.getString('guild_id')

        let primeS = await primee.get(`primestatus_${interaction.user.id}`)
        let primeG = await primee.get(`primeguilds_${client.user.id}`)


        if (Option == "buy" && !gID) {
            await interaction.editReply(language.prime.gID)
        }else
        if (Option == "buy" && gID) {
            if(primeS == true){
            await interaction.editReply(language.prime.alreadyH)
            }else if(primeS !== true){
            let guild = client.guilds.cache.get(gID)
            if(!guild){
                await interaction.editReply(language.prime.unknown_g)
            }else if(primeG !== null && primeG.includes(gID)){
                await interaction.editReply(language.prime.Server_H_P)
            }else
            await interaction.editReply({content : language.prime.buy_msg , components : [row]})
            const filter = u => u.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 120000 });

            collector.on("collect" , async b => {
            if(b.customId === "1mP"){
                let Ucoins = await coins.get(`coins_${interaction.user.id}`)
                if(Ucoins < 300){
                    await interaction.editReply(language.prime.enough)
                }else if(Ucoins > 300){
                await coins.subtract(`coins_${interaction.user.id}` , 300)
                 primee.set(`primeuserguilds_${interaction.user.id}` , gID)
                 primee.set(`primetime_${interaction.user.id}` , `${parseInt(Date.now() + time.month)}`)
                 primee.set(`primestatus_${interaction.user.id}` , true)
                 await primee.push(`primeguilds_${client.user.id}` , gID)
                 let PU = await client.guilds.cache.get("757381619114967060").members.cache.find(m => m.id == interaction.user.id)
                if(!PU)return;
                if(PU){
                    PU.roles.add(primeR)
                }
                await interaction.editReply({ content : `${language.prime.Success} \`${humanizeDuration(time.month , { units : ["mo"] , language : lang , round : true})}\` **` , components : []})
                let g = client.channels.cache.find(c => c.id === "885500960997253150") 
                await g.send(`**<@${interaction.user.id}> , prime has buy a new subscription for  1 month** `)
            }}else
            if(b.customId === "2mP"){
                let Ucoins = await coins.get(`coins_${interaction.user.id}`)
                if(Ucoins < 600){
                    await interaction.editReply(language.prime.enough)
                }else if(Ucoins > 600){
                await coins.subtract(`coins_${interaction.user.id}` , 600)
                 primee.set(`primeuserguilds_${interaction.user.id}` , gID)
                 primee.set(`primetime_${interaction.user.id}` , `${parseInt(Date.now() + time.two_months)}`)
                 primee.set(`primestatus_${interaction.user.id}` , true)
                 await primee.push(`primeguilds_${client.user.id}` , gID)
                 let PU = await client.guilds.cache.get("757381619114967060").members.cache.find(m => m.id == interaction.user.id)
                 if(!PU)return;
                 if(PU){
                     PU.roles.add(primeR)
                 }
                 await interaction.editReply({ content : `${language.prime.Success} \`${humanizeDuration(time.two_months , { units : ["mo"] , language : lang , round : true})}\` **` , components : []})
                 let g = client.channels.cache.find(c => c.id === "885500960997253150") 
                 await g.send(`**<@${interaction.user.id}> , prime has buy a new subscription for  2 month's** `) 
                }}else
            if(b.customId === "3mP"){
                let Ucoins = await coins.get(`coins_${interaction.user.id}`)
                if(Ucoins < 900){
                    await interaction.editReply(language.prime.enough)
                }else if(Ucoins > 900){
                await coins.subtract(`coins_${interaction.user.id}` , 900)
                 primee.set(`primeuserguilds_${interaction.user.id}` , gID)
                 primee.set(`primetime_${interaction.user.id}` , `${parseInt(Date.now() + time.three_months)}`)
                 primee.set(`primestatus_${interaction.user.id}` , true)
                 await primee.push(`primeguilds_${client.user.id}` , gID)
                await interaction.editReply({ content : `${language.prime.Success} \`${humanizeDuration(time.three_months , { units : ["mo"] , language : lang , round : true})}\` **` , components : []})
                let PU = await client.guilds.cache.get("757381619114967060").members.cache.find(m => m.id == interaction.user.id)
                if(!PU)return;
                if(PU){
                    PU.roles.add(primeR)
                }
                let g = client.channels.cache.find(c => c.id === "885500960997253150") 
                await g.send(`**<@${interaction.user.id}> , prime has buy a new subscription for  3 month's ** `)
            }}
            })
        }}else

        if (Option == "transfer" && !gID) {
            if(primeS === null || primeS === false){
                await interaction.editReply(language.prime.NoSub)
                }else
            await interaction.editReply(language.prime.gID)
        }else
    if(Option == "transfer" && gID){
        if(primeS === null || primeS === false){
            await interaction.editReply(language.prime.NoSub)
            }else{
        let guilD = client.guilds.cache.get(gID)
        if(!guilD){
        await interaction.editReply(language.prime.unknown_g)
        let primeG = await primee.get(`primeuserguilds_${interaction.user.id}`)
        }else
        if(primeG == gID){
            await interaction.editReply(language.prime.ThisG)
        }
        else
        if(guilD){
            await primee.set(`primeuserguilds_${interaction.user.id}` , gID)
            await primee.pull(`primeguilds_${client.user.id}`, primeG)
         await primee.push(`primeguilds_${client.user.id}` , guilD)
         await interaction.editReply(`${language.prime.TransferS} \`${guilD.id} - ${guilD.name}\` **`)
        }}
    }else

        if (Option == "prev" && !gID || Option == "prev" && gID) {
            if(primeS === null || primeS === false){
            await interaction.editReply(language.prime.NoSub)
            }
            else
            if(primeS !== null){
              let G = await primee.get(`primeuserguilds_${interaction.user.id}`)
              let end = await primee.get(`primetime_${interaction.user.id}`)
              let endT = (end - Date.now())
              if(G == null){
                  await interaction.editReply(language.prime.NoSub)
              }else
              if(G !== null){
                let GN = client.guilds.cache.get(G)
                if(end > Date.now()){
                await interaction.editReply(` >>> ** ${language.prime.Guild} \`${G} - ${GN || "Unknown"}\` \n ${language.prime.End} \`${humanizeDuration(endT , { language : lang , round : true })}\` **`)
            }else
            if(end < Date.now()){  
                await interaction.editReply(language.prime.NoSub)
            }
        }
            }
        }


        setTimeout(async() => {
            let text = await interaction.fetchReply()
            if(!text)return;
            if(text.content == language.prime.buy_msg){
                await interaction.editReply({ content : language.prime.timeout , components : []})
            }
            } , 120000)

    }
}