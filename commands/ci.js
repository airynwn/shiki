const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function createCiEmbed(interaction) {
    return new EmbedBuilder()
	.setColor(14548736)
	.setTitle('Horarios de CI')
	.setDescription(`Hola, ${interaction.user}. Estos son los horarios de CI.`)
	.setImage('https://i.imgur.com/ZNIjnRK.png')
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ci')
		.setDescription('Horarios de CI'),
	async execute(interaction) {
        await interaction.reply({embeds: [createCiEmbed(interaction)]});
	},
};
