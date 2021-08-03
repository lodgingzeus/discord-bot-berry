const fetch = require('node-fetch')

module.exports = {
    commands: ['anime', 'a'],
    expectedArgs: '<anime name>',
    minArgs: 1,
    callback: (message, args, text, Discord) =>{
        fetch('https://api.jikan.moe/v3/search/anime?q=' + text)
        .then(res =>{
            if(res.ok){
                return res.json()
            }else{
                message.channel.send('looks like ran into some error')
            }
        }).then(data =>{
            let result = data.results[0]
            let dates = result.end_date
            let sdates = result.start_date
            let startDate = sdates.replace('T00:00:00+00:00', ' ')
            let fdate = dates.replace('T00:00:00+00:00', ' ')
            let embed = new Discord.MessageEmbed()
            .setThumbnail(result.image_url)
            .setURL(result.url)
            .setTitle(result.title)
            .addField('Descrption', result.synopsis, true)
            // .addField('Score', result.score, true)
            // .addField('Type', result.type, true)
            // .addField('Rated', result.rated, true)
            // .addField('Aired', `From: ${startDate} to ${fdate}`, true)
            // .addField('Start date', startDate, true)
            // .addField('Is Airing', result.airing, true)
            .setColor('#0099ff')
            .addFields(
                {name: 'Score', value: result.score, inline: true},
                {name:'Rated', value: result.rated, inline: true},
                {name:'Type', value: result.type, inline: true},
                {name:'Aired', value: `From: ${startDate} to ${fdate}`, inline: true},
                {name:'Airing', value: result.airing, inline: true}
            )
            // .setDescription(result.synopsis)
            .setFooter(`Requested by: ${message.author.tag}`)

            message.channel.send(embed)
            // console.log(result)
        })
    }
}
