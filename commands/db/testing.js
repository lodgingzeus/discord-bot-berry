const Note = require('../../Schemas/noteSchema')

module.exports = {
    commands: 'save',
    expectedArgs: '<note Name> <note Description>',
    minArgs: 2,
    callback: async (message, args, Discord) => {
        try{
            const noteName = args[0]
            const noteDesc = args.join(' ').replace(args[0], '')
            const newNote = await Note.create({
                title: noteName,
                note: noteDesc
            })
            message.channel.send(`Note - ${noteName} saved successfully`)
        }catch (err){
            console.log(err)
            return message.channel.send('Error while saving note')
        }
    }
}