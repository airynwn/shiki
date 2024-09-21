const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tso')
		.setDescription('Calcula el coste y el beneficio del TSO elegido según el tiempo o las veces que quieras hacerlo'),
	async execute(interaction) {
		await interaction.reply('DONG');
	},
};