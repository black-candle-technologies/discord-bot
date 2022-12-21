const { Schema, model } = require('mongoose');
const getRandomNumber = require('../functions/tools/generateTicketId');

const categorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    categoryId: { type: String, default: getRandomNumber(10) },
    guildId: { type: String, required: true },
    tickets: [{
        ticketId: { type: String, required: true }
    }],
});

module.exports = model("Category", categorySchema, "categories");