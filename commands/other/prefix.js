const PrefixSchema = require('../../models/prefix');

module.exports = {
    name: 'prefix',
    description: 'Allows to change prefix',
    
    async execute(message, args) {
        if(!message.member.permissions.has('ADMINISTRATOR')){
            return message.reply("Only administrators can change prefix!");
        }
        if(!args[0]) {
            return message.reply("You must enter a string as an argument!");
        }
        if(args[0].length > 3) {
            return message.reply('Error, you can enter a string with no more than 3 characters!');
        }
        PrefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if(data){
                data.Prefix = args[0];
                await data.save();
                
            } else {
                await new PrefixSchema({
                    Guild: message.guild.id,
                    Prefix: args[0] 
                }).save();
            }
            return message.reply(`Prefix was changed to ${args[0]}`);
            
        });
    }
}