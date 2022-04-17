const emoji = require("../emojis.js")

module.exports = {

wrong : {
	reply : `** >>> ${emoji.Error}Something went wrong, contact us in support server!**`,
	buttonn : `Support Server`
},	

ping : {
msg1 : `>>> **${emoji.Ping}Pinging ... **`,
msg2 : `>>> ** ${emoji.Ping}My Ping is : **`
},

botinfo : {
title : "ShareBot's Information",
servers : `${emoji.Servers}Servers`,
users : `${emoji.Users}Users`,
channels : `${emoji.Channels}Channels`,
uptime : `${emoji.Uptime}Uptime`,
createdAt : `${emoji.CreatedAt}Created At`,
ram : `${emoji.Sparkles}Ram`,
inviteBTN : "ShareBot's Invite",
supportBTN : "Support Server"
},

channel : {
wait : `>>> **${emoji.Wait}Please wait ...**`,
errr : `>>> ** ${emoji.Error}Some Permissions i don't have it, make sure you give me the full permissions! **`,
err : `>>> ** ${emoji.Con}You can't select`,
err2 : `as a sharing channel **`,
vc : `>>> ** ${emoji.Error}I don't have permission to view this channel! **`,
sm : `>>> ** ${emoji.Error}I don't have permission to send messages to this channel! **`,
me : `>>> ** ${emoji.Error}Some commands will not working, i need EMBED_LINKS permission! **`,
success : `>>> ** ${emoji.Check}The sharing channel has been updated to : `
},

desc : {
m_length : `>>> ** ${emoji.Con}Minimum description length is 10 letters! **`,
max_length : `>>> ** ${emoji.Con}Maximum description length is 255 letters! **`,
blocked_mention : `>>> ** ${emoji.Con}Trying to mention everyone , here / disturb some people is not allowed! **`,
blocked_link : `>>> **${emoji.Con}Adding links in the description is not allowed! **`,
blocked_word : `>>> ** ${emoji.Error}The word`,
blocked_word2 : `is blocked. **`,
success : `>>> ** ${emoji.Check}The description has been updated. **`
},

share : {
	invP : `>>> ** ${emoji.Error}I can't create invite for sharing, give me Create Invite Permission! **`,
	reHC : `>>> ** ${emoji.Wink}Nice try, the channel permissions for everyone has been reseted.**`,
	reHCF : `>>> ** ${emoji.Wink}Nice try, give me the permission's or unhide the channel then try again :).**`,
	blockedGN : `>>> **	${emoji.Perms}You can't use this name in the sharing! **`,
	unknownSH : `>>> ** ${emoji.Error}I can't find the sharing channel. Please reselect it! **`,
	sm : `>>> ** ${emoji.Error}I don't have permission to send messages to this channel! **`,
	noP_msg : `>>>  ** ${emoji.Time}You have only \`30s\` to type the captcha **`,
	wrongN : `>>> ** ${emoji.Error}Wrong number , the sharing has been canceld **`,
	Smsg : `>>> ** ${emoji.Mega}Shared to [`,
	Smsg1 : `] Server(s) now! **`,
	Cooldown : `>>> ** ${emoji.Time}Please Wait the cooldown :`
},

salary : {
cooldown : `>>> **${emoji.Error}Please wait the cooldown : **`,
success : `>>> **${emoji.Party}You have got : `,
vote : `>>> **${emoji.Thinking}If you vote for our bot, using [*this*](<https://top.gg/bot/715979315791265862/vote>) link, you will get (3 - 15) coins**`,
alreadyV : `>>> ${emoji.Error}You are already voted for me`

},

cooldown : {
	msg1 : `>>> **${emoji.Cooldown}Please wait more`,
	msg2 : "before re-using",
	msg3 : "command again"
},

coins : {
	you : `>>> **${emoji.Coin}You Have :`,
	userr : `, Have :`,
	coin : "Coin",
	bot : `>>> **${emoji.Perms}The bots does not have coins**`
},

transfer : {
mention : `>>> **${emoji.Perms}In the next time, add the user before the amount.**`,
enough : `>>> ** ${emoji.Perms}You don't have enough coins to transfer **`,
invalidN : `>>> ** ${emoji.Perms}Invalid number **`,
invalidU : `>>> ** ${emoji.Error}Unknown User / ID**`,
author : `>>> **${emoji.Perms}You can't transfer to yourself**`,
amount : `, Amount : `,
message : `type the captcha bellow to transfer , you have only \`30s\``,
failed : `>>> ** ${emoji.Perms}You typed`,
failed2 : `and the captcha was`,
failed3 : `, the transfer has been canceld **`,
success : ` **, You have been transfered`,
success2 : `to :`,
dm : `** coins has been transferd to you, from : `
},

leaderboard : {
title : "Leaderboard :"
},

prime : {
gID : `>>> ** ${emoji.Error}The server ID is required for this option.**`,
NoSub : `>>> ** ${emoji.Error}You don't have prime subscripition to use this option.**`,
Guild : `>>> ** ${emoji.Discord}Guild :`,
End : `${emoji.Cooldown}Ends At :`,
unknown_g : `>>> ** ${emoji.Error}Unknown Guild / Invalid ID **`,
enough : `>>> ** ${emoji.Error}You don't have enough coins!**`,
alreadyH : `>>> ** ${emoji.Perms}You already have active prime subscription.**`,
Server_H_P : `>>> ** ${emoji.Error}This server already have prime!**`,
buy_msg : `>>> ** ${emoji.Cooldown}You have only \`2 minutes\` to choose your plan.**`,
timeout : `>>> ** ${emoji.Cooldown}Timeout : The purchased has been canceld **`,
Success : `>>> ** ${emoji.Check} You have been purchased ShareBot Prime for :`,
TransferS : `>>> ** ${emoji.Check}Your Prime has been transfered to : `,
ThisG : `>>> ** ${emoji.Error}Your prime subscription is for this guild already ! **`
},

banner : {
NoSub : `>>> ** ${emoji.Error}This server doesn't have prime subscripition to use this option. **`,
invalid : `>>> ** ${emoji.Perms}Please add valid banner link **`,
success : `>>> **${emoji.Check}The image has been successfully changed!**`
},

preview : {
st : `>>> ** ${emoji.Mega}Sharing Times :`,
notSelected : `${emoji.Error} Not Selected`
},

command : {
perms : ` >>> **${emoji.Perms}You don't have`,
perms2 : `permission! **`
},

help : {
title : `**✨ - Hey, that was all my commands, if you need help type`,
general : "**General :**",
share : "**Share :**",
settings : "**Settings :**",
coins : "**Coins :**",
prime : "**Prime :**"
},

slowmode : {
invalid : `>>> ** ${emoji.Error}Please insert invalid time. **`,
mTime : `>>> ** ${emoji.Error}The minimum time is \`1s\` **`,
maxTime : `>>> ** ${emoji.Error}The maximum time is \`6h\` **`,
success : `>>> ** ${emoji.Check}Slowmode Has been successfully added. **`

},

prefix : {
	Minimum : `>>> ** ${emoji.Error}The mimimum prefix length is 1 letter! **`,
	Maximum : `>>> ** ${emoji.Error}The maximum prefix length is 4 letters! **`,
	Success : `>>> ** ${emoji.Check}My prefix in this guild has been successfully updated to : `
},

ctype : {
voice : "voice channel",
category : "category" 
},

resetdata : {
	devs : `>>> ** ${emoji.Error}This command for developer(s) only!**`,
	IgID : `>>> ** ${emoji.Error}Invalid Guild ID **`,
	success : `>>> ** ${emoji.Check}The Data has been reseted ! **`
},

blacklist : {
	invalidU : `>>> ** ${emoji.Error}Invaild user ID **`,
	alreadyBL : `>>> ** ${emoji.Error}This user is already blacklisted **`,
	notBL : `>>> ** ${emoji.Error}This user is not blacklisted **`,
	success : `>>> ** ${emoji.Check} `,
	success2 : ` has been blacklisted **`,
	usuccess2 : ` has been unblacklisted **`,
	check : `blacklist status is : `,
	t : "true",
	f : "false",
	invalidG : `>>> ** ${emoji.Error}Invaild guild ID **`,
	alreadyBL2 : `>>> ** ${emoji.Error}This guild is already blacklisted **`,
	notBL2 : `>>> ** ${emoji.Error}This guild is not blacklisted **`
},

failed : {
	blacklistedU : `>>> ** ${emoji.Error}You are blacklisted from using the bot. **\nYou can know the reason in support server!`,
	blacklistedS : `>>> ** ${emoji.Error}This server has been blacklisted from using the bot. **\nYou can know the reason in support server!`
},

vip : {
	unknown_g : `>>> ** ${emoji.Error}Add an valid guild ID **`,
	invalidGI : `>>> ** ${emoji.Error}Invalid guild ID **`,
	success : `>>> **${emoji.Check}Added Successfully**`,
	Server_H_P : `>>> ** ${emoji.Error}This server already have prime!**`,
	success2 : `>>> **${emoji.Check}Removed Successfully**`,
	Server_H_P2 : `>>> ** ${emoji.Error}This server does not have prime!**`,
	user_H_P : `>>> ** ${emoji.Error}This user does not have prime!**`,
	user : "User :",
	status : "Status :",
	guild : "Guild :",
	end : "Ends At :",
	pa : `${emoji.Check}Prime active!`,
	paf : `${emoji.Error}Prime is not active!`
	
},

manage_coins : {
	IuID : `>>> ** ${emoji.Error}Invalid user **`,
	NumOnly : `>>> ** ${emoji.Error}Numbers only **`,
	successA : `coin Added to : **`,
	successR : `coin Removed from : **`
}

}