const { Util } = require('discord.js');
const Schema = require('../../models/reactionRoles.js');

module.exports = {
    name: 'addreactionrole',
    aliases: ['arr', 'add'],
    description: 'Creating reaction role',
    async execute(message, args){
        if(!message.guild.me.permissions.has('MANAGE_ROLES')){
            return message.reply("I haven't permissions to manage roles!");
        }
        if(!message.member.permissions.has("MANAGE_ROLES")){
            return message.reply("You haven't permissions to manage roles!");
        }
        const role = message.mentions.roles.first();
        if(!role) return message.reply('Please specify a role!');
       
        let emoji = args[1];
        if(!emoji) return message.reply('Please specify an emoji after role!');
        
        // проверка правильности ввода эмодзи :C
        // проверка на ввод двух и больше эмодзи подряд (не выполнено)

        const emotes = (str) => str.match(/<a?:.+?:\d{18}>|(?=\p{Emoji})(?!\p{Number})|[\u0030-\u0039]\ufe0f\u20e3/gu); 
        if(!emotes(emoji)) return message.reply('Error, incorrect emoji. Please, try again!');

        const parsedEmoji = Util.parseEmoji(emoji);

        Schema.findOne({ Guild: message.guild.id, Channel: message.channel.id }, async (err, data) => {
            if(data){

                // ограничение на количество записей в панели

                if(Object.keys(data.Roles).length >= 20){
                    return message.reply("Error, Discord limits emojis under message by 20.");
                }

                // проверка, существуют ли такие роли в панели

                let roles = new Array();
                const mapped = Object.keys(data.Roles)
                .map((value, index) => {
                roles[index] = data.Roles[value]["RoleID"]
                });
                if(roles.includes(role.id)) return message.reply("Error, role is currently in use!");

                // проверка, существуют ли такие эмодзи в панели

                if(Object.keys(data.Roles).includes(parsedEmoji.name)){
                    return message.reply ("Error, emoji is currently in use!");
                }  

                data.Roles[parsedEmoji.name] = 
                    {
                        "RoleID": role.id,
                        "Emoji": {
                            id: parsedEmoji.id,
                            raw: emoji
                        }
                    }
                
                await Schema.findOneAndUpdate(
                    { Channel: message.channel.id },
                    data
                );
            } else{
                new Schema({
                    Guild: message.guild.id,
                    Channel: message.channel.id,
                    Message: 0,
                    Roles: {
                        [parsedEmoji.name]: 
                        {
                                "RoleID": role.id,
                                "Emoji": {
                                    id: parsedEmoji.id,
                                    raw: emoji
                                },   
                        },
                    },
                }).save();
            }
            message.channel.send('New role added!')
        });
    }
}