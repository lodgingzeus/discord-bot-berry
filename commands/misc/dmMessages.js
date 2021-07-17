module.exports = {
    commands: ['test'],
    callback: (message, args, text, Discord) =>{
        const user = message.guild.users.cache.find(usr => usr.id === args[0])
        user.send('hello there')
    }
}