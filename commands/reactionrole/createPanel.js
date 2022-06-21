const { Util } = require('discord.js');
const Schema = require('../../models/reactionRoles.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'createpanel',
    aliases: ['cp', 'panel'],
    description: 'Creating reaction roles panel',
    async execute(message, args){
        if(!message.guild.me.permissions.has('MANAGE_ROLES')){
            return message.reply("I haven't permissions to manage roles!");
        }
        if(!message.member.permissions.has("MANAGE_ROLES")){
            return message.reply("You haven't permissions to manage roles!");
        }
        
        const channel = message.mentions.channels.first() || message.channel;

        Schema.findOne({Guild: message.guild.id, Channel: message.channel.id }, async (err, data) => {
            if (!data) return message.reply('No data was in here');
            if (!data.Roles) return message.reply('No data was in here');
            //if (data.Roles)
            const mapped = Object.keys(data.Roles)
            .map((value, index) => {
                const role = message.guild.roles.cache.get(
                    data.Roles[value]["RoleID"]
                );
                return `${index + 1}) ${
                    data.Roles[value]["Emoji"].raw
                } - ${role}`;
            })
            .join('\n\n');
            
            channel
            .send(mapped)//new MessageEmbed().setDescription(mapped)
            .then((msg) => {
                data.Message = msg.id;
                data.save();
                // const reactions = Object.values(data.Roles).map(
                //     (val) => val[1].id
                // );
                const reactions = Object.values(data.Roles).map(
                    (val) => val["Emoji"].id ?? val["Emoji"].raw
                    );

                reactions.map((emoji) => msg.react(emoji));
            });
        });
    },
};