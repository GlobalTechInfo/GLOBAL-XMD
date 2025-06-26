const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment-timezone');
const { pickRandom } = require('./function');

async function setTemplateMenu(qasim, type, m, prefix, setv, db, options = {}) {
    const day = moment.tz('Asia/Jakarta').locale('en').format('dddd');
    const date = moment.tz('Asia/Jakarta').locale('en').format('DD/MM/YYYY');
    const time = moment.tz('Asia/Jakarta').locale('en').format('HH:mm:ss');
    const greeting = time < '05:00:00' ? 'Good Early Morning 🌉' 
        : time < '11:00:00' ? 'Good Morning 🌄' 
        : time < '15:00:00' ? 'Good Afternoon 🏙' 
        : time < '18:00:00' ? 'Good Evening 🌅' 
        : time < '19:00:00' ? 'Good Evening 🌃' 
        : time < '23:59:00' ? 'Good Night 🌌' 
        : 'Good Night 🌌';
    
    let total = Object.entries(db.hit)
        .sort((a, b) => b[1] - a[1])
        .slice(0, Math.min(7, Object.keys(db.hit).length))
        .filter(([command]) => command !== 'totalcmd' && command !== 'todaycmd')
        .slice(0, 5);
    
    let text = `╭──❍「 *TOP MENU* 」❍\n`;
    
    if (total && total.length >= 5) {
        total.forEach(([command, hit]) => {
            text += `│${setv} ${prefix}${command}: ${hit} hits\n`;
        });
        text += '╰──────❍';
    } else {
        text += `│${setv} ${prefix}allmenu
│${setv} ${prefix}ownermenu
│${setv} ${prefix}botmenu
│${setv} ${prefix}toolsmenu
│${setv} ${prefix}groupmenu
╰──────❍`;
    }

    if (type == 1 || type == 'buttonMessage') {
        await qasim.sendButtonMsg(m.chat, {
            text: `Hello @${m.sender.split('@')[0]}\n` + text,
            footer: greeting,
            mentions: [m.sender],
            contextInfo: {
                forwardingScore: 10,
                isForwarded: true,
            },
            buttons: [{
                buttonId: `${prefix}allmenu`,
                buttonText: { displayText: 'All Menu' },
                type: 1
            },{
                buttonId: `${prefix}sc`,
                buttonText: { displayText: 'SC' },
                type: 1
            }]
        }, { quoted: m });
    } else if (type == 2 || type == 'listMessage') {
        await qasim.sendButtonMsg(m.chat, {
            text: `Hello @${m.sender.split('@')[0]}\n` + text,
            footer: greeting,
            mentions: [m.sender],
            contextInfo: {
                forwardingScore: 10,
                isForwarded: true,
            },
            buttons: [{
                buttonId: `${prefix}allmenu`,
                buttonText: { displayText: 'All Menu' },
                type: 1
            },{
                buttonId: `${prefix}sc`,
                buttonText: { displayText: 'SC' },
                type: 1
            }, {
                buttonId: 'list_button',
                buttonText: { displayText: 'list' },
                nativeFlowInfo: {
                    name: 'single_select',
                    paramsJson: JSON.stringify({
                        title: 'List Menu',
                        sections: [{
                            title: 'List Menu',
                            rows: [{
                                title: 'All Menu',
                                id: `${prefix}allmenu`
                            },{
                                title: 'Bot Menu',
                                id: `${prefix}botmenu`
                            },{
                                title: 'Group Menu',
                                id: `${prefix}groupmenu`
                            },{
                                title: 'Search Menu',
                                id: `${prefix}searchmenu`
                            },{
                                title: 'Download Menu',
                                id: `${prefix}downloadmenu`
                            },{
                                title: 'Quotes Menu',
                                id: `${prefix}quotesmenu`
                            },{
                                title: 'Tools Menu',
                                id: `${prefix}toolsmenu`
                            },{
                                title: 'Ai Menu',
                                id: `${prefix}aimenu`
                            },{
                                title: 'Stalker Menu',
                                id: `${prefix}stalkermenu`
                            },{
                                title: 'Random Menu',
                                id: `${prefix}randommenu`
                            },{
                                title: 'Anime Menu',
                                id: `${prefix}animemenu`
                            },{
                                title: 'Game Menu',
                                id: `${prefix}gamemenu`
                            },{
                                title: 'Fun Menu',
                                id: `${prefix}funmenu`
                            },{
                                title: 'Owner Menu',
                                id: `${prefix}ownermenu`
                            }]
                        }]
                    })
                },
                type: 2
            }]
        }, { quoted: m });
    } else if (type == 3 || type == 'documentMessage') {
        let profile;
        try {
            profile = await qasim.profilePictureUrl(m.sender, 'image');
        } catch (e) {
            profile = fake.anonim;
        }
        const menuText = `
╭──❍「 *USER INFO* 」❍
├ *Name* : ${m.pushName ? m.pushName : 'No Name'}
├ *Id* : @${m.sender.split('@')[0]}
├ *User* : ${options.isVip ? 'VIP' : options.isPremium ? 'PREMIUM' : 'FREE'}
├ *Limit* : ${options.isVip ? 'VIP' : db.users[m.sender].limit }
├ *Money* : ${db.users[m.sender] ? db.users[m.sender].money.toLocaleString('en-US') : '0'}
╰─┬────❍
╭─┴─❍「 *BOT INFO* 」❍
├ *Bot Name* : ${botname}
├ *Powered* : @${'0@s.whatsapp.net'.split('@')[0]}
├ *Owner* : @${owner[0].split('@')[0]}
├ *Mode* : ${qasim.public ? 'Public' : 'Self'}
├ *Prefix* :${db.set[options.botNumber].multiprefix ? '「 MULTI-PREFIX 」' : ' *'+prefix+'*' }
╰─┬────❍
╭─┴─❍「 *ABOUT* 」❍
├ *Date* : ${date}
├ *Day* : ${day}
├ *Time* : ${time} WIB
╰──────❍\n`;
        await m.reply({
            document: fake.docs,
            fileName: greeting,
            mimetype: pickRandom(fake.listfakedocs),
            fileLength: '100000000000000',
            pageCount: '999',
            caption: menuText + text,
            contextInfo: {
                mentionedJid: [m.sender, '0@s.whatsapp.net', owner[0] + '@s.whatsapp.net'],
                forwardingScore: 10,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: my.ch,
                    serverMessageId: null,
                    newsletterName: 'Join For More Info'
                },
                externalAdReply: {
                    title: author,
                    body: packname,
                    showAdAttribution: true,
                    thumbnailUrl: profile,
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    mediaUrl: my.gh,
                    sourceUrl: my.gh,
                }
            }
        });
    } else if (type == 4 || type == 'videoMessage') {
        // add your own implementation :v
    } else {
        m.reply(`${greeting} @${m.sender.split('@')[0]}\nPlease use ${prefix}allmenu\nTo see all the menus`);
    }
}

module.exports = setTemplateMenu;

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
