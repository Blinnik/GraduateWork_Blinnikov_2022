const Schema = require('../../models/reactionRoles.js');


module.exports = (Discord, client) => {
    console.log("SovietChick is ready!");

    const Guilds = client.guilds.cache.map(guild => guild.id);
    
    // Поиск всех записей

    Schema.find({Guild: Guilds}, async (err, data) => {

        // если гильдии есть в БД, то...
        if(data){

            // Поиск старых сообщений для корректного выполнения функции после перезагрузки бота
            const channels = new Array();
            for (let i = 0; i < data.length; i++) {
               
                try{
                    
                    channels[i] = client.channels.cache.get(data[i].Channel);
                    channels[i].messages.fetch({ around: data[i].Message, limit: 1 });

                } catch{
                    
                    // если сообщение не найдено на сервере - удалить в БД
                    Schema.deleteMany({ Message: data[i].Message }, function(err) {
                        if (!err) {
                            console.log('Unrelated messages deleted!');
                        }
                        else {
                            console.log('error!');
                        }
                    });
                }   
            }
        } 
    });
}

