const fetch = require('node-fetch')

module.exports = {
    commands: ['cat', 'catto', 'kitty'],
    callback: (message, args, text) =>{
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(res =>{
                return res.json()
            })
            .then(data =>{
                let url = data[0].url
                message.channel.send(url)
            })
    }
}