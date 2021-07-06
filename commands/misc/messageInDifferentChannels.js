module.exports = {
    commands: ['talk'],
    callback: (message, args, text, Discord) =>{
        const channelId = args[0]
        if(message.guild.channels.cache.get(channelId) == undefined) return message.channel.send('Enter a valid id')
        let channel = message.guild.channels.cache.get(channelId)
        let messageText = args.join(' ')
        let newMessageText = messageText.replace(args[0], ' ')
        channel.send(newMessageText)
    }
}