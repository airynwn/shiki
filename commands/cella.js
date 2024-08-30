const { SlashCommandBuilder } = require('discord.js');

const vial = 500;
let gillion;
let gillionCount;
let cella;

function gillionProfit(gillion, gillionCount) {
    return gillion * gillionCount;
}

function cellaProfit(gillionCount, cella, cellaPerVial) {
    return gillionCount * cella * cellaPerVial - gillionCount * 500
}

function xOverY(gillion, gillionCount, cella) {
    let profit = {
        "Cella": gillionCount * cella * 7 - gillionCount * 500,
        "Gillion": gillion * gillionCount
    };
    let res = Object.keys(profit).reduce((x, y) => { return profit[x] > profit[y] ? x : y });
    return `Renta más vender ${res} por una diferencia de ${Math.abs(gillionProfit - cellaProfit)}.\n
    Beneficio total (Gillion): ${gillionProfit}\n
    Beneficio total (Cella, asumiendo 7 por gillion): ${cellaProfit}`
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cella')
		.setDescription('Calcula la rentabilidad de vender cella y gillion según el precio indicado y determina cuál es más rentable.')
        .addStringOption(option =>
            option.setName('gillion')
                .setDescription('Precio del Gillion'))
                .setRequired(true)
        .addStringOption(option =>
            option.setName('gillionCount')
                .setDescription('Cantidad de Gillion en el inventario'))
                .setRequired(true)
        .addStringOption(option =>
            option.setName('cella')
                .setDescription('Precio de la Cella'))
                .setRequired(true),
	async execute(interaction) {
		await interaction.reply(xOverY(gillion, gillionCount, cella));
	},
};