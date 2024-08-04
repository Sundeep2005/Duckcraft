const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');

const fs = require('node:fs');
const config = require('../config');

async function loadCommands(client) {
    let commands = [];
    let developers = [];

    const commandsFolder = fs.readdirSync('./commands');
    for(const folder of commandsFolder) {
        const commandFIles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        for(const file of commandFiles) {
            const commandFile = require(`../commands/${folder}/${file}`);
            client.commands.set(commandFile.data.name, commandFile);

            if(commandFile.developers) {
                developers.push(commandFile.data.toJSON());
            } else {
                commands.push(commandFile.data.toJSON());
            }
        }
    }

    client.application.commands.set(commands);
    const devguild = await client.guilds.fetch(config.guild_id);
    devguild.commands.set(developers);
    return console.log('[COMMANDS] ' + commands.length + ' commands loaded!');
};

module.exports = { loadCommands };
