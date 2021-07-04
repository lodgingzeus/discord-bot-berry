module.exports = {
    commands: ['guess'],
    callback: (message, args, text, Discord) =>{
        const randomNumber = Math.floor(Math.random() * 20 + 1)
        console.log(randomNumber)
        let questionEmbed = new Discord.MessageEmbed()
        let tries = 4
        let guessHistory = []
        const filter = m => m.author.id === message.author.id
        message.channel.send(questionEmbed.setTitle('Guess a number between 1 and 20')).then((msg) =>{checkNumber(msg)})

        async function checkNumber(msg){
            await message.channel.awaitMessages(filter, {max: 1, time: 20 * 1000, error: ['time']})
            .then(answer =>{
                let guess = Number(answer.first().content)
                guessHistory.push(guess)
                console.log(guess)
                if(guess === randomNumber){
                    return message.channel.send('You guessed the number!')
                }else if(guess > randomNumber){
                    tries--
                    reduceTries()
                    return message.channel.send(`Your guess was too high!, You have ${tries} left`)
                }else if(guess < randomNumber){
                    tries--
                    reduceTries()
                    return message.channel.send(`Your guess was too low!, You have ${tries} left`)
                }
            })
        }

        function reduceTries(){
            if(tries === 0) return message.channel.send('You ran out of tries! Run the command again :p')
            checkNumber()
        }
    }
}