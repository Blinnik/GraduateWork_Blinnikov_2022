const prefixSchema = require('../../models/prefix');

module.exports = (Discord, client, message) => {
    // const config = require('../../config.json');
    // const prefix = config.prefix;
    if(message.author.bot) return;
    prefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
        let prefix;
        if(data){
            prefix = data.Prefix;
        } else {
            prefix = '-'
        }
        if(!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).split(/ +/);
        
        // args.shift() убирает из args первый элемент - команду и возвращает ее cmd
        const cmd = args.shift().toLowerCase();
        const command = client.commands.get(cmd) 
        || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

        try {
            command.execute(message, args, cmd, client, Discord);
        } catch (err) {
            message.reply("There was an error trying to execute this command!");
            console.log(err);
        }       
    });
}



