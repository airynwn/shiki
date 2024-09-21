const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
// const upgradeStats = require('data.js');
const upgradeStats = {
    upgrades: {
        1: {
            gold: 200000,
            full_moon: 1,
            angels_feather: 3,
            soul: 2,
            success: 0.80,
            destruction: 0,
            failure: 0.20
        },
        2: {
            gold: 200000,
            full_moon: 3,
            angels_feather: 5,
            soul: 4,
            success: 0.75,
            destruction: 0,
            failure: 0.25
            
        },
        3: {
            gold: 200000,
            full_moon: 5,
            angels_feather: 8,
            soul: 6,
            success: 0.70,
            destruction: 0.05,
            failure: 0.25
        },
        4: {
            gold: 200000,
            full_moon: 7,
            angels_feather: 10,
            soul: 8,
            success: 0.60,
            destruction: 0.10,
            failure: 0.30
        },
        5: {
            gold: 200000,
            full_moon: 10,
            angels_feather: 15,
            soul: 10,
            success: 0.50,
            destruction: 0.15,
            failure: 0.35
            },
        6: {
            gold: 500000,
            full_moon: 12,
            angels_feather: 20,
            soul: 1,
            success: 0.40,
            destruction: 0.20,
            failure: 0.40
        },
        7: {
            gold: 500000,
            full_moon: 14,
            angels_feather: 25,
            soul: 2,
            success: 0.35,
            destruction: 0.25,
            failure: 0.40
        },
        8: {
            gold: 500000,
            full_moon: 16,
            angels_feather: 30,
            soul: 3,
            success: 0.30,
            destruction: 0.30,
            failure: 0.40
        },
        9: {
            gold: 500000,
            full_moon: 18,
            angels_feather: 35,
            soul: 4,
            success: 0.25,
            destruction: 0.35,
            failure: 0.40
        },
        10: {
            gold: 500000,
            full_moon: 20,
            angels_feather: 40,
            soul: 5,
            success: 0.20,
            destruction: 0.40,
            failure: 0.40
        },
        11: {
            gold: 1000000,
            full_moon: 22,
            angels_feather: 45,
            soul: 1,
            success: 0.10,
            destruction: 0.45,
            failure: 0.45
        },
        12: {
            gold: 1000000,
            full_moon: 24,
            angels_feather: 50,
            soul: 2,
            success: 0.07,
            destruction: 0.50,
            failure: 0.43
        },
        13: {
            gold: 1000000,
            full_moon: 26,
            angels_feather: 55,
            soul: 3,
            success: 0.05,
            destruction: 0.55,
            failure: 0.40
        },
        14: {
            gold: 1000000,
            full_moon: 28,
            angels_feather: 60,
            soul: 4,
            success: 0.03,
            destruction: 0.60,
            failure: 0.37
        },
        15: {
            gold: 1000000,
            full_moon: 30,
            angels_feather: 70,
            soul: 5,
            success: 0.15,
            destruction: 0.70,
            failure: 0.285
        },
        16: {
            gold: 1250000,
            full_moon: 32,
            angels_feather: 80,
            soul: 2,
            success: 0.12,
            destruction: 0.70,
            failure: 0.288
        },
        17: {
            gold: 1500000,
            full_moon: 34,
            angels_feather: 90,
            soul: 4,
            success: 0.1,
            destruction: 0.70,
            failure: 0.29
        },
        18: {
            gold: 1750000,
            full_moon: 36,
            angels_feather: 100,
            soul: 6,
            success: 0.08,
            destruction: 0.75,
            failure: 0.242
        },
        19: {
            gold: 2000000,
            full_moon: 38,
            angels_feather: 110,
            soul: 8,
            success: 0.06,
            destruction: 0.80,
            failure: 0.194
        },
        20: {
            gold: 2250000,
            full_moon: 40,
            angels_feather: 120,
            soul: 10,
            success: 0.04,
            destruction: 0.80,
            failure: 0.196
        }
    }
};

let currentUpgrade = 0;
let gold = 0;
let full_moon = 0;
let angels_feather = 0;
let soul = [0, 0, 0, 0];
let scrolls = 0;

function setCurrentUpgrade(currentUpgradeSetter) {
    currentUpgrade = currentUpgradeSetter;
}

function upgradeCost(start) {
    const nextUpgrade = upgradeStats["upgrades"][start + 1];
    gold += nextUpgrade["gold"];
    full_moon += nextUpgrade["full_moon"];
    angels_feather += nextUpgrade["angels_feather"];

    if (start <= 5) {
        soul[0] += nextUpgrade["soul"];
    } else if (start <= 10) {
        soul[1] += nextUpgrade["soul"];
    } else if (start <= 15) {
        soul[2] += nextUpgrade["soul"];
    } else {
        soul[3] += nextUpgrade["soul"];
    }

    if (start >= 5) {
        scrolls += 1;
    }
}

function upgradeSP(start) {
    const nextUpgrade = upgradeStats["upgrades"][start + 1];
    let random = Math.random();
    let prob = 0;

    if (random < prob + nextUpgrade["success"]) {
        setCurrentUpgrade(start + 1);
        upgradeCost(start)
        console.log(random + " ha subidooooo oleeeeee");
        return "exito";
    }

    prob += nextUpgrade["success"];

    if (random < prob + nextUpgrade["failure"]) {
        console.log(random + " ha fallao...");
        upgradeCost(start)
        return "ha fallao";
    }

    console.log(random + " se ha roto...");
    upgradeCost(start)
    return "se ha roto...";
}

// function createUpgradeEmbed(interaction, start = 0, gold = 0, full_moon = 0, angels_feather = 0, soul = [0, 0, 0, 0], scrolls = 0) {
function createUpgradeEmbed(interaction, start = 0) {
    // console.log(start)
    const nextUpgrade = upgradeStats["upgrades"][start + 1];
    // let titulo = upgrade(start);
    // setCurrentUpgrade(start + 1);
    return new EmbedBuilder()
	.setColor(14548736)
	// .setTitle('Simulador de optimización de SP')
    .setTitle('Optimización de SP')
	.setDescription(`Hola, ${interaction.user}. Tu SP es +${start} actualmente.`)
	.addFields(
        { name: 'Próxima optimización', value: 'Materiales necesarios para optimizar tu SP' },
		{ name: 'Oro', value: `${nextUpgrade["gold"]}`, inline: true },
		{ name: 'Lunas', value: `${nextUpgrade["full_moon"]}`, inline: true },
		{ name: 'Plumas', value: `${nextUpgrade["angels_feather"]}`, inline: true },
		{ name: 'Almas', value: `${nextUpgrade["soul"]}`, inline: true },
        { name: 'Éxito', value: `${nextUpgrade["success"] * 100}%`, inline: true },
		{ name: 'Destrucción', value: `${nextUpgrade["destruction"] * 100}%`, inline: true },
		{ name: 'Fallo', value: `${nextUpgrade["failure"] * 100}%`, inline: true },
        { name: 'Gastos totales', value: 'Materiales usados desde la optimización inicial' },
		{ name: 'Oro', value: `${gold}`, inline: true },
		{ name: 'Lunas', value: `${full_moon}`, inline: true },
		{ name: 'Plumas', value: `${angels_feather}`, inline: true },
		{ name: 'Almas verdes', value: `${soul[0]}`, inline: true },
		{ name: 'Almas rojas', value: `${soul[1]}`, inline: true },
		{ name: 'Almas azules', value: `${soul[2]}`, inline: true },
		{ name: 'Gemas de dragón', value: `${soul[3]}`, inline: true },
        { name: 'Pergas', value: `${scrolls}`, inline: true },
	)
	// .setImage('https://cdn-longterm.mee6.xyz/plugins/embeds/images/628543142819528714/3e2963015e4118ab82c55bf85df0c4e8dfb34ef6737d8fa87c3df78df9a090ef.png')
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('optimizacion')
		.setDescription('Simulador de optimización de SP.')
        .addStringOption(option =>
            option.setName('start')
            .setDescription('Optimización inicial')),
	async execute(interaction) {
        // console.log(interaction.id);
        const upgrade = new ButtonBuilder()
            .setCustomId('upgrade')
            .setLabel('Optimizar')
            .setStyle(ButtonStyle.Success);

        const scrollUpgrade = new ButtonBuilder()
            .setCustomId('scrollUpgrade')
            .setLabel('Optimizar con perga')
            .setStyle(ButtonStyle.Primary);
        
        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Reiniciar')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(upgrade, scrollUpgrade, cancel);

        start = parseInt(interaction.options.getString('start'));
        if (start < 0 || start > 19) {
            start = 0;
        }

        const response = await interaction.reply({ embeds: [createUpgradeEmbed(interaction, isNaN(start) ? 0 : start)], components: [row] });

        // try {
        //     const confirmation = await response.awaitMessageComponent({ time: 60_000 });

        //     if (confirmation.customId === 'upgrade') {
        //         await confirmation.update({ embeds: [createUpgradeEmbed(interaction, currentUpgrade).setTitle('hola')], components: [row] });
        //     }
        //     if (confirmation.customId === 'cancel') {
        //         await confirmation.update({ embeds: [createUpgradeEmbed(interaction, 0, 0, 0, 0, [0, 0, 0, 0], 0).setTitle('CANCELAO')], components: [row] });
        //     }
        // } catch (e) {
        //     console.log(e);
        //     await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [row] });
        // }

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 600_000 });
        collector.on('collect', async i => {
            // console.log('Nueva interacción:', i);
            // await i.reply(`${i.user} ha hecho algo!`);
            if (i.customId === 'upgrade') {
                console.log('estas upgradeando')
                console.log(currentUpgrade);
                let titulo = upgradeSP(currentUpgrade)
                await i.update({ embeds: [createUpgradeEmbed(interaction, currentUpgrade).setTitle(titulo)], components: [row] });
                        }
            if (i.customId === 'cancel') {
                currentUpgrade = 0;
                gold = 0;
                full_moon = 0;
                angels_feather = 0;
                soul = [0, 0, 0, 0];
                scrolls = 0;
                await i.update({ embeds: [createUpgradeEmbed(interaction, 0, 0, 0, 0, [0, 0, 0, 0], 0).setTitle('SP reiniciada').setColor(8161928)], components: [row] });
            }
        });
	},
};