module.exports = {
    commands: ['take', 'g'],
    callback: async (message, args, text, Discord) =>{
        //assign role with role name
        let roleName = message.guild.roles.cache.find(role => role.name === args[1])
        let roleId = message.guild.roles.cache.find(role => role.id === args[1])
        let userMentioned = message.mentions.members.first()
        let userId = message.guild.members.cache.find(user => user.id === args[0])
        message.channel.send()
        userId.roles.add(roleId)
        message.delete()
    }
}