const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { QuickDB } = require('quick.db');
const { loadCommands } = require('./utils/commandsHandler');
const { loadEvents } = require('./utils/eventsHander');

const fs = require('node:fs');
const config = require('./config');
const db = new QuickDB();

const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent ], 
    partials: [ Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction ]
});

client.commands = new Collection();
module.exports = { client, db };

client.login(config.token).then(() => {
    console.log(`[BOT] ${client.user.tag} is online!`);

    loadCommands(client);
    loadEvents(client);
});