const fetch = require('node-fetch')

module.exports = {
    commands: ['inspire', 'quote'],
    callback: (message, args, text, Discord) =>{
        fetch('https://zenquotes.io/api/random/fef9b7906de05b56873a727eb493856ae690e866')
        .then(res =>{
            if(res.ok){
                return res.json()
            }else {
                console.log('error')
            }
        })
        .then(data =>{
                let quote = data[0]
                let embed = new Discord.MessageEmbed()
                .setTitle('Be Inspired!')
                .setColor('#a83c32')
                .setDescription(`"${quote.q}" - ${quote.a}`)
    
                message.channel.send(embed)
                // message.channel.send(`"${quote.q}" - ${quote.a}`)
        })
    }
}