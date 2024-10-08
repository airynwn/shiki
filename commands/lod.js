const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const channels = ["7", "1", "1", "2", "3", "2, 3 y 6", "4, 5 y 7", "4, 5 y 6"];

function untilNext(min, hour) {   
    let hoursUntilNext = 2 - (hour % 3)
    let minsUntilNext = 60 - min;

    if (minsUntilNext == 60) {
        minsUntilNext = 0;
        hoursUntilNext = hoursUntilNext + 1;
    }

    return `Quedan ${hoursUntilNext} hora${hoursUntilNext == 1 ? "" : "s"} y ${minsUntilNext} minuto${minsUntilNext == 1 ? "" : "s"} para el próximo LoD.`;
}

function currentLod(min, hour) {
    const hoursPassed = hour % 3;
    const minsUntilNext = 60 - min;

    if (hoursPassed == 2) {
      return "No hay LoD ahora mismo.";
    } else if (hoursPassed == 1) { 
      return `Quedan ${minsUntilNext} minutos para que cierre LoD.`;
    } else {
      return `Quedan ${minsUntilNext} minutos para que salga coco.`;
    }
}

function getChannels(time, hour) {
    const row = Math.floor(hour / 3);
    
    if (time == "current") {
        return (channels[row].length > 1 ? " los canales " : " el canal ") + channels[row];
    } else {
        return (channels[(row + 1) % channels.length].length > 1 ? " los canales " : " el canal ") + channels[(row + 1) % channels.length];
    }
}

function createLodEmbed(interaction) {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let now = hour + ":" + (min >= 10 ? min : "0" + min);
    let hoursPassed = hour % 3;
    const nextLod = (hour + 3 - (hour % 3)) % 24; 

    return new EmbedBuilder()
	.setColor(14548736)
	.setTitle('Horarios de LoD')
	.setDescription(`Hola, ${interaction.user}. Son las ${now}.`)
	.addFields(
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Actual', value: hoursPassed < 2 ? `Hay LoD ahora mismo en ${getChannels("current", hour)}. ${currentLod(min, hour)}` : `El próximo LoD es a las ${nextLod}:00 en ${getChannels("next", hour)}.`, inline: true },
		{ name: 'Próximo', value: `${untilNext(min, hour)}`, inline: true },
	)
	.setImage('https://cdn-longterm.mee6.xyz/plugins/embeds/images/628543142819528714/3e2963015e4118ab82c55bf85df0c4e8dfb34ef6737d8fa87c3df78df9a090ef.png')
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lod')
		.setDescription('Horarios de Lod'),
	async execute(interaction) {
        await interaction.reply({embeds: [createLodEmbed(interaction)]});
	},
};
