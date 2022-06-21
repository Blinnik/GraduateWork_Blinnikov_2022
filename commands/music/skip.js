module.exports = {
    name: 'skip',
    aliases: ['sk'],
    description: 'Removes the current song from the queue',

    execute(message, args, cmd, client) {
        const queue = client.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.channel.send({ content: `❌ | ${message.author}, there is no music currently playing!` });

        const success = queue.skip();

        return message.channel.send({ content: success ? ` ⏭️ | Skipped song **${queue.current.title}**` : `❌ | ${message.author}, something went wrong!` });

    },
};