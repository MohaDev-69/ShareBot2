const emoji = require("../emojis.js")

module.exports = {

wrong : {
	reply : `** >>> ${emoji.Error}هناك خطأ حدث؛ من فضلك قُم بالتواصل مع طاقم الدعم الفني في السيرفر الخاص بنا!**`,
	buttonn : `سيرفر الدعم`
},	

ping : {
msg1 : `>>> **${emoji.Ping}بنق ... **`,
msg2 : `>>> ** ${emoji.Ping}البنق : **`
},

botinfo : {
title : "معلومات",
servers : `${emoji.Servers}سيرفر`,
users : `${emoji.Users}مُستخدم`,
channels : `${emoji.Channels}روم`,
uptime : `${emoji.Uptime}وقت التشغيل`,
createdAt : `${emoji.CreatedAt}تم إنشائه في`,
ram : `${emoji.Sparkles}الرام`,
inviteBTN : "رابط دعوته",
supportBTN : "سيرفر الدعم"
},

channel : {
wait : `>>> **${emoji.Wait}من فضلك أنتظر ...**`,
errr : `>>> ** ${emoji.Error}انا لا أمتلك بعض البرمشنات, اعطني جميع البرمشنات المطلوبه! **`,
err : `>>> ** ${emoji.Con}لا يمكنك اختيار`,
err2 : `كــ روم للنشر **`,
vc : `>>> ** ${emoji.Error}لا أمتلك برمشن لرؤية الروم! **`,
sm : `>>> ** ${emoji.Error}لا أمتلك برمشن لإرسال رسائل في الروم! **`,
me : `>>> ** ${emoji.Error}بعض الاوامر لن تعمل السبب : لا أمتلك برمشن EMBED_LINKS! **`,
success : `>>> ** ${emoji.Check}لقد تم تغير غرفة النشر لـ : `
},

desc : {
m_length : `>>> ** ${emoji.Con}الحد الأدنى لطول الوصف هو 10 أحرف! **`,
max_length : `>>> ** ${emoji.Con}أقصى طول للوصف هو 255 حرفًا! **`,
blocked_mention : `>>> ** ${emoji.Con}ممنوع المنشن بكل أنواعه everyone-here-@مُستخدم! **`,
blocked_link : `>>> **${emoji.Con}ممنوع الروابط بكل أنواعها! **`,
blocked_word : `>>> ** ${emoji.Error}الكلمة`,
blocked_word2 : `محظورة. **`,
success : `>>> ** ${emoji.Check}لقد تم تغير الوصف. **`
},

share : {
	invP : `>>> ** ${emoji.Error}لا أمتلك برمشنات لصناعة رابط الدعوه في النشر! **`,
	reHC : `>>> ** ${emoji.Wink}محاوله جيده, لقد تم ضبط برمشنات الروم.**`,
	reHCF : `>>> ** ${emoji.Wink}محاوله جيده, اعطني برمشنات او أظهر الروم وقُم بالمحاوله مره اخري :).**`,
	blockedGN : `>>> **	${emoji.Perms}لا يمكنك إستخدام اسم السيرفر في النشر! **`,
	unknownSH : `>> ** ${emoji.Error}لم أجد روم النشر. قُم بإختيارها مره اخري! **`,
	sm : `>>> ** ${emoji.Error}لا أمتلك برمشن لإرسال رسائل في الروم! **`,
	noP_msg : `>>> ${emoji.Time}لديك \`30s\` لكتابة الكابتشا`,
	Smsg : `>>> ** ${emoji.Mega}تم النشر في [`,
	Smsg1 : `] سيرفر الان! **`,
	Cooldown : `** ${emoji.Time}من فضلك أنتظر الكول داون :`
},

salary : {
cooldown : `>>> **${emoji.Error}من فضلك أنتظر الكول داون : **`,
success : `>>> **${emoji.Party}لقد حصلت علي : `,
vote : `>>> **${emoji.Thinking}للتصويت للبوت, استخدم [*هذا*](<https://top.gg/bot/715979315791265862/vote>) الرابط, وسوف تحصل علي (3 - 15) كوين**`,
alreadyV : `>>> ${emoji.Error}لقد تم التصويت للبوت من قبل`

},

cooldown : {
	msg1 : `>>> **${emoji.Cooldown}من فضلك انتظر اكثر`,
	msg2 : "قبل إستخدام الأمر",
	msg3 : "مُجدداً"
},

coins : {
	you : `>>> **${emoji.Coin}لديك :`,
	userr : `, لديك :`,
	coin : "كوين",
	bot : `>>> **${emoji.Perms}البوتات لا تمتلك كوينز**`
},

transfer : {
mention : `>>> **${emoji.Perms}في المره القادمه, ضع المستخدم قبل الكمية.**`,
enough : `>>> ** ${emoji.Perms}انت لا تمتلك كوينز كافيه للتحويل **`,
invalidN : `>>> ** ${emoji.Perms}رقم غير صحيح **`,
invalidU : `>>> ** ${emoji.Error}مستخدم/مُعرف غير صحيح**`,
author : `>>> **${emoji.Perms}لا تستطيع التحويل لنفسك**`,
amount : `, الكمية : `,
message : `اكتب الكابتشا التالي , لديك \`30s\``,
failed : `>>> ** ${emoji.Perms}لقد كتبت`,
failed2 : `والكابتشا كان`,
failed3 : `, لقد تم إلغاء التحويل **`,
success : ` **, لقد تم تحويل`,
success2 : `لـ :`,
dm : `** لقد وصلك كوينز من : `
},

leaderboard : {
title : "ليدربورد :"
},

prime : {
gID : `>>> ** ${emoji.Error}يجب ان تكتب ايدي(معرف) السيرفر.**`,
NoSub : `>>> ** ${emoji.Error}انت لا تمتلك اشتراك برايم لإستخدام هذا الامر.**`,
Guild : ` : السيرفر `,
End : `${emoji.Cooldown}ينتهي في :`,
unknown_g : `>>> ** ${emoji.Error}ايدي(معرف) السيرفر غير صحيح **`,
enough : `>>> ** ${emoji.Error}انت لا تمتلك كوينز كافيه للشراء!**`,
alreadyH : `>>> ** ${emoji.Perms}انت تمتلك إشتراك برايم بالفعل.**`,
Server_H_P : `>>> ** ${emoji.Error}هذا السيرفر يمتلك برايم متفعل بالفعل!**`,
buy_msg : `** ${emoji.Cooldown}لديك \`2 minutes\` لإختيار خطتك.**`,
timeout : `>>> ** ${emoji.Cooldown}نفذ الوقت : لقد تم إلغاء عملية الشراء **`,
Success : `>>> ** ${emoji.Check} لقد تم شراء برايم شيربوت لـ :`,
TransferS : `>>> ** ${emoji.Check}لقد تم تحويل سيرفر البرايم لـ : `,
ThisG : `>>> ** ${emoji.Error}إشتراكك لهذا السيرفر بالفعل ! **`
},

banner : {
NoSub : `>>> ** ${emoji.Error}هذا السيرفر لا يمتلك برايم لإستخدام هذا الامر **`,
invalid : `>>> ** ${emoji.Perms}قُم بإرسال رابط الصوره **`,
success : `>>> **${emoji.Check}لقد تم تغير البانر بنجاح!**`
},

preview : {
st : `>>> ** ${emoji.Mega}مرات النشر :`,
notSelected : `${emoji.Error} لم يتم الإختيار`
},

command : {
perms : ` >>> **${emoji.Perms}انت لا تمتلك`,
perms2 : `برمشن! **`
},

help : {
title : `**✨ - مرحباً, هذه هي جميع أوامري, إذا كُنت بحاجه إلي مساعده`,
general : "**عام :**",
share : "**النشر :**",
settings : "**الاعدادات :**",
coins : "**الكوينز :**",
prime : "**البرايم :**"
},

slowmode : {
invalid : `>>> ** ${emoji.Error}أدخل وقت صالح. **`,
mTime : `>>> ** ${emoji.Error}الحد الأدنى للوقت هو \`1s\` **`,
maxTime : `>>> ** ${emoji.Error}الحد الأقصى للوقت \`6h\` **`,
success : `>>> ** ${emoji.Check}لقد تم وضع السلو مود بنجاح. **`

},

prefix : {
	Minimum : `>>> ** ${emoji.Error}الحد الأدني للبرفكس هو 1 حرف! **`,
	Maximum : `>>> ** ${emoji.Error}الحد الأقصي للبرفكس هو 4 أحرف! **`,
	Success : `>>> ** ${emoji.Check}لقد تم تغير البرفكس لـ : `
},

ctype : {
voice : "روم صوتية",
category : "الفئة" 
}

}