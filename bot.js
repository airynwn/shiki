const fs = require('node:fs');
const path = require('node:path');
// discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// COMMAND HANDLING - load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands'); // builds a path to commands directory
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// EVENT HANDLING - retrieving event files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);
