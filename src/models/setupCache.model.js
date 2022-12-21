const Tickets = require("./ticket.model");
const { Schema, model } = require("mongoose");

generateTicketId = () => {
  let randomNumber = getRandomNumber(10);
  let exists = Tickets.exists({
    ticketId: randomNumber,
  });

  while (exists) {
    randomNumber = getRandomNumber(10);
    exists = Tickets.exists({
      ticketId: randomNumber,
    });
  }

  return randomNumber;
};

getRandomNumber = (length) => {
  let number = Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
  return number.toString();
};

const setupCacheSchema = new Schema({
  _id: Schema.Types.ObjectId,
  ticketId: { type: String, default: generateTicketId() },
  owner: { type: String, required: true },
  ticketType: { type: String, required: true },
  inProgress: { type: Boolean, default: true },
  embedChannel: { type: String, required: false },
  embedTitle: { type: String, required: false },
  embedText: { type: String, required: false },
  buttonText: { type: String, required: false },
  supportRole: { type: String, required: false },
  openCategory: { type: String, required: false },
  closedCategory: { type: String, required: false },
  openMessage: { type: JSON, required: false },
});

module.exports = model("SetupCache", setupCacheSchema, "cache");
