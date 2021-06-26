
module.exports = {
    commands: ['test'],
    expectedArgs: '<channel name>, <category id>',
    // minArgs: 2,
    callback: (message, args, text, Discord) =>{
        let collectedInfo = []
        let isNsfw
            const question = [
                'What do you want to name the channel?',
                'Specify the category ID',
                'Marks the channel sfw or nsfw',
                'Enter channel description'
            ]
            let counter = 0

            const filter = m => m.author.id === message.author.id

            const collector = new Discord.MessageCollector(message.channel,filter, {
                max: question.length,
                time: 1000 * 30
            })

            message.channel.send(question[counter++])
            collector.on('collect', m =>{
                if(counter < question.length){
                   m.channel.send(question[counter++])
                }
            })

            collector.on('end', (collected) =>{
                console.log(`collected ${collected.size} messages`)

                if(collected.size < question.length){
                    message.reply('Failed to get all required arguments, terminating process')
                    return
                }

                collected.forEach(value =>{
                    collectedInfo.push(value.content)
                })
                if(message.guild.channels.cache.get(collectedInfo[1]) === undefined) return message.channel.send('Really bruh? enter a valid id')
                if(collectedInfo[2] === 'sfw'){
                    isNsfw = false
                }else if(collectedInfo[2] === 'nsfw'){
                    isNsfw = true
                }else{
                    return message.channel.send(`You didn't define nsfw or sfw, terminated the process now fuck off`)
                }
                message.guild.channels.create(collectedInfo[0], {
                    type: 'text',
                    nsfw: isNsfw
                }).then((channel) =>{
                    channel.setParent(collectedInfo[1])
                    channel.setTopic(collectedInfo[3])
                })
                message.channel.send('Channel created')
            })
        //     if(args[0] === 'test'){
        //         message.channel.send('See or Change')
        //         const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {time: 10000})
        //         console.log(collector)
        //         collector.on('collect', message =>{
        //             if(message.content === 'see'){
        //                 message.channel.send('You want to see it ok')
        //             }else if(message.content === 'change'){
        //                 message.channel.send('You want it to be changed')
        //             }else{
        //                 message.channel.send('Invalid response, turning off')
        //             }
        //         })
        //     }
        // }
    //     if(!args[0]) return message.channel.send('specify a channel name')
    //             let category = args[1]
    //             let topic = args.slice(2)
    //             let channelDesc = topic.join(' ')
    //             message.guild.channels.create(args[0], {
    //                 type: 'text'
    //             }).then((channel) =>{
    //                 if(args[1]){
    //                     channel.setParent(category),
    //                     channel.setTopic(channelDesc)
    //                 }
    //             })
    // },
    // requiredRoles: ['MODERATOR'],
    }}