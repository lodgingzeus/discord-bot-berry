const Note = require('../../Schemas/noteSchema')

module.exports = {
    commands: ['cln'],
    expectedArgs: '<Note Name>',
    minArgs: 1, 
    callback: async (message, args, Discord) =>{
        let noteName = args.join(' ')
        let reg = `^${noteName}$`
        let noteRegex = new RegExp(reg, 'gi')
        try{
            let noteData = await Note.findOne({
                title: noteRegex,
            })

            if(noteData){
                noteData.delete()
                return message.channel.send(`Note **${noteName}** deleted successfully!`)
            }else if(!noteData){
                return message.channel.send('No note found with that name')
            }
            
        }catch (err){
            console.log(err)
            message.channel.send('Error while deleting note')
        }
    }
}