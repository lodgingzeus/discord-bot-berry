module.exports = {
    commands: ['take', 'g'],
    callback: async (message, args, text, Discord) =>{
        message.channel.send('> hello')
    }
}