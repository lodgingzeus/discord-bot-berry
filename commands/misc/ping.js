module.exports = {
    commands : 'ping',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, args, text) =>{
        message.channel.send('Pinging....').then(msg =>{
            msg.edit(`Pong! ${msg.createdTimestamp - message.createdTimestamp}ms`)
        })
    }
}