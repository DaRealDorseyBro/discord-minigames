# discord-minigames
`discord-minigames` is a collection of minigames for a Javascript Discord Bot, including many popular minigames there's this will give your bot way more options for fun commands!
## Table of Contents
1. [Install](https://www.npmjs.com/package/discord-minigames#install)
2. [Games](https://www.npmjs.com/package/discord-minigames#games)
3. [How to use](https://www.npmjs.com/package/discord-minigames#how-to-use)
4. [Documentation](https://www.npmjs.com/package/discord-minigames#documentation)
## Install
```sh
$ npm install discord-minigames
```
## Games
`battle` and `ispy` are the only games so far, `tictactoe`, `conect four` and `life` is in progress, and will be done within the next few days, so stay tune for updates!
## How to use
### Starting Games
Start with the basics of a discord bot (Getting the token, making the files, etc) then, in your main file put this
```js
const Discord = require('discord.js')
const minigames = require('discord-minigames')
const client = new Discord.Client()

client.on('ready', () => {
    console.log(`${client.tag} is online!`)
})

client.on('message', message => {
    let member = message.mentions.members.first()    
        if (message.content.startsWith() === "!battle" && member) {
            minigames.startBattle(member, message)
        } else if (message.content.startsWith() === "!ispy" && member) {
            minigames.startISpy(member, message)
        }
})
client.login('YOUR_TOKEN')
```
Now when a Discord member does `!<game name> [ mention ]` they will request a game with that person!
## Documentation
#### startBattle()
```js
const {GuildMember, Message} = require('discord.js')
const minigames = require('discord-minigames')
minigames.startBattle(GuildMember, Message)
```
Start the function startBattle(), this function requires 2 parameters, the first parameter (member) is a GuildMember object, and the second (message) is a Message object.
#### startISpy()
```js
const {GuildMember, Message} = require('discord.js')
const minigames = require('discord-minigames')
minigames.startISpy(GuildMember, Message)
```
Start the function startISpy(), this function requires 2 parameters, the first parameter (member) is a GuildMember object, and the second (message) is a Message object.
## Note
This is **very new** and will have bugs, please put any new errors [here](https://github.com/DaRealDorseyBro/discord-minigames/issues)!
