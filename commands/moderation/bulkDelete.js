module.exports = {
    commands: ['c', 'clear', 'cl'],
    expectedArgs: '<number of messages to delete>',
    minArgs: 1,
    callback: (message, args, text, Discord) =>{
        message.channel.bulkDelete(args[0], true)
    }
}