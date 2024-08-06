const { Events, EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: Events.GuildMemberAdd,

    async execute(member) {
        const client = member.client;

        const channel = member.guild.channels.cache.find(ch => ch.name === "👋┃binnenkomst");
        if (!channel) return console.log("Welkom channel niet gevonden.");

        const embed = new EmbedBuilder()
            .setTitle('🎉 Welkom op de Duckcraft discord server!')
            .setDescription(`Hey ${member}! 👋\nJe bent member **#${member.guild.memberCount}**. Kijk gerust eventjes rond!\n`)
            .addFields(
                { name: '📅 Gejoined op:', value: `${new Date().toLocaleDateString()}`, inline: true },
                { name: '✏️ Account gemaakt op:', value: `${member.user.createdAt.toLocaleDateString()}`, inline: true }
            )
            .setColor(config.embedColor)
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: `Welkom, ${member.user.username}!`, iconURL: member.user.displayAvatarURL() })
            .setTimestamp();

        await channel.send({ embeds: [embed] });
    }
}