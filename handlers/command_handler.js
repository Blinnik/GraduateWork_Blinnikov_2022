const fs = require('fs');

module.exports = (client) =>{
    let commands;
    const load_dir = (dirs) =>{
        const command_files = fs.readdirSync(`./commands/${dirs}`)
        .filter(file => file.endsWith('.js'));
        for(const file of command_files){
            commands = require(`../commands/${dirs}/${file}`); 
            if(commands.name){
                client.commands.set(commands.name, commands);
            } else {
                continue;
            }
        }
    }
    
    const categories = fs.readdirSync(`./commands`)
    categories.forEach(e => load_dir(e));
    // ['moderation', 'other', 'reactionrole', 'music'].forEach(e => load_dir(e));

}

