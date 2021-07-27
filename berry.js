require('dotenv').config()
const path = require('path')
const fetch = require('node-fetch')
const NekoClient = require('nekos.life')
const mongoose = require('mongoose')
const fs = require('fs')
const Discord = require('discord.js')
const neko = new NekoClient()
const client = new Discord.Client()
const prefix = '!'

mongoose.connect(process.env.MONGODBCONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then((e) => {console.log('connected to DB')}).catch(err => {console.log(err)})

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

client.on('ready', async () => {
    console.log('Bot is now on')
    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = (dir) =>{
        const files = fs.readdirSync(path.join(__dirname, dir))
        for(const file of files){
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if(stat.isDirectory()){
                readCommands(path.join(dir, file))
            }else if(file !== baseFile){
                const option = require(path.join(__dirname, dir, file))
                commandBase(option)
            }
        }
    }

    readCommands('commands')

    commandBase.listen(client, Discord)
})


// client.on('message', async (message) => {
//     if(!message.guild) return
//     if(message.content.startsWith(prefix)){
//     const [cmd, ...args] = message.content.trim().substring(prefix.length).split(/ +/)
    
//         if(cmd === 'anime' || cmd === 'a'){
//             if(!args[0]) return message.reply('Bruh give me a name to search')
//             let searchName = args.join(' ')
//             anime(searchName)
//         }

//         // if(!client.commands.has(cmd))
//         try{
//             client.commands.get(cmd).execute(message, args)
//         }catch (err){
//             console.log(err)
//             message.reply('Issue executing the command')
//         }

//     switch (cmd) {
//         case 'say':
//             message.delete().catch(err => console.log(err))
//             message.channel.send(args.join(''))
//             break
        
//         // case 'ping':
//         //     message.channel.send(`${Math.round(client.ws.ping)}ms`)
//         //     break
        
//         case 'kick':
//             if(!args[0]) return message.reply('Specify user id')
//             const member = message.guild.members.cache.get(args[0])
//             if(member){
//                 console.log(member)
//             }else{
//                 message.reply('No user found')
//             }
//             break

//         case 'date':
//             const timezone = new Date()
//             let seconds = timezone.toLocaleTimeString()
//             let date = timezone.toLocaleDateString()
//             let embed = new MessageEmbed()
//             .setAuthor(`<@${message.author.id}>`)
//             .setTitle('Time and Date')
//             .addFields(
//                 {name: 'Date', value: date},
//                 {name: 'Time', value: seconds}
//             )
//             .setTimestamp(message.createdAt)
//             .setDescription('Your local time and date')

//             message.channel.send(embed)
//             break
        
//             //pin messages to channel
//         case 'pin':
//             if(!args[0]) return message.reply('Give me something to pin')
//             message.delete().catch(err => {console.log(err)})
//             message.channel.send(args.join(' ')).then((msg) => msg.pin())
//             break

//         case 'get':
//             let ran = Math.floor(Math.random() * 10)
//             fetch('https://reqres.in/api/users/' + ran)
//             .then(res => {
//                 if(res.ok){
//                     return res.json()
//                 }else{
//                     console.log('Failed')
//                     return
//                 }
//             })
//             .then(e => {
//                 if(!e){
//                     return message.reply('Looks like it failed XD')
//                 }else{
//                     console.log(e.data.avatar)
//                 let embed = new MessageEmbed()
//                 .setDescription('Random user')
//                 .setImage(e.data.avatar)
//                 .addFields(
//                     {name:'First Name', value:`${e.data.first_name}`},
//                     {name:'Last Name', value:`${e.data.last_name}`},
//                     {name:'Email', value:`${e.data.email}`}
//                 )
//                 message.channel.send(embed)
//                 }
//             })
//             break
//         case 'neko':
//             if(args[0] === 'baka' && getUserFromMention(args[1])){
//                 let sauce = await neko.sfw.baka()
//                 let embed = new MessageEmbed()
//                 .setTitle('Baka')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(`${message.author} said baka to ${args[1]}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'pat' && getUserFromMention(args[1])){
//                 let sauce = await neko.sfw.pat()
//                 let embed = new MessageEmbed()
//                 .setTitle('Pat')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(`${message.author} pats ${args[1]}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'slap' && getUserFromMention(args[1])){
//                 let sauce = await neko.sfw.slap()
//                 let embed = new MessageEmbed()
//                 .setTitle('Slap')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(`${message.author} Slaps ${args[1]}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'poke' && getUserFromMention(args[1])){
//                 let sauce = await neko.sfw.poke()
//                 let embed = new MessageEmbed()
//                 .setTitle('Poke')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(`${message.author} Pokes ${args[1]}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'tickle' && getUserFromMention(args[1])){
//                 let sauce = await neko.sfw.tickle()
//                 let embed = new MessageEmbed()
//                 .setTitle('Tickle')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(`${message.author} Tickled ${args[1]}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'kiss' && getUserFromMention(args[1])){
//                 let sauce = await neko.sfw.kiss()
//                 let embed = new MessageEmbed()
//                 .setTitle('Kiss')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(`${message.author} Kisses ${args[1]}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'hug' && getUserFromMention(args[1])){
//                 let sauce = await neko.sfw.hug()
//                 let embed = new MessageEmbed()
//                 .setTitle('Hug')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(`${message.author} gave hugs to ${args[1]}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'cuddle' && getUserFromMention(args[1])){
//                 let sauce = await neko.sfw.cuddle()
//                 let embed = new MessageEmbed()
//                 .setTitle('Cuddle')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(`${message.author} cuddles with ${args[1]}`)
//                 message.channel.send(embed)
//             }


//             if(!message.channel.nsfw) return message.channel.send('Channel is not NSFW')
//             if(!args[0]){
//                 message.channel.send((await neko.nsfw.randomHentaiGif()).url)
//             }else if(args[0] === 'boobs'){
//                 let sauce = await neko.nsfw.boobs()
//                 let embed = new MessageEmbed()
//                 .setTitle('Hentai')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'anal'){
//                 let sauce = await neko.nsfw.anal()
//                 let embed = new MessageEmbed()
//                 .setTitle('Hentai')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'bj'){
//                 let sauce = await neko.nsfw.bJ()
//                 let embed = new MessageEmbed()
//                 .setTitle('Hentai')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'lesbian'){
//                 let sauce = await neko.nsfw.lesbian()
//                 let embed = new MessageEmbed()
//                 .setTitle('Hentai')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'tits'){
//                 let sauce = await neko.nsfw.tits()
//                 let embed = new MessageEmbed()
//                 .setTitle('Hentai')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'pussy'){
//                 let sauce = await neko.nsfw.pussy()
//                 let embed = new MessageEmbed()
//                 .setTitle('Hentai')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'cum'){
//                 let sauce = await neko.nsfw.cumsluts()
//                 let embed = new MessageEmbed()
//                 .setTitle('Hentai')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'yuri'){
//                 let sauce = await neko.nsfw.yuri()
//                 let embed = new MessageEmbed()
//                 .setTitle('Hentai')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'solo'){
//                 let sauce = await neko.nsfw.girlSoloGif()
//                 let embed = new MessageEmbed()
//                 .setTitle('Hentai')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'spank'){
//                 let sauce = await neko.nsfw.spank()
//                 let embed = new MessageEmbed()
//                 .setTitle('Hentai')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(embed)
//             }else if(args[0] === 'gasm'){
//                 let sauce = await neko.nsfw.gasm()
//                 let embed = new MessageEmbed()
//                 .setTitle('Hentai')
//                 .setURL(sauce.url)
//                 .setImage(sauce.url)
//                 .setFooter(`Requested by: ${message.author.tag}`)
//                 message.channel.send(embed)
//             }
//             break

//         case 'password':
//             let length = 10
//             let charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*'
//             let result = ''
//             for(let i = 0, n = charSet.length; i <length; i++){
//                 result += charSet.charAt(Math.floor(Math.random() * n))
//             }
//             message.channel.send(`Randomly generated password for you: ${result}`)
//             break
        
//         case 'embed':
//             let text = args.join(' ')
//             message.delete()
//             let newEmbed = new MessageEmbed()
//             .setDescription(text)
//             .setFooter(message.author.tag)
//             message.channel.send(newEmbed)
//             break

//         case 'reminder':
//             if(!args) return message.reply('Use this command as following: reminder 10000 complete assignment, where time is in milliseconds(10000ms = 10s)')
//             message.delete()
//             reminder(args[0], args)
//         break

//         case 'set':
//             if(!args[0]) return message.channel.send('what to set this channel to?')
//             if(args[0] === 'nsfw'){
//                 if(message.channel.nsfw){
//                     message.reply('Channel is already NSFW')
//                 }else{
//                     let channel = message.channel
//                     channel.edit({nsfw: !channel.nsfw})
//                     message.channel.send('Channel set to NSFW')
//                 }
//             }
//             if(args[0] === 'sfw'){
//                 if(message.channel.nsfw){
//                     let channel = message.channel
//                     channel.edit({nsfw: !channel.nsfw})
//                     message.channel.send('Channel set to SFW') 
//                 }else{
//                     message.reply('Channel is already SFW')
//                 }
//             }
//             break

//         case 'c':
//             if(!args[0]) return message.reply('specify number of messages to delete')
//                 message.channel.bulkDelete(args[0], true)
//             break

//         case 'create':
//                 if(!args[0]) return message.channel.send('specify a channel name')
//                 if(!args[1]) return message.channel.send('No category id specified')
//                 let category = args[1]
//                 let topic = args.slice(2)
//                 let channelDesc = topic.join(' ')
//                 message.guild.channels.create(args[0], {
//                     type: 'text'
//                 }).then((channel) =>{
//                     if(args[1]){
//                         channel.setParent(category),
//                         channel.setTopic(channelDesc)
//                     }
//                 })
//             break
//     }
// }

//     //search anime by name
//     function anime(name){
//         fetch('https://api.jikan.moe/v3/search/anime?q=' + name)
//         .then(res =>{
//             if(res.ok){
//                 return res.json()
//             }else{
//                 message.channel.send('looks like ran into some error')
//             }
//         }).then(data =>{
//             let result = data.results[0]
//             let dates = result.end_date
//             let sdates = result.start_date
//             let startDate = sdates.replace('T00:00:00+00:00', ' ')
//             let fdate = dates.replace('T00:00:00+00:00', ' ')
//             let embed = new MessageEmbed()
//             .setThumbnail(result.image_url)
//             .setURL(result.url)
//             .setTitle(result.title)
//             .addField('Descrption', result.synopsis, true)
//             // .addField('Score', result.score, true)
//             // .addField('Type', result.type, true)
//             // .addField('Rated', result.rated, true)
//             // .addField('Aired', `From: ${startDate} to ${fdate}`, true)
//             // .addField('Start date', startDate, true)
//             // .addField('Is Airing', result.airing, true)
//             .setColor('#0099ff')
//             .addFields(
//                 {name: 'Score', value: result.score, inline: true},
//                 {name:'Rated', value: result.rated, inline: true},
//                 {name:'Type', value: result.type, inline: true},
//                 {name:'Aired', value: `From: ${startDate} to ${fdate}`, inline: true},
//                 {name:'Airing', value: result.airing, inline: true}
//             )
//             // .setDescription(result.synopsis)
//             .setFooter(`Requested by: ${message.author.tag}`)

//             message.channel.send(embed)
//             // console.log(result)
//         })
//     }

//     //reminder function
//     function reminder(time, text){
//         let arg = text.join(' ')
//         let value = arg.replace(time, ' ')
//         console.log(value)
//         let id = message.author.id
//         setTimeout(() => {
//             message.channel.send(`<@${id}> reminder:${value}`)
//         }, time)
//     }


//     function getUserFromMention(mention){
//         if(!mention) return

//         if(mention.startsWith('<@') && mention.endsWith('>')){
//             mention = mention.slice(2, -1)
//             if(mention.startsWith('!')){
//                 mention = mention.slice(1)
//             }
//             return client.users.cache.get(mention)
//         }
//     }

//     if(message.content === 'delete message'){
//         message.channel.send('will be deleted after 10 seconds')
//         setInterval(() => {
//             message.delete()
//         }, 10000)
//     }

//     let randomText = ['Ok', 'Bye', 'No', 'Fuck off', 'Do not ping me', 'Bhag BSDK']
//     if(getUserFromMention(message.content) == 848806714605830174n){
//         message.reply(randomText[Math.floor(Math.random() * randomText.length)])
//     }
    
//     if(message.content === 'F' || message.content === 'f'){
//         message.channel.send(`<@${message.author.id}> has paid their respect`)
//     }

//     if(message.content === 'Hello'){
//         message.channel.send('hello there')
//     }

//         if(message.content === 'sned cat'){
//             fetch('https://api.thecatapi.com/v1/images/search')
//             .then(res =>{
//                 return res.json()
//             })
//             .then(data =>{
//                 let url = data[0].url
//                 message.channel.send(url)
//             })
//     }
// })

client.login(process.env.TOKEN)