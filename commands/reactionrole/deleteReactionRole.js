const { Util } = require('discord.js');
const Schema = require('../../models/reactionRoles.js');

module.exports = {
    name: 'deletereactionrole',
    aliases: ['drr', 'delete'],
    description: 'Deleting reaction role',
    async execute(message, args){
        if(!message.guild.me.permissions.has('MANAGE_ROLES')){
            return message.reply("I haven't permissions to manage roles!");
        }
        if(!message.member.permissions.has("MANAGE_ROLES")){
            return message.reply("You haven't permissions to manage roles!");
        }
        if(!args[0]) return message.reply("Please add role you want to delete!");
        const role = message.mentions.roles.first();

        Schema.findOne({ Guild: message.guild.id, Channel: message.channel.id }, async (err, data) => {
            if(data){
                
                // удаление записи по роли

                let roleTemp;
                let count = 0;
                let rolesNumber = 0;
                const mapped = Object.keys(data.Roles)
                .map(value => {
                    rolesNumber += 1;
                roleTemp = data.Roles[value]["RoleID"];
            
                if(roleTemp === role.id && rolesNumber === 1){
                    Schema.deleteOne({ Guild: message.guild.id, Channel: message.channel.id }, function(err) {
                        if (!err) {
                            console.log('Panel is deleted!');
                        }
                        else {
                            console.log('error!');
                        }
                    });
                }
                if(roleTemp === role.id){
                    count += 1;
                    delete data.Roles[value];   
                }
            });
            
            // проверка наличия роли в панели
            
            if(!count) return message.reply("There is no such role in the panel!");
            
                await Schema.findOneAndUpdate(
                    { Channel: message.channel.id },
                    data
                    );
                return message.channel.send('Role is deleted!');
            } else{
                return message.channel.send('Panel is empty!');
            }
        });
    }
}