const { commandInteraction, ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',

    execute(client) {
        const activities = [{ name: `play.duckcraft.nl | 1.21`, type: ActivityType.Playing }];

        let i = 0;
        setInterval(() => {
            if(i >= activities.length) i = 0;
            client.user.setActivity(activities[i].name, { type: activities[i].type });
            i++;
        }, 5000);
    }
};