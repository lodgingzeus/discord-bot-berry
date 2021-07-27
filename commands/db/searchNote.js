const Note = require('../../Schemas/noteSchema')

module.exports = {
    commands: ['note'],
    callback: async (message, args, text, Discord) =>{
        let noteName = args[0]
        let name = await Note.find({title: noteName})
        let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(name[0].title)
        .setDescription(name[0].note)

        message.channel.send(embed)
    }
}