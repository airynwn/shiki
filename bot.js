const fs = require('node:fs');
const path = require('node:path');
// discord.js classes
require("dotenv").config(); //to start process from .env file
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands'); // builds a path to commands directory
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// message when client is ready. c parameter keeps it separate from client
client.once(Events.ClientReady, c => { // node bot.js
    console.log(`Ready! Logged in as ${c.user.tag}`);
})

// command handling: receiving command interactions
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.TOKEN);
