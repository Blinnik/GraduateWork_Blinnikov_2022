// Подключение библиотеки discord.js, файла с конфигурацией, иных библиотек
const Discord = require('discord.js');
const config = require('./config.json');
const mongoose = require('mongoose');
const { Player } = require('discord-player');

// Создание экземпляра клиента
const client = new Discord.Client(config.bot_permissions, config.bot_partials);

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.player = new Player(client, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1<<25
    }
});

// Вход в Discord с помощью токена клиента
client.login(config.bot.token);

// Подключение Mongoose
if(!config.mongooseConnectionString) console.log('Can\'t connect to MongoDB');
else{
    mongoose 
    .connect(config.mongooseConnectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB'));
}

module.exports = client; // экспортируется в middleware панели управления

//Вызов обработчика команд и событий

['command_handler', 'event_handler', 'music_handler', 'error_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});
    
// Запуск сервера
require('./web-application/server.js');