const { CommandInteraction } = require('discord.js');

module.exports = {
    name: 'interactionCreate',

    execute(interaction, client) {
        if(!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if(!command) {
            return interaction.reply({ content: 'An error has occurred.', ephemeral: true });
        }
        command.execute(interaction, client);
    }
}