module.exports = {
    commands: 'say',
    minArgs: 1,
    callback: (message, args, text) =>{
        message.delete().catch(err => console.log(err))
        message.channel.send(text)
    },
    requiredRoles: ['MODERATOR', 'ADMIN']
}