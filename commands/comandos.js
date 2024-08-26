const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('comandos')
		.setDescription('Comandos de Nostale'),
	async execute(interaction) {
		await interaction.reply('Test');
	},
};