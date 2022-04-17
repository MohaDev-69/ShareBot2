const { MessageAttachment , Discord , MessageEmbed , Permissions} = require('discord.js');
let ShareModel = require('../../models/share');
const { CaptchaGenerator } = require("captcha-canvas");
const humanizeDuration = require("humanize-duration");
const { Database } = require("quickmongo")
const langu = new Database(process.env.lang_db)
const prime = new Database(process.env.prime_db)
const banner = new Database(process.env.banner_db)
const info = new Database(process.env.info_db)
const emoji = require("../../emojis.js")
const time = require("../../time.js")
module.exports = {
	name: 'share',
	description: `share your server`,
    cooldown : 60,
    UserPermission : ["MANAGE_MESSAGES"],
    async execute(client , interaction , language) {

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
  

      let data = await ShareModel.findOne({ guildID: interaction.guild.id });
      let c = data.channel;
      let perms = interaction.guild.me.permissionsIn(c).toArray() || interaction.guild.me.permissions.toArray()
      let evP = interaction.guild.roles.everyone.permissionsIn(c).toArray()
      let pg = await prime.get(`primeguilds_${client.user.id}`)
      if(!perms.includes("CREATE_INSTANT_INVITE"))return interaction.editReply(language.share.invP)
      if(!pg.includes(interaction.guild.id) && !evP.includes("VIEW_CHANNEL") && perms.includes("MANAGE_CHANNELS") || !pg.includes(interaction.guild.id) && !evP.includes("VIEW_CHANNEL") && perms.includes("ADMINISTRATOR")){
        client.channels.cache.get(c).permissionOverwrites.edit(interaction.guild.id, {VIEW_CHANNEL : true , SEND_MESSAGES: false })
        return interaction.editReply(language.share.reHC)
      }
        if(!pg.includes(interaction.guild.id) && !evP.includes("VIEW_CHANNEL") && !perms.includes("MANAGE_CHANNELS") || !pg.includes(interaction.guild.id) && !evP.includes("VIEW_CHANNEL") && !perms.includes("ADMINISTRATOR")){
        return interaction.editReply(language.share.reHCF)
      }
      if(!pg.includes(interaction.guild.id) && !perms.includes("SEND_MESSAGES") && perms.includes("MANAGE_CHANNELS") || !pg.includes(interaction.guild.id) && !perms.includes("ADMINISTRATOR") && perms.includes("MANAGE_CHANNELS") ){
        client.channels.cache.get(c).permissionOverwrites.edit(client.user.id, {VIEW_CHANNEL : true , SEND_MESSAGES: true })
        return interaction.editReply(language.share.reHC)
      }
        if(!pg.includes(interaction.guild.id) && !perms.includes("SEND_MESSAGES") && !perms.includes("MANAGE_CHANNELS") || !pg.includes(interaction.guild.id) && !perms.includes("SEND_MESSAGES") && !perms.includes("ADMINISTRATOR")){
        return interaction.editReply(language.share.reHCF)
      }

      if(c.type !== "GUILD_TEXT"){
        if(c.type === "GUILD_VOICE"){
          await interaction.editReply(`${language.channel.err} ${language.ctype.voice} ${language.channel.err2}`)
        }
      
          if(c.type === "GUILD_CATEGORY"){
          await interaction.editReply(`${language.channel.err} ${language.ctype.category} ${language.channel.err2}`)
        }
      }

        let lang = await langu.get(`lang_${interaction.guild.id}`)

        if(lang === null){
            lang = "en"
        }
    
         let cooldwon = data.cooldown;
        let times = (cooldwon - Date.now());
        if (cooldwon > Date.now()){	  
        await interaction.editReply(`${language.share.Cooldown} \`${humanizeDuration(times , {round : true , language : lang })}\` **`)
        } else 

          if (mentions.some((mentions) =>  new RegExp(mentions, "i").test(interaction.guild.name))){
            await interaction.editReply(language.share.blockedGN)
          }else
            
            if (!!links.test(interaction.guild.name , 'i')){
              await interaction.editReply(language.share.blockedGN)
            }
            
            else
            if (links2.some((links2) =>  new RegExp(links2, "i").test(interaction.guild.name))){
              await interaction.editReply(language.share.blockedGN)
            }
            else
            if (bw.some((bw) =>  new RegExp(bw, "i").test(interaction.guild.name))){
                  await interaction.editReply(language.share.blockedGN)
            }else{

          let num = Math.floor(Math.random() * 9999) + 1000;

          num.length = 4;
            const captcha = new CaptchaGenerator()
          .setDimension(110 , 300)
          .setCaptcha({font: "Comic Sans BOLD" , text: `${num}` , size: 40, color: "#c59186"})
          .setDecoy({opacity: 10000})
          .setTrace({color: "#c59186"});
          
          //#726dff
          
          const buffer = await captcha.generateSync();
          
          let pSubscription = await prime.get(`primeguilds_${client.user.id}`)
          let invite = await interaction.channel.createInvite({ maxAge : 0 , maxUses : 0})
          
          const attachment = new MessageAttachment(buffer, interaction.user.id + ".png");
          if(pSubscription.includes(interaction.guild.id)){
            await interaction.editReply({ content : `${language.share.Smsg} ${client.guilds.cache.size} ${language.share.Smsg1} ` , files : [] , attachments: [] })
            client.guilds.cache.forEach(async (g) => {
              let rooms = await ShareModel.findOne({ guildID: g.id });
              let room = g.channels.cache.find((ch) => ch.id === rooms.channel);
              if (!room) return;
              let Banner = await banner.get(`banner_${interaction.guild.id}`)
              if(Banner == null){banner = "https://miro.medium.com/max/2400/1*-H6prGWbj7F9kmiimYhCMA.png"} 
              let embed = new MessageEmbed().setDescription(`${emoji.Discord}**Guild: ${interaction.guild.name}**
              ${emoji.Discovery}**Desciption: ${data.desc}**`).setImage(Banner)
                  room.send({content : `${invite}` , embeds : [embed]}).then(async () => {
                data.cooldown = Date.now() + time.PrimeST;
                  data.save(function(error) {
                    if (error) return;
                  })
info.add(`sharetimes_${interaction.guild.id}` , 1)
          })
        })
      }

      if(!pSubscription.includes(interaction.guild.id)){
        await interaction.editReply({content : language.share.noP_msg , files: [attachment] })

const filter = m => interaction.user.id === m.author.id;

const collecter = interaction.channel.createMessageCollector({filter , time : 30000 , max : 1})


collecter.on("collect" , async c => {
    if(c.content == num){
    	if(c.content === null){
                    "Nothing"
    	}
    	c.delete()
    		await interaction.editReply({ content : `${language.share.Smsg} ${client.guilds.cache.size} ${language.share.Smsg1} ` , files : [] , attachments: [] })
    	let invite = await interaction.channel.createInvite({ maxAge : 0 , maxUses : 0})
    	 let cooldwon = data.cooldown;
    	client.guilds.cache.forEach(async (g) => {
        let rooms = await ShareModel.findOne({ guildID: g.id });
        let room = g.channels.cache.find((ch) => ch.id === rooms.channel);
        if (!room) return;

room.send(`${emoji.Discord}**Guild: ${interaction.guild.name}**\n${emoji.Discovery}**Desciption: ${data.desc}**\n${invite}`).then(async () => {
          data.cooldown = Date.now() + time.ShareTime;
            data.save(function(error) {
    if (error) return;
})
info.add(`sharetimes_${interaction.guild.id}` , 1)
})})
    }else

if(c.content !== num){
	c.delete()
	await interaction.editReply({ content : language.share.wrongN ,files : [] , attachments: []})
}

      })
    }
  }


}}