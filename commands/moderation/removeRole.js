module.exports = {
    commands: ['take'],
    expectedArgs: `<mention user or user id>, <role id or role name>`,
    minArgs: 2,
    maxArgs: 2,
    callback: (message, args, text, Discord) =>{
        message.delete()
        let userByMention = message.mentions.members.first()
        let role = args[1]
        let roleByName= message.guild.roles.cache.find(r => r.name === role)
        let roleById = message.guild.roles.cache.find(r => r.id === role)
        let userById = message.guild.members.cache.find(member => member.id === args[0])
        if(roleByName === undefined && roleById === undefined){
            message.channel.send('enter valid name or id')
        }else if(roleByName === undefined && roleById !== undefined){
            giveRole(roleById)
        }else if(roleById === undefined && roleByName !== undefined){
            giveRole(roleByName)
        }

       function giveRole(role){
           if(userByMention !== undefined){
               userByMention.roles.remove(role)
           }else if(userByMention === undefined && userById !== undefined){
            userById.roles.remove(role)
           }else if(userById === undefined){
               return message.channel.send('user is not in this guild or does not exist')
           }
       }
    },
    permissions: ['MANAGE_ROLES']
}