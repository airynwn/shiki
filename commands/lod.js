const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const channels = ["7", "1", "1", "2", "3", "2, 3 y 6", "4, 5 y 7", "4, 5 y 6"];


// const channels = ["7", "1", "1", "2", "3", "2, 3 y 6", "4, 5 y 7", "4, 5 y 6"];
// let time = new Date();
// let hour = time.getHours();
// let min = time.getMinutes();
// let now = hour + ":" + (min > 10 ? min : "0" + min);
// let row = Math.floor(hour / 3);
// let nextLod = channels.findIndex((_, row) => row * 3 > hour) * 3;
// let lastLod = 3 * row;
// let hoursUntilNext = nextLod - hour - 1;
// let hoursPassed = hour - lastLod;
// let minsUntilNext = 60 - min;
// // !! TODO ARREGLAR QUE PASA SI LOS MINUTOS ACTUALES SON :00

// function getChannels(time) {
//     if (time == "current") {
//         return (channels[row].length > 1 ? " los canales " : " el canal ") + channels[row];
//     } else {
//         return (channels[row + 1].length > 1 ? " los canales " : " el canal ") + channels[row + 1];
//     }
// }

// function untilNext() {
//     return `Quedan ${hoursUntilNext} horas y ${minsUntilNext} minutos para el próximo LoD a las ${nextLod}:00 en ${getChannels("next")}.`;
// }

// function currentLod() {
//     if (hoursPassed >= 2) {
//         return "No hay LoD ahora mismo."
//     } else if (hoursPassed == 1)  {
//         return `Quedan ${minsUntilNext} minutos para que cierre LoD.`
//     } else {
//         return `Quedan ${minsUntilNext} minutos para que salga coco.`;
//     }
// }


// const lodEmbed = new EmbedBuilder()
// 	.setColor(14548736)
// 	.setTitle('Horarios de LoD')
// 	.setDescription(`Son las ${now}.`)
// 	.addFields(
// 		{ name: '\u200B', value: '\u200B' },
// 		{ name: 'Actual', value: hoursPassed < 2 ? `Hay LoD ahora mismo en ${getChannels("current")}. ${currentLod()}` : `(El próximo LoD es a las ${nextLod}:00 en ${getChannels("next")}. ${untilNext()}`, inline: true },
// 		{ name: 'Próximo', value: `${untilNext()}`, inline: true },
// 	)
// 	.setImage('https://cdn-longterm.mee6.xyz/plugins/embeds/images/628543142819528714/3e2963015e4118ab82c55bf85df0c4e8dfb34ef6737d8fa87c3df78df9a090ef.png')

// * ----------------------------- *

function createLodEmbed() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let now = hour + ":" + (min > 10 ? min : "0" + min);
    let row = Math.floor(hour / 3);
    let nextLod = channels.findIndex((_, row) => row * 3 > hour) * 3;
    let lastLod = 3 * row;
    let hoursUntilNext = nextLod - hour - 1;
    let hoursPassed = hour - lastLod;
    let minsUntilNext = 60 - min;
    // !! TODO ARREGLAR QUE PASA SI LOS MINUTOS ACTUALES SON :00

    function getChannels(time) {
        if (time == "current") {
            return (channels[row].length > 1 ? " los canales " : " el canal ") + channels[row];
        } else {
            return (channels[row + 1].length > 1 ? " los canales " : " el canal ") + channels[row + 1];
        }
    }

    function untilNext() {
        return `Quedan ${hoursUntilNext} horas y ${minsUntilNext} minutos para el próximo LoD a las ${nextLod}:00 en ${getChannels("next")}.`;
    }

    function currentLod() {
        if (hoursPassed >= 2) {
            return "No hay LoD ahora mismo."
        } else if (hoursPassed == 1)  {
            return `Quedan ${minsUntilNext} minutos para que cierre LoD.`
        } else {
            return `Quedan ${minsUntilNext} minutos para que salga coco.`;
        }
    }

    return new EmbedBuilder()
	.setColor(14548736)
	.setTitle('Horarios de LoD')
	.setDescription(`Son las ${now}.`)
	.addFields(
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Actual', value: hoursPassed < 2 ? `Hay LoD ahora mismo en ${getChannels("current")}. ${currentLod()}` : `(El próximo LoD es a las ${nextLod}:00 en ${getChannels("next")}. ${untilNext()}`, inline: true },
		{ name: 'Próximo', value: `${untilNext()}`, inline: true },
	)
	.setImage('https://cdn-longterm.mee6.xyz/plugins/embeds/images/628543142819528714/3e2963015e4118ab82c55bf85df0c4e8dfb34ef6737d8fa87c3df78df9a090ef.png')
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lod')
		.setDescription('Horarios de Lod'),
	async execute(interaction) {
		// await interaction.reply('https://cdn-longterm.mee6.xyz/plugins/embeds/images/628543142819528714/3e2963015e4118ab82c55bf85df0c4e8dfb34ef6737d8fa87c3df78df9a090ef.png');
        // await interaction.channel.send({embeds: [lodEmbed]});
        await interaction.channel.send({embeds: [createLodEmbed()]});
	},
};

// TODO son las X horas (españa), falta X para lod || esta lod activo?->falta X para coco->canal X