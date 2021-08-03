const { alphacoders, pikabu }  = require('awse')
module.exports = {
    commands: ['w', 'wall'],
    callback: (message, args, text, Discord) =>{
         if(!args[0]) return message.channel.send('Type anime name to look for')

         alphacoders.get({
             search: args.join(' '),
         }).then(d => {
             let images = []
             d.images.forEach(e =>{
                 e = e.replace('thumbbig-', '')
                 images.push(e)
             })
             message.channel.send(images[Math.floor(Math.random() * images.length)])
         })
    }
}