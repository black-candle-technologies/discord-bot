module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Logged in with user ${client.user.tag}`);
  },
};
