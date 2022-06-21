module.exports = {
    name: 'clear',
    aliases: ['c', 'clr'],
    description: 'Clear messages',
    async execute(message, args){
        if(!message.guild.me.permissions.has('MANAGE_MESSAGES')){
            return message.reply("I haven't permissions to manage messages!");
        }
        if(!message.member.permissions.has("MANAGE_MESSAGES")){
            return message.reply("You haven't permissions to manage messages!");
        }
        if(!args[0]) return message.reply("Enter the amount of messages that"
        +"you want to clear or \"all\" to delete all messages!");
        if(isNaN(args[0]) && args[0] !== 'all') return message.reply("Enter a real number or \"all\"!");
        if(args[0] > 100) return message.reply("You cannot delete more than 100 messages!");
        if(args[0] < 1) return message.reply("You must delete at least one message!");
        if(args[0] === 'all'){
            
            // для удаления всех сообщений в связи с тех. особенностями
            // Discord необходимо клонировать канал, а затем удалить старый

            if(!message.guild.me.permissions.has('MANAGE_CHANNELS')){
                return message.reply("I haven't permissions to manage channels!");
            }
            if(!message.member.permissions.has("MANAGE_CHANNELS")){
                return message.reply("You haven't permissions to manage channels!");
            }
            const newChannel = await message.channel.clone();
            message.channel.delete();
            return;
            // await message.channel.messages.fetch().then(messages => {
            //     message.channel.bulkDelete(messages);
            // });
            // return;
        }
        await message.channel.bulkDelete(1);
        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages, [true]);
        });  
    }
}



