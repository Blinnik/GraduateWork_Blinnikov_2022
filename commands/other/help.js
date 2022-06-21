const { MessageEmbed } = require('discord.js');
const config = require('/DiscordBot/config.json');

module.exports = {
    name: 'help',
    description: 'Displays a help menu that lists all commands',
    execute(message){
        const helpMenu = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Help menu')
        .setDescription(`Below is a list of available commands:`)
        .addFields(
            { name: 'ban', value: 'Bans a member. Argument: @Mention', inline: false },
            { name: 'unban', value: 'Unbans a member. Argument: User ID', inline: false },
            { name: 'kick', value: 'Kicks a member. Argument: @Mention', inline: false },
            { name: 'clear [c] [clr]', value: 'Clears messages. Argument: number from 1 to 100 or \"all\"', inline: false },
            { name: 'ping', value: 'Test command', inline: false },
            { name: 'addReactionRole [add] [arr]', value: 'Adds role in the channel panel. Arguments: @Mention.Role and Emoji', inline: false },
            { name: 'deleteReactionRole [delete] [drr]', value: 'Delete role in the channel panel. Argument: @Mention.Role', inline: false },
            { name: 'createPanel [panel]', value: 'Creates panel with reaction roles in the channel', inline: false },
            { name: 'play [p]', value: 'Adds a song to the broadcast queue. Argument: String', inline: false },
            { name: 'skip [sk]', value: 'Removes the current song from the queue', inline: false },
            { name: 'stop [st]', value: 'Stops music playback, removing all songs from the queue', inline: false },
        )
        .setTimestamp()
        .setFooter({ text: 'I hope it was helpful to you'});
        
        message.channel.send({ embeds: [helpMenu] });
    
    }
}