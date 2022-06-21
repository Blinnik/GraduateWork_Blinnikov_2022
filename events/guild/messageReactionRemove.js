const { User } = require('discord.js');
const Schema = require('../../models/reactionRoles.js');
module.exports = (Discord, client, reaction, user) => {
    if(reaction.message.partial) reaction.message.fetch();
    if(reaction.partial) reaction.fetch();
    if(user.bot) return;

    Schema.findOne({ Message: reaction.message.id }, async (err, data) => {
        if(!data) return;
        if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const roleid = data.Roles[reaction.emoji.name]["RoleID"];
        reaction.message.guild.members.cache.get(user.id).roles.remove(roleid);
        user.send('You have lost a role');
    });
}