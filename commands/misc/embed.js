module.exports = {
    commands: 'embed',
    expectedArgs: '<text>',
    callback: (message, args, text, Discord) =>{
        message.delete().catch(err => console.log(err))
        let embed = new Discord.MessageEmbed()
        .setDescription(text)
        .setColor('#7289da')
        message.channel.send(embed)
    }
}