module.exports = (client) =>{
    const player = client.player;
    player.on('trackStart', (queue, track) => {
        queue.metadata.send(`🎶 | Now playing **${track.title}**!`).catch(e => { });;
    });
    
    player.on('trackAdd', (queue, track) => {
        queue.metadata.send(`✅ | Added to the queue **${track.title}**`).catch(e => { });
    });
}