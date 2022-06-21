# GraduateWork_Blinnikov_2022
Discord bot data processing client-server application (Discord bot + Web application)

Для корректной работы необходимо создать файл config.json со следующей структурой / you need to create a config.json file with the following structure:

{
    "bot": {
        "id": "<ENTER BOT ID>",
        "secret": "<ENTER BOT SECRET KEY>",
        "token": "<ENTER BOT TOKEN>"
      },
    "prefix": "-",
    "mongooseConnectionString": "<ENTER LINK TO THE DATABASE>",
    "dashboardURL": "http://localhost:3000",
    "bot_permissions": {
        "intents": [
            "GUILDS",
            "GUILD_BANS",
            "GUILD_EMOJIS_AND_STICKERS",
            "GUILD_INTEGRATIONS",
            "GUILD_WEBHOOKS",
            "GUILD_INVITES",
            "GUILD_VOICE_STATES",
            "GUILD_MESSAGES",
            "GUILD_MESSAGE_REACTIONS",
            "GUILD_MESSAGE_TYPING",
            "DIRECT_MESSAGES",
            "DIRECT_MESSAGE_REACTIONS",
            "DIRECT_MESSAGE_TYPING"
        ]
    },
    "bot_partials": {
        "intents": [
            "MESSAGE",
            "CHANNEL",
            "REACTION"
        ]
    }
}

Также необходимо установить все используемые библиотеки / It is also necessary to install all used libraries