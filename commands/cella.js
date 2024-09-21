const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const vial = 500;

function gillionProfit(gillion, gillionCount) {
    return gillion * gillionCount;
}

function cellaProfit(gillionCount, cella, cellaPerVial) {
    return gillionCount * cella * cellaPerVial - gillionCount * vial;
}

function xOverY(gillion, gillionCount, cella) {
    let profit = {
        "Cella": gillionCount * cella * 7 - gillionCount * vial,
        "Gillion": gillion * gillionCount
    };
    let gillionProfit = profit["Gillion"];
    let cellaProfit = profit["Cella"];
    let res = Object.keys(profit).reduce((x, y) => { return profit[x] > profit[y] ? x : y });
    return `Renta más vender ${res} por una diferencia de ${Math.abs(gillionProfit - cellaProfit)}.\nBeneficio total (Gillion): ${gillionProfit}\nBeneficio total (Cella, asumiendo 7 por gillion): ${cellaProfit}`
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cella')
		.setDescription('Calcula la rentabilidad de vender cella y gillion.')
        .addStringOption(option =>
            option.setName('gillion')
                .setDescription('Precio del Gillion')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('cella')
                .setDescription('Precio de la Cella')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('gillion_count')
                .setDescription('Cantidad de Gillion en el inventario')
                .setRequired(true)),
	async execute(interaction) {
        let gillion = interaction.options.getString('gillion');
        let gillionCount = interaction.options.getString('gillion_count');
        let cella = interaction.options.getString('cella');
		await interaction.reply(xOverY(gillion, gillionCount, cella));
	},
};