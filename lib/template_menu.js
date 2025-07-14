const fs = require('fs');

const path = require('path');

const moment = require('moment-timezone');

const timezone = global.timezone

async function setTemplateMenu(qasim, type, m, prefix, setv, db, options = {}) {

    const day = moment.tz(timezone).locale('en').format('dddd');

    const date = moment.tz(timezone).locale('en').format('DD/MM/YYYY');

    const time = moment.tz(timezone).locale('en').format('HH:mm:ss');

    const greeting = time < '05:00:00' ? 'Good Early Morning 🌉' 

        : time < '11:00:00' ? 'Good Morning 🌄' 

        : time < '15:00:00' ? 'Good Afternoon 🏙' 

        : time < '18:00:00' ? 'Good Evening 🌅' 

        : time < '19:00:00' ? 'Good Evening 🌃' 

        : time < '23:59:00' ? 'Good Night 🌌' 

        : 'Good Night 🌌';

    // quotes to send
    const quotes = [
      "I'm not lazy, I'm just on my energy saving mode.",
      "Life is short, smile while you still have teeth.",
      "I may be a bad influence, but darn I am fun!",
      "I'm on a whiskey diet. I've lost three days already.",
      "Why don't some couples go to the gym? Because some relationships don't work out.",
      "I told my wife she should embrace her mistakes... She gave me a hug.",
      "I'm great at multitasking. I can waste time, be unproductive, and procrastinate all at once.",
      "You know you're getting old when you stoop to tie your shoelaces and wonder what else you could do while you're down there.",
      "I'm so good at sleeping, I can do it with my eyes closed.",
      "If you think nobody cares if you’re alive, try missing a couple of payments.",
      "I used to think I was indecisive, but now I'm not so sure.",
      "If you can't convince them, confuse them.",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "I'm not clumsy, I'm just on a mission to test gravity.",
      "I told my wife she should do more push-ups. She said, 'I could do a hundred!' So I counted to ten and stopped.",
      "Life is like a box of chocolates; it doesn't last long if you're hungry.",
      "I'm not saying I'm Wonder Woman, I'm just saying no one has ever seen me and Wonder Woman in the same room together.",
      "Why do they call it beauty sleep when you wake up looking like a troll?",
      "I don't always lose my phone, but when I do, it's always on silent.",
      "My bed is a magical place where I suddenly remember everything I was supposed to do.",
      "I love the sound you make when you shut up.",
      "I'm not arguing, I'm just explaining why I'm right.",
      "I'm not a complete idiot, some parts are missing.",
      "When life gives you lemons, squirt someone in the eye.",
      "I don't need anger management. You just need to stop making me angry.",
      "I'm not saying I'm Batman. I'm just saying no one has ever seen me and Batman in the same room together.",
      "I'm not saying I'm Superman. I'm just saying no one has ever seen me and Superman in the same room together.",
      "I'm not saying I'm Spider-Man. I'm just saying no one has ever seen me and Spider-Man in the same room together.",
      "I'm not saying I'm a superhero. I'm just saying no one has ever seen me and a superhero in the same room together.",
      "The early bird can have the worm because worms are gross and mornings are stupid.",
      "If life gives you lemons, make lemonade. Then find someone whose life has given them vodka and have a party!",
      "The road to success is always under construction.",
      "I am so clever that sometimes I don't understand a single word of what I am saying.",
      "Some people just need a high-five. In the face. With a chair.",
      "I'm not saying I'm perfect, but I'm pretty close.",
      "A day without sunshine is like, you know, night.",
      "The best way to predict the future is to create it.",
      "If you can't be a good example, then you'll just have to be a horrible warning.",
      "I don't know why I keep hitting the escape button. I'm just trying to get out of here.",
      "I'm not lazy. I'm on energy-saving mode.",
      "I don't need a hairstylist, my pillow gives me a new hairstyle every morning.",
      "I don't have a bad handwriting, I have my own font.",
      "I'm not clumsy. It's just the floor hates me, the table and chairs are bullies, and the walls get in my way.",
      "I'm not saying I'm Batman. I'm just saying no one has ever seen me and Batman in the same room together.",
      "I'm not saying I'm Wonder Woman. I'm just saying no one has ever seen me and Wonder Woman in the same room together.",
      "I'm not saying I'm Superman. I'm just saying no one has ever seen me and Superman in the same room together.",
      "I'm not saying I'm Spider-Man. I'm just saying no one has ever seen me and Spider-Man in the same room together.",
      "I'm not saying I'm a superhero. I'm just saying no one has ever seen me and a superhero in the same room together."
      ];


    // Prepare top menu text with at least 5 commands

    let total = Object.entries(db.hit || {})

        .sort((a, b) => b[1] - a[1])

        .filter(([command]) => command !== 'totalcmd' && command !== 'todaycmd')

        .slice(0, 5);

    let quote = quotes[Math.floor(Math.random() * quotes.length)];

    let text = `
    🚀 *_Buckle up ${m.pushName ? m.pushName : 'Bot User'}, ${greeting}! We're going on an adventure!_* 🚀

    📋 *_Quote of the day: ${quote}_* 📋

╭──❍「 *TOP MENU* 」❍\n`;



    if (total && total.length >= 5) {

        total.forEach(([command, hit]) => {

            text += `│${setv} ${prefix}${command}: ${hit} hits\n`;

        });

        text += '╰─┬────❍';

    } else {

        text += `│${setv} ${prefix}allmenu\n`;

        text += `│${setv} ${prefix}ownermenu\n`;

        text += `│${setv} ${prefix}botmenu\n`;

        text += `│${setv} ${prefix}toolsmenu\n`;

        text += `│${setv} ${prefix}groupmenu\n`;

        text += '╰─┬────❍';

    }
    // Compose detailed user and bot info text

    const menuText = `
╭─┴─❍「 *USER INFO* 」❍
├ *Name* : ${m.pushName ? m.pushName : 'No Name'}
├ *User* : ${options.isVip ? 'VIP' : options.isPremium ? 'PREMIUM' : 'FREE'}
├ *Limit* : ${options.isVip ? 'VIP' : (db.users[m.sender]?.limit ?? 0)}
├ *Money* : ${db.users[m.sender] ? db.users[m.sender].money.toLocaleString('en-US') : '0'}
╰─┬────❍
╭─┴─❍「 *BOT INFO* 」❍
├ *App* : ${global.botname || 'Bot'}
├ *Owner* : @${(global.owner && global.owner[0]) ? global.owner[0].split('@')[0] : 'owner'}
├ *Mode* : ${qasim.public ? 'Public' : 'Self'}
├ *Prefix* : ${db.set && db.set[options.botNumber]?.multiprefix ? '「 MULTI-PREFIX 」' : ' *' + prefix + '*'}
╰─┬────❍
╭─┴─❍「 *ABOUT* 」❍
├ *Date* : ${date}
├ *Day* : ${day}
├ *Time* : ${time} WIB
╰──────❍\n`;



    // Compose full caption: greeting + menu + user/bot info + footer note

    const caption = `${text}${menuText}\n*_Remember, when in doubt, use ${prefix}listmenu or ${prefix}help It's like my magic spell book!_*`;



    // Image path (adjust filename if needed)

    const imagePath = path.join(__dirname, '..', 'src', 'media', 'global.png');



    // Check if image exists

    if (!fs.existsSync(imagePath)) {

        return m.reply('Menu image not found, please check the path.');

    }



    // Send image with caption, mention user, quoted original message

    await qasim.sendMessage(m.chat, {

        image: fs.readFileSync(imagePath),

        caption: caption,

        mentions: [m.sender]

    }, { quoted: m });

}



module.exports = setTemplateMenu;

let file = require.resolve(__filename);

fs.watchFile(file, () => {

    fs.unwatchFile(file);

    console.log(chalk.redBright(`Update ${__filename}`));

    delete require.cache[file];

    require(file);

});
