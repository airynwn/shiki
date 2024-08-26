const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ding')
		.setDescription('DINGDONG'),
	async execute(interaction) {
		await interaction.reply('DONG');
	},
};