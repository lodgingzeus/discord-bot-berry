const punishments = require('../../Schemas/warningsSchema')

module.exports = {
    commands: 'cwarns',
    callback: async (message, args, text, Discord, client) =>{
        let userToCheckFor = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0])
        let warnData = await punishments.findOne({
            guildId: message.guild.id,
            userID: userToCheckFor.user.id
        })

        if(warnData){
            let length = warnData.Punishments.length
            let numberOfWarns = warnData.warnsCount
            let msg = `User has been warned ${numberOfWarns} times \nReasons: `
            for(let i = 0; i < length; i++){
                msg += `\nWarning ${i + 1}: ${warnData.Punishments[i].reason}\n`
            }
            message.channel.send(msg)
        }else if(!warnData){
            return message.channel.send('User has not been warned yet')
        }
    }
}