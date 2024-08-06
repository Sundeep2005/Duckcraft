const fs = require('node:fs');
const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');

const config = require('../config');

async function loadCommands(client) {
    let commandsArray = [];
    let developersArray = [];

    const commandsFolder = fs.readdirSync('./commands');
    for (const folder of commandsFolder) {
        const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of commandsFiles) {
            const commandFile = require(`../commands/${folder}/${file}`);
            client.commands.set(commandFile.data.name, commandFile); 

            if (commandFile.developer) {
                developersArray.push(commandFile.data.toJSON());
            } else {
                commandsArray.push(commandFile.data.toJSON());
            }
        }
    }

    client.application.commands.set(commandsArray);

    const developerGuild = await client.guilds.fetch(config.guild_id);

    developerGuild.commands.set(developersArray);

    return console.log(`[Commands] Loaded ${commandsArray.length} commands!`);
};

module.exports = { loadCommands };