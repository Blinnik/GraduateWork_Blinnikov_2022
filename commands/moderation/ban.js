module.exports = {
    name: 'ban',
    description: 'This command bans a member!',
    execute(message, args){
        if(!message.guild.me.permissions.has('BAN_MEMBERS')){
            return message.reply("I haven't permissions to ban members!");
        }
        if(!message.member.permissions.has('BAN_MEMBERS')){
            return message.reply("You haven't permissions to ban members!");
        }
        if(!args[0]) return message.reply("Please add argument!");
        const target = message.mentions.users.first();
      
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.ban();
            message.reply("User has been banned");
        }else{
            message.reply("You couldn't ban that member!");
        }
    }
}