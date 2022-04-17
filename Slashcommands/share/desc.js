const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Database } = require("quickmongo")
const db = new Database(process.env.lang_db)
let ShareModel = require('../../models/share');
module.exports = {
    name: 'desc',
    description: `set the description`,
    UserPermission : ["MANAGE_MESSAGES"],
    async execute(client , interaction , language) {



//-------- Starting Filters  -------------


 let links = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');


//-----

 let links2 = [
 'https',
'http',
'com',
'discord.gg',
'.gg',
'.xyz',
'.club',
]

//-----

let mentions = [
'@everyone',
'@here',
'@',
'@&'
]

//--------

let bw = [

'مطلوب',
'روبلوكس',
'كس',
'طيز',
'بيع',
'للبيع',
'احا',
'طلب',
'شوب',
'متناك',
'عرص',
'خول',
'منيوك',
'منيك',
'منيوق',
"نيك",
"تيزك",

//-------
"كس" , "ك س" , "كث" , "ك ث" , "كص" , " ك ص" , "قسمك" , "صمق" , "صمك" , "كسمك" , "ك س م ك" , "متناك" , "متناق" , "منيوك" , "لبوه" , "وسخ" , "وصخ" , "وسخه" ,  "وصخه" ,  "نيق" , "منيكه" , "منيقه" , "شرموط" , "شرموت" , "شرمت" , "شرمط" , "شرمطه" , "شرمته" , "منكوح" , "نكح" , "طيز" , "مؤخره" , "مكواه" , "سكس" , "سيكس" , "سيكسي" , "بزاز" ,"بظاظ" , "بذاذ"
]



let Desc = interaction.options.getString('description')


if(Desc.length < 10){
   await interaction.editReply(language.desc.m_length)
}

else

if(Desc.length > 255){
   await interaction.editReply(language.desc.max_length)
}


else 


if (mentions.some((mentions) =>  new RegExp(mentions, "i").test(Desc))){
await interaction.editReply(language.desc.blocked_mention)
}else

if (!!links.test(Desc , 'i')){
await interaction.editReply(language.desc.blocked_link)
}

else
if (links2.some((links2) =>  new RegExp(links2, "i").test(Desc))){
await interaction.editReply(language.desc.blocked_link)
}
else
if (bw.some((bw) =>  new RegExp(bw, "i").test(Desc))){
const match = bw.find((w) => RegExp(w, 'i').test(Desc))

if (match) {

      await interaction.editReply(`${language.desc.blocked_word} \`${match}\` ${language.desc.blocked_word2}`)
   }
}

else {
        let data = await ShareModel.findOne({ guildID: interaction.guild.id });

                ShareModel.findOne({
            guildID: interaction.guildId
        }, async (err, doc) => {
            if (err) throw err;
            if (!doc) {
                await new ShareModel({
                    guildID: interaction.guild.id,
                    guildName: interaction.guild.name,
                    desc: Desc,
                    limitDeleting: 3
                }).save();
                await interaction.editReply(language.desc.success)
            } else {
                doc.desc = Desc
                doc.save().catch(err => console.log(err));
                await interaction.editReply(language.desc.success)
            }
        });
}
}
}