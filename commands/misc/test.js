module.exports = {
    commands: ['take', 'g'],
    callback: async (message, args, text, Discord) =>{
        if(args[0] === 'inv'){
            user.setStatus('invisible')
        }
    }
}