const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/commands', (req, res) => {
    res.render('commands', {
        subtitle: 'Commands',
        categories: [
            {id: 'Mod', name: 'Moderation', icon: 'fas fa-gavel'}, 
            {id: 'RR', name: 'Reaction Roles', icon: 'fas fa-masks-theater'},
            {id: 'Msc', name: 'Music', icon: 'fas fa-music'},
            {id: 'Oth', name: 'Other', icon: 'fas fa-star'}
        ],
        commands: [
            {category: 'Mod', name: 'ban', aliases: '-', description: 'This command bans a member'},
            {category: 'Mod', name: 'unban', aliases: '-', description: 'This command unbans a member'},
            {category: 'Mod', name: 'kick', aliases: '-', description: 'This command kicks a member'},
            {category: 'Mod', name: 'clear', aliases: 'c, clr', description: 'Clear messages'},
            {category: 'RR', name: 'addReactionRole', aliases: 'arr, add', description: 'Creating reaction role in the channel'},
            {category: 'RR', name: 'deleteReactionRole', aliases: 'drr, delete', description: 'Deleting reaction role in the channel'},
            {category: 'RR', name: 'createPanel', aliases: 'cp, panel', description: 'Creating reaction roles panel'},
            {category: 'Msc', name: 'play', aliases: 'p', description: 'Adds a song to the broadcast queue'},
            {category: 'Msc', name: 'skip', aliases: 'sk', description: 'Removes the current song from the queue'},
            {category: 'Msc', name: 'stop', aliases: 'st', description: 'Stops music playback, removing all songs from the queue'},
            {category: 'Oth', name: 'help', aliases: '-', description: 'Displays a help menu that lists all commands'},
            {category: 'Oth', name: 'ping', aliases: '-', description: 'A test command designed to check the correct work of the bot'},
        ]
    });
})

module.exports = router;