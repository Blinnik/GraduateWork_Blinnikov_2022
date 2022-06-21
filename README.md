# GraduateWork_Blinnikov_2022

Discord bot data processing client-server application (Discord bot + Web application).
The foundation of the application was implemented, as well as the most necessary functions for the discord bot (demonstration of skills).

## Functionality

**Interaction via text chat:**
+ Play, skip and stop music
+ Reaction Roles system
+ Clear messages in the text chat
+ Ban, unban and kick user
+ Change prefix of the bot
+ Help menu

**Interaction via dashboard of the web application:**
+ Change prefix of the bot
+ Send message to text channels

## Setup

You need to create a `config.json` file with the following structure:
```json
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
```
### Don't forget to install all necessary packages

+ discord.js
+ mongoose
+ discord-player
+ body-parser
+ express
+ cookies
+ method-override
+ pug

## Thanks to

+ **[CodeLyon](https://www.youtube.com/c/CodeLyon)** - The structure of the bot was built on the basis of some of his videos
+ **[ADAMJR](https://www.youtube.com/c/ADAMJR)** - Web application of this project is based on his youtube guide **["Create a Discord Bot Dashboard"](https://www.youtube.com/watch?v=zwwsw2wvOB0&list=PLGfT2ttRbfizUIO1YEITWaquqBsNqHv7v)**
