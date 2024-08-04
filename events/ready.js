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

        const status = [ `dnd` ];
        let j = 0;
        setInterval(() => {
            if(j >= status.length) j = 0;
            client.user.setStatus(status[j]);
            j++;
        }, 5000);
    }
};