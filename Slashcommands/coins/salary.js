const { MessageAttachment , Discord } = require('discord.js');
const humanizeDuration = require("humanize-duration");
const { Database } = require("quickmongo")
const langu = new Database(process.env.lang_db)
const coins = new Database(process.env.coins_db)
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxNTk3OTMxNTc5MTI2NTg2MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjAzOTg0OTAzfQ.yfFiOaZQutVr9QyvM7kxAsIkxTatUUj8Lkk_oBrwuIA' , {webhookPort : Math.floor(Math.random() * 9999) , webhookAuth : 'amsmk1681981'}) 


module.exports = {
	name: 'salary',
	description: `collect your salary`,
    cooldown : 15,
    UserPermission : ["SEND_MESSAGES"],
	async execute(client , interaction , language) {

let lang = await langu.get(`lang_${interaction.guild.id}`)

    if(lang === null){
        lang = "en"
    }


let Value = interaction.options.getString('salary')

if(Value === "daily"){
	 let timeout = 86400000;
          let amount = Math.floor(Math.random() * 30);
        let daily = await coins.get(`dailycooldown_${interaction.user.id}`)
         if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = humanizeDuration(timeout - (Date.now() - daily) , { language : lang});
   
   await interaction.editReply(`${language.salary.cooldown}\`${time}\``)
    } else {
                
coins.set(`dailycooldown_${interaction.user.id}` , Date.now())
                coins.add(`coins_${interaction.user.id}` , amount)
              await interaction.editReply(`${language.salary.success} \`$${amount}\`**`);
}
}else if(Value === "weekly"){
	 let timeout = 604800000;
          let amount = Math.floor(Math.random() * 50);
        let daily = await coins.get(`weeklycooldown_${interaction.user.id}`)
         if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = humanizeDuration(timeout - (Date.now() - daily) , { language : lang});
   
   await interaction.editReply(`${language.salary.cooldown}\`${time}\``)
    } else {
                
coins.set(`weeklycooldown_${interaction.user.id}` , Date.now())
                coins.add(`coins_${interaction.user.id}` , amount)
              await interaction.editReply(`${language.salary.success} \`$${amount}\`**`);

}
}else if(Value === "vote"){
     dbl.hasVoted(interaction.user.id).then(async r => {
      if(r){
        await interaction.editReply(language.salary.alreadyV)
      }else
      if(!r){
        await interaction.editReply(language.salary.vote)
    }

})

}

	}
}