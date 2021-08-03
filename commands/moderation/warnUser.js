const punishments = require('../../Schemas/warningsSchema')
module.exports = {
    commands: 'warn',
    callback: async (message, args, text, Discord, client) =>{
        let userToWarn = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0])
        if(userToWarn == undefined) return message.reply('No user found')
        let toWarn = userToWarn.user
        let reason = (!args[1]) ? 'No reason was provided' : args.join(' ').replace(args[0], '')
        let warnData = await punishments.findOne({
            guildId: message.guild.id,
            userID: toWarn.id
        })

        if(warnData){
            let warns = warnData.warnsCount
            warnUser(toWarn, warns, warnData)
        }else if(!warnData){
            let warns = 0
            let newWarnData = new punishments({
                guildId: message.guild.id,
                userID: toWarn.id,
                warnsCount: warns,
                Punishments: [],
            })
            warnUser(toWarn, warns, newWarnData)
        }

        function warnUser(user, numberOfWarns, data){
            numberOfWarns++
            let embed = new Discord.MessageEmbed()
            .setColor('#c22f45')
            .setThumbnail(user.avatarURL())
            .addFields(               
                { name: 'Action Taken', value: 'Warn' },
                { name: 'User Affected', value: `${user.username} (${user.id})`},
                { name: 'Reason', value: reason },
                { name: 'Channel', value: `<#${message.channel.id}>`},
                { name: 'Warning count', value: numberOfWarns},
            )
            message.channel.send(`<@${user.id}>, You have recieved a warning`).then(em =>{
                message.channel.send(embed).then(e =>{
                    sendDmOfWarning(user.id, numberOfWarns)
                })
            })
            data.warnsCount++
            data.Punishments.unshift({
                Type: 'Warn',
                reason: reason,
                actionTakenBy: message.author.id
            })
            data.save()
        }

        function sendDmOfWarning(user, numberOfWarns){
            let dmWarnEmbed = new Discord.MessageEmbed()
            .setColor('#c20808')
            .setTitle(`You have received a warning, Warn count - ${numberOfWarns}`)
            .addField('Reason', reason)
            .addField('Server', message.guild.name)
            message.guild.members.cache.get(user).send(dmWarnEmbed)
        }
    }
}