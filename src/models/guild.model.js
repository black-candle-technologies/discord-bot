const { Schema, model } = require('mongoose');
const guildSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    guildId: { type: String, required: true },
    guildName: { type: String, required: true }
});

module.exports = model("Guild", guildSchema, "guilds");