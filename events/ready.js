require('dotenv').config()
const { connect } = require('mongoose');
const { Client } = require('discord.js');
const ShareModel = require('../models/share');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const { Database } = require("quickmongo")
const prime = new Database(process.env.prime_db)

/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    client.user.setActivity(`/help | Shards ${parseInt(client.shard.ids) || 1}/${client.shard.count}`, { type: "PLAYING" });
    console.log('Ready');
    connect(process.env.share_db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        heartbeatFrequencyMS : 1200000
    }).then(() => console.log(`Mongo Online`)).catch(() => console.log('Error Conntecting'));

    client.guilds.cache.map(async (guild) => {
        let data = await ShareModel.findOne({ guildID: guild.id });
        if (!data) {
            data = new ShareModel({
                guildID: guild.id,
                guildName: guild.name,
            });
            await data.save().catch(console.error);
        }
    })


    /* Prime Check */
    let primeR = "868191195183075368"
    const subscription = await prime.startsWith("primetime_", { sort: ".data" });
    const guildd = await prime.startsWith("primeuserguilds_", { sort: ".data" });
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

    prime.delete(`primetime_${user.id}`)
    prime.delete(`primestatus_${user.id}`)
    prime.delete(`primeuserguilds_${user.id}`)
    prime.pull(`primeguilds_${client.user.id}` , gg)
    let PU = await client.guilds.cache.get("757381619114967060").members.cache.find(m => m.id == user.id)
    if(!PU)return;
    if(PU){
        PU.roles.remove(primeR)
    }

    }
    
    }


    /* Render Commands */

/*

    const commands = [
        {
            name: 'ping',
            description: `Show ${client.user.username} Ping.`,
        }, {
            name: 'bot',
            description: `Show ${client.user.username} Statics`
        },
        {
            name: 'setlang',
            description: `change the server language`,
            options: [{
                name: 'language',
                type: 3,
                description: 'choose server language',
                required: true,
                choices: [{
                    name: `Arabic`,
                    value: "ar",
                },
                {
                    name: `English`,
                    value: "en",
                }
                ]
            }]
        },
        {
            name: 'channel',
            description: 'select sharing channel',
            options: [{
                name: 'channel',
                type: 7,
                description: 'mention channel / channel name / channel id',
                required: true,
            }],
        },
        {
            name: 'desc',
            description: 'select server description',
            options: [{
                name: 'description',
                type: 3,
                description: 'type your description',
                required: true,
            }],
        },
        {
            name: 'share',
            description: `share your server`
        },

        {
            name: 'salary',
            description: `collect your salary`,
            options: [{
                name: 'salary',
                type: 3,
                description: 'choose your salary',
                required: true,
                choices: [{
                    name: "daily",
                    value: "daily"
                }, {
                    name: "weekly",
                    value: "weekly"
                },
                {
                    name: "vote",
                    value: "vote"
                }],
            }],

        },
        {
            name: 'coins',
            description: 'show your / someone coins - transfer coins for someone',
            options: [{
                name: 'user',
                type: 6,
                description: 'the user',
                required: false,
            }, {
                name: 'amount',
                type: 10,
                description: 'the amount',
                required: false,
            }],
        },
        {
            name: "leaderboard",
            description: `show the leaderboard - (top 10 coins)`
        },
        {
            name: "prime",
            description: "buy / transfer / manage your prime subscription",
            options: [{
                name: "option",
                description: "your prime subscription options",
                type: 3,
                required: true,

                choices: [{

                    name: "buy",
                    description: "buy prime for your server",
                    value: "buy",
                }, {
                    name: "prev",
                    description: "view some info about your prime subscription",
                    value: "prev"
                }, {
                    name: "transfer",
                    description: "change prime guild",
                    value: "transfer",
                }],
            }, {
                name: "guild_id",
                description: "the Guild ID",
                type: 3,
                required: false,
            }]
        },
        {
            name: "banner",
            description: "set the server banner",
            options: [{
                name: "link",
                description: "your server banner link",
                type: 3,
                required: true
            }]
        },
        {
            name: "preview",
            description: "preview your advertising",
            options: [{
                name: "prev",
                description: "view your advertising (channel / desc / banner (for prime))",
                type: 3,
                required: false,
                choices: [{
                    name: "channel",
                    description: "view sharing channel",
                    value: "channel"
                }, {
                    name: "desc",
                    description: "view sharing description",
                    value: "desc"
                }, {
                    name: "banner",
                    description: "view sharing banner (only for prime)",
                    value: "banner"
                }]
            }]
        },
        {
            name: "help",
            description: "i can help you , show you my commands and info about it",
            options: [{
                name: "command",
                description: "help in one of bot commands",
                type: 3,
                required: false,
            }]
        },

        {
            name : "slowmode",
            description : "add slowmode to a channel",
                options : [{
                name : "time",
                description : "the slowmode time you want",
                type : 3,
                required : true
            }
        ]
        },
        {
            name : "resetdata",
            description : "reset data for a server",
            options : [{
            name : "guild",
            description : "the guild id",
            type : 3,
            required : true
            }]
        }, {
           name : "blacklist",
           description : "give someone blacklist",
           options : [{
               name : "type",
               description : "the blacklist type",
               type : 3,
               required : true,
               choices : [{
                   name : "user",
                   value : "user"
               }, {
                   name : "server",
                   value : "server"
               }]
           },{
            name : "id",
            description : "user / server id",
            type : 3,
            required : true
           },{
               name : "action",
               description : "your action",
               type : 3,
               required : true,
               choices : [{
                   name : "add",
                   value : "add"
               }, {
                   name : "remove",
                   value : "remove"
               }, {
                   name : "check",
                   value : "check"
               }]
           }]
        },{
            name : "vip",
            description : "prime managment",
            options : [{
            name : "user",
            description : "user id",
            type : 3,
            required : true,
        },{
        name : "action",
        description : "the action you wan't",
        type : 3,
        required : true,
        choices : [{
            name : "add",
            value : "add"
        }, {
            name : "remove",
            value : "remove"
        }, {
            name : "check",
            value : "check"
        }] 
        },
         {
        name : "guild",
        description : "the server id",
        type : 3,
        required : false
        }, {
            name : "time",
            description : "the time",
            type : 3,
            required : false
            }]
    }, {
            name : "manage_coins",
            description : "coins managment",
            options : [{
            name : "user",
            description : "user id",
            type : 3,
            required : true,
        }, {
        name : "action",
        description : "the action you wan't",
        type : 3,
        required : true,
        choices : [{
            name : "add",
            value : "add"
        }, {
            name : "remove",
            value : "remove"
        }] 
        },{
        name : "amount",
        description : "manage amount",
        type : 3,
        required : true
        }]
        }
    ]

    const rest = new REST({ version: '9' }).setToken(process.env.token);

    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );

        } catch (error) {
            console.error(error);
        }
    })();
    */

}
