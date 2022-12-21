const { Schema, model } = require("mongoose");
const ticketSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  ticketId: { type: String, required: true },
  guildId: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, required: true },
  type: { type: String, required: true }
});

module.exports = model("Ticket", ticketSchema, "tickets");
