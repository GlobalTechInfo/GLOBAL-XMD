const fs = require('fs');
const chalk = require('chalk');

/*
	* Create By GlobalTechInfo
	* Follow https://github.com/GlobalTechInfo
	* Whatsapp : https://whatsapp.com/channel/0029VagJIAr3bbVBCpEkAM07
*/

//~~~~~~~~~~~~< GLOBAL SETTINGS >~~~~~~~~~~~~\\

global.owner = ['27840454677'] //['92x','92x'] 2 owner
global.packname = 'BOT'
global.author = 'GlobalTechInfo'
global.botname = 'GLOBAL MD'
global.listprefix = ['+','!','.']
global.listv = ['•','●','■','✿','▲','➩','➢','➣','➤','✦','✧','△','❀','○','□','♤','♡','◇','♧','々','〆']
global.tempatDB = 'database.json' // Put mongodb url here if using mongodb. Format : 'mongodb+srv://...'
global.tempatStore = 'baileys_store.json' // Put mongodb url here if using mongodb. Format : 'mongodb+srv://...'
global.pairing_code = true
global.number_bot = '' // If you use a panel, you can enter the number here, if you haven't taken a session. Format: '92320xx'

global.fake = {
	anonim: 'https://telegra.ph/file/95670d63378f7f4210f03.png',
	thumbnailUrl: 'https://telegra.ph/file/fe4843a1261fc414542c4.jpg',
	thumbnail: fs.readFileSync('./src/media/global.png'),
	docs: fs.readFileSync('./src/media/fake.pdf'),
	listfakedocs: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/pdf'],
}

global.my = {
	yt: 'https://youtube.com/@GlobalTechInfo',
	gh: 'https://github.com/GlobalTechInfo',
	gc: 'https://whatsapp.com/channel/0029VagJIAr3bbVBCpEkAM07',
	ch: '120363319098372999@newsletter',
}

global.limit = {
	free: 100,
	premium: 999,
	vip: 9999
}

global.money = {
	free: 10000,
	premium: 1000000,
	vip: 10000000
}

global.mess = {
    key: 'Your API key has expired, please visit\nhttps://my.hitori.pw',
    owner: 'Owner-only feature!',
    admin: 'Admin-only feature!',
    botAdmin: 'Bot is not an admin!',
    group: 'Use this in a group!',
    private: 'Use this in private chat!',
    limit: 'Your limit has been exhausted!',
    prem: 'Premium users only!',
	wait: 'Loading...',
	error: 'Error!',
	done: 'Done'
}

global.APIs = {
	hitori: 'https://api.hitori.pw',
}
global.APIKeys = {
	'https://api.hitori.pw': 'htrkey-77eb83c0eeb39d40',
	geminiApikey: ['AIzaSyD0lkGz6ZhKi_MHSSmJcCX3wXoDZhELPaQ','AIzaSyDnBPd_EhBfr73NssnThVQZYiKZVhGZewU','AIzaSyA94OZD-0V4quRbzPb2j75AuzSblPHE75M','AIzaSyB5aTYbUg2VQ0oXr5hdJPN8AyLJcmM84-A','AIzaSyB1xYZ2YImnBdi2Bh-If_8lj6rvSkabqlA']
}

// Lainnya

global.badWords = ['tolol','goblok','asu','pantek','kampret','ngentot','jancok','kontol','memek','lonte']
global.chatLength = 1000

//~~~~~~~~~~~~~~~< PROCESS >~~~~~~~~~~~~~~~\\

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
