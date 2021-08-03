module.exports = {
    commands: ['create'],
    callback: async (message, args, text, Discord) =>{
        message.delete()
        let collectedInfo = []
        let isNsfw
        let embed = new Discord.MessageEmbed()
            const questions = [
                'What do you want to name the channel?',
                'Specify the category ID',
                'Mark the channel sfw or nsfw',
                'Enter channel description'
            ]
            let counter = 0
            const filter = m => m.author.id === message.author.id
                message.channel.send(embed.setTitle(questions[counter++])).then(async msg =>{
                    try {
                        await message.channel.awaitMessages(filter, {max:1, time: 5000, error: ['time']})
                    .then(ms =>{
                        console.log(ms.first().content)
                        collectedInfo.push(ms.first().content)
                        ms.first().delete()
                    })
                    } catch (error) {
                        console.log(error)
                        return message.reply('Time is up')
                    }
                    msg.edit(embed.setTitle(questions[counter++])).then(async msg2 =>{
                        try {
                            await message.channel.awaitMessages(filter, {max:1, time: 5000, error: ['time']})
                        .then(ms =>{
                            console.log(ms.first().content)
                            collectedInfo.push(ms.first().content)
                            ms.first().delete()
                        })
                        } catch (error) {
                            console.log(error)
                            return message.reply('Time is up')
                        }msg2.edit(embed.setTitle(questions[counter++])).then(async msg3 =>{
                            try {
                                await message.channel.awaitMessages(filter, {max:1, time: 5000, error: ['time']})
                            .then(ms =>{
                                console.log(ms.first().content)
                                collectedInfo.push(ms.first().content)
                                ms.first().delete()
                            })
                            } catch (error) {
                                console.log(error)
                                return message.reply('Time is up')
                            }msg3.edit(embed.setTitle(questions[counter++])).then(async msg4 =>{
                                try {
                                    await message.channel.awaitMessages(filter, {max:1, time: 5000, error: ['time']})
                                .then(ms =>{
                                    console.log(ms.first().content)
                                    collectedInfo.push(ms.first().content)
                                    ms.first().delete()
                                })
                                } catch (error) {
                                    console.log(error)
                                    return message.reply('Time is up')
                                }
                                if(message.guild.channels.cache.get(collectedInfo[1]) === undefined) return message.channel.send('Really bruh? enter a valid id').then(msg => msg.delete({timeout: 5000}))
                                if(collectedInfo[2] === 'sfw'){
                                    isNsfw = false
                                }else if(collectedInfo[2] === 'nsfw'){
                                    isNsfw = true
                                }else{
                                    return message.channel.send(`You didn't define nsfw or sfw, terminated the process now fuck off`).then(msg => msg.delete({timeout: 5000}))
                                }
                                message.guild.channels.create(collectedInfo[0], {
                                    type: 'text',
                                    nsfw: isNsfw
                                }).then((channel) =>{
                                    channel.setParent(collectedInfo[1])
                                    channel.setTopic(collectedInfo[3])
                                })
                                msg4.edit(embed.setTitle('Channel Created')).then(msg => {msg.delete({timeout: 1000 * 10})})
                            })
                        })
                    })
                })
                

            // message.channel.send(embed.setTitle(questions[counter++])).then(async msg =>{
            //      await message.channel.awaitMessages(filter, {max :1 ,time: 5000, error: ['time']})
            //     .then(ms =>{
            //         console.log(ms.first().content)
                    // collectedInfo.push(ms.first().content)
                    // ms.first().delete()
            //     })
                // msg.edit(embed.setTitle(questions[counter++]))
                // .then(async msg2 =>{
                // await message.channel.awaitMessages(filter, {max :1 ,time: 5000, error: ['time']})
                // .then(ms =>{
                //     console.log(ms.first().content)
                //     collectedInfo.push(ms.first().content)
                //     ms.first().delete()
                // })
            //     .catch(err => {return message.channel.send('Time out')})
            //     msg2.edit(embed.setTitle(questions[counter++]))
            //     .then(async msg3 =>{
            //     await message.channel.awaitMessages(filter, {max :1 ,time: 5000, error: ['time']})
            //     .then(ms =>{
            //         console.log(ms.first().content)
            //         collectedInfo.push(ms.first().content)    
            //         ms.first().delete()
            //     })
            //     .catch(err => {return message.channel.send('Time out')})
            //     msg3.edit(embed.setTitle(questions[counter++]))
            //     .then(async msg4 =>{
            //     await message.channel.awaitMessages(filter, {max:1, time: 5000, error: ['time']})
            //         .then(ms =>{
            //             console.log(ms.first().content)
            //             collectedInfo.push(ms.first().content)
            //             ms.first().delete()
            //         })
                // if(message.guild.channels.cache.get(collectedInfo[1]) === undefined) return message.channel.send('Really bruh? enter a valid id')
                // if(collectedInfo[2] === 'sfw'){
                //     isNsfw = false
                // }else if(collectedInfo[2] === 'nsfw'){
                //     isNsfw = true
                // }else{
                //     return message.channel.send(`You didn't define nsfw or sfw, terminated the process now fuck off`)
                // }
                // message.guild.channels.create(collectedInfo[0], {
                //     type: 'text',
                //     nsfw: isNsfw
                // }).then((channel) =>{
                //     channel.setParent(collectedInfo[1])
                //     channel.setTopic(collectedInfo[3])
                // })
                // msg4.edit(embed.setTitle('Channel Created')).then(msg => {msg.delete({timeout: 1000 * 10})})
            //     })
            //     })
            //     })
            // })
    // requiredRoles: ['MODERATOR'],
  }
}