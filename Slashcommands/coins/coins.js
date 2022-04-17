const { MessageAttachment , Discord } = require('discord.js');
const humanizeDuration = require("humanize-duration");
const { Database } = require("quickmongo")
const { CaptchaGenerator } = require("captcha-canvas");
const emoji = require("../../emojis.js")
const coins = new Database(process.env.coins_db)

module.exports = {
	name: 'coins',
	description: `show your / someone coins - transfer coins for someone`,
	aliases : ['coins'],
    cooldown : 15,
    UserPermission : ["SEND_MESSAGES"],
	async execute(client , interaction , language) {
let User = interaction.options.getUser("user")
let Amount = interaction.options.getNumber("amount")
let ggggg = 2 + 2 == 4;
if(!Amount){
	if(!User){
		User = interaction.user
	}
	
	let coinss = await coins.get(`coins_${User.id}`)
	
	if(coinss === null){
		coinss = "0"
	}

	if(User.bot){
		await interaction.editReply(language.coins.bot)
	}else
if(User.id == interaction.user.id){
await interaction.editReply(`${language.coins.you} \`$${coinss}\` ${language.coins.coin}**`)
}else

if(User.id !== interaction.user.id){
await interaction.editReply(`>>> **${emoji.Coin}<@${User.id}> ${language.coins.userr} \`$${coinss}\` ${language.coins.coin}**`)
}

}else

if(Amount !== null && !User){
	await interaction.editReply(language.transfer.mention)
}else

if(User.id == interaction.user.id && Amount !== null){
await interaction.editReply(language.transfer.author)
}else 

if(User.id !== interaction.user.id && Amount !== null){
	if(User.bot){
		await interaction.editReply(language.coins.bot)
	}else
	
	if(1 == 1){
	let AuthorC = await coins.get(`coins_${interaction.user.id}`)

	if(Amount === 0){ 
	 await interaction.editReply(language.transfer.invalidN)
	}else
	if(Amount.toString().includes(".") || Amount.toString().includes("-") || Amount.toString().includes(",")){ 
		await interaction.editReply(language.transfer.invalidN)
	   }else

	if(Amount > AuthorC){
		await interaction.editReply(language.transfer.enough)
	}else if(Amount < AuthorC && Amount > 0){
	      let tax = Math.floor(Amount*(3/100));
      let resulting = Math.floor(Amount-(Amount*(3/100))); 
      if(Amount === 1){
      	resulting = 1
      }

let num = Math.floor(Math.random() * 9999) + 1000;

num.length = 4;
  const captcha = new CaptchaGenerator()
//.setDimension(200 , 600)
.setDimension(110 , 300)
.setCaptcha({font: "Comic Sans BOLD" , text: `${num}` , size: 40, color: "#c59186"})
.setDecoy({opacity: 10000})
.setTrace({color: "#c59186"});

//#726dff
const buffer = await captcha.generateSync();

const attachment = new MessageAttachment(buffer, interaction.userId + ".png");


		interaction.editReply({content : `>>> **${interaction.user.tag} ${language.transfer.amount}\`${resulting}\` \n ${language.transfer.message}**` , files: [attachment] })
		const filter = m => interaction.user.id === m.author.id;

		const collecter = interaction.channel.createMessageCollector({filter , time : 30000 , max : 1})	




collecter.on("collect" , async c => {
    if(c.content == num){
    	if(c.content === null){
                    "Nothing"
    	}
    	c.delete()
    	let number = parseInt(resulting)
    	await coins.subtract(`coins_${interaction.user.id}` , number)
    	await coins.add(`coins_${User.id}` , number)
    	await interaction.editReply({ content : `>>> **${emoji.Check}**<@${interaction.user.id}> ${language.transfer.success} \`${number}\` ${language.transfer.success2} <@${User.id}> **` ,files : [] , attachments: []})
        await User.send(`>>> ${emoji.Mail}\`${number}\`${language.transfer.dm} <@${interaction.user.id}> - \`${interaction.user.id}\` **`).catch(err => {})
        }else

if(c.content !== num){
	c.delete()
	await interaction.editReply({ content : ` ${language.transfer.failed} \`${c.content}\` ${language.transfer.failed2} \`${num}\`${language.transfer.failed3}` ,files : [] , attachments: []})
}
})

}
}
}


}
}