module.exports = {
    name: 'unban',
    description: 'This command unbans a member!',
    async execute(message, args){
        if(!message.guild.me.permissions.has('BAN_MEMBERS')){
            return message.reply("I haven't permissions to unban members!");
        }
        if(!message.member.permissions.has('BAN_MEMBERS')){
            return message.reply("You haven't permissions to unban members!");
        }
        if(!args[0]) return message.reply("Please add argument!");

        await message.guild.bans.fetch()
        .then(async bans => {
            let isBanned = bans.find(ban => ban.user.id === args[0]);
            if (!isBanned) return message.reply("You couldn't unban that member!");
            await message.guild.members.unban(args[0]);
            await message.reply("User has been unbanned");
        })
        .catch(err => console.error (err));

    }
}