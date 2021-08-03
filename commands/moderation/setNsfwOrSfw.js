module.exports ={
    commands: 'set',
    expectedArgs: 'Nsfw or Sfw',
    callback: (message, args, text) =>{
        if(args[0] === 'nsfw'){
             if(message.channel.nsfw){
                    message.reply('Channel is already NSFW')
            }else{
                let channel = message.channel
                channel.edit({nsfw: !channel.nsfw})
                message.channel.send('Channel set to NSFW')
             }
        }
        if(args[0] === 'sfw'){
             if(message.channel.nsfw){
                 let channel = message.channel
                 channel.edit({nsfw: !channel.nsfw})
                 message.channel.send('Channel set to SFW') 
             }else{
                 message.reply('Channel is already SFW')
            }
         }
    }
}