module.exports = {
    commands: 'password',
    callback: (message, args, text) =>{
            let length = 10
            let charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*'
            let result = ''
            for(let i = 0, n = charSet.length; i <length; i++){
                result += charSet.charAt(Math.floor(Math.random() * n))
            }
            message.channel.send(`Randomly generated password for you: ${result}`)
    }
}