module.exports = {
    name: 'stop',
    aliases: ['st'],
    description: 'Stops music playback, removing all songs from the queue',

    execute(message, args, cmd, client) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `❌ | ${message.author}, there is no music currently playing!` });

        queue.destroy();

        return message.channel.send({ content: `✅ | Player turned off` });
    },
};