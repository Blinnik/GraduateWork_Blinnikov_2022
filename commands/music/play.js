module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Adds a song to the broadcast queue',

    async execute(message, args, cmd, client) {
        
       const music = args.join(' ');
       if (!music) return message.reply({ content: `❌ | Write the name of the music as an argument!`, ephemeral: true }).catch(e => { });
       
       // результат поиска
        const res = await client.player.search(music, {
            requestedBy: message.member,
        });

        if (!res || !res.tracks.length) return message.reply({ content: `❌ | Track is not found!`, ephemeral: true }).catch(e => { });

        const queue = await client.player.createQueue(message.guild, {
                metadata: message.channel
        });

      //await message.channel.send({ content: `⏱️ | Loading **${res.playlist ? 'playlist' : 'track'}**` });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await client.player.deleteQueue(message.guild.id);
            return message.reply({ content: `❌ | Could not join your voice channel!`, ephemeral: true });
        }

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
        if (!queue.playing) await queue.play();

    }
};
