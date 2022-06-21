module.exports = {
    name: 'kick',
    description: 'This command kicks a member!',
    execute(message, args){
        if(!message.guild.me.permissions.has('KICK_MEMBERS')){
            return message.reply("I haven't permissions to kick members!");
        }
        if(!message.member.permissions.has('KICK_MEMBERS')){
            return message.reply("You haven't permissions to kick members!");
        }
        if(!args[0]) return message.reply("Please add argument!");
        const target = message.mentions.users.first();
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick();
            message.channel.send("User has been kicked");
        }else{
            message.channel.send("You couldn't kick that member!");
        }
    }
}