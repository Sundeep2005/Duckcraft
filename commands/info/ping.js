const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping status'),

    async execute(interaction, client) {
        try {
            const responseTime = Date.now() - interaction.createdTimestamp;
            const apiPing = Math.round(client.ws.ping);

            let state = "🟢 Uitstekend";
            if (responseTime > 500) {
                state = "🔴 Slecht";
            } else if (responseTime > 200) {
                state = "🟠 Matig";
            } else if (responseTime > 70) {
                state = "🟢 Goed";
            }

            const embed = new EmbedBuilder()
                .setTitle('🏓 PONG')
                .setColor(config.embedColor)
                .setDescription(`**Bot:** ${responseTime} ms | ${state}\n**Websocket:** ${apiPing} ms`)
                .setFooter({ text: `Uitgevoerd door ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });

        } catch (error) {
            console.error('Error handling the interaction:', error);
        }
    }
};
