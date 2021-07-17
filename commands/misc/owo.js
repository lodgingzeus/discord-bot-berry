module.exports = {
    commands: ['owo',],
    callback: (message, args, text, Discord) =>{
        message.channel.send(text.replace(/[aeiou]/gi, 'y'))
    }
}