module.exports = {
    commands: 'delete',
    callback: (message, args, text) =>{
        if(!args[0]) return message.channel.send('Define a channel id')
        let channelId = args[0]
        let fetchedChannels = message.guild.channels.cache.get(channelId)
        fetchedChannels.delete()
    }
}