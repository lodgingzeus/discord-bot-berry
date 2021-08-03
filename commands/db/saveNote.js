const Note = require('../../Schemas/noteSchema')

module.exports = {
    commands: 'save',
    expectedArgs: '<note Name> <note Description>',
    minArgs: 2,
    callback: async (message, args, Discord) => {
        try{
            const noteName = args[0]
            const noteDesc = args.join(' ').replace(args[0], '')
            let noteData = await Note.findOne({
                title: noteName,
            })

            if(noteData){
                noteData.note = noteDesc
                noteData.save()
                return message.channel.send('Note already exists, updated the note with new description')
            }else if(!noteData){
                const newNote = new Note({
                    title: noteName,
                    note: noteDesc
                })
                newNote.save()
                message.channel.send(`Note - **${noteName}** saved successfully, access the note using !note ${noteName}`)
            }
        }catch (err){
            console.log(err)
            return message.channel.send('Error while saving note')
        }
    }
}