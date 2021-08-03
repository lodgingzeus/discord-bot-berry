const mongoose = require('mongoose')

const { Schema } = mongoose
const warnSchema = new Schema({
        guildId: String,
        userID: String,
        warnsCount: Number,
        Punishments: Array
    })

module.exports = mongoose.model('Warns', warnSchema)