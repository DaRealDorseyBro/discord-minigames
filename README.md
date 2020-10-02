# discord-minigames
`discord-minigames` is a collection of minigames for a Javascript Discord Bot, including many popular minigames there's this will give your bot way more options for fun commands!
## Table of Contents
1. Install
2. Games
3. How to use
4. Documentation
## Install
```sh
$ npm install discord-minigames
```
## Games
`battle` is the only game so far, `I spy`, `tictactoe` and `conect four` is in progress, and will be done within the next week, so stay tune for updates!
## How to use
### Starting Battles
Start with the basics of a discord bot (Getting the token, making the files, etc) then, in your main file put this
```js
const Discord = require('discord.js')
const minigames = require('discord-minigames')
const client = new Discord.client()

client.on('ready', () => {
    console.log(`${client.tag} is online!`)
})

client.on('message', message => {
    if (message.content.startsWith() === "!battle") {
        let member = message.mentions.members.first()    
        minigames.startBattle(member, message)
    }
})
client.login('YOUR_TOKEN')
```
Now when a Discord member does `!battle [ mention ]` they will request a battle with that person!
## Documentation
### Battle
```js
const {GuildMember, Message} = require('discord.js')
const minigames = require('discord-minigames')
minigames.startBattle(GuildMember, Message)
```
To start the battle call the method startBattle(), this method requires 2 parameters, the first parameter (member) is a GuildMember object, and the second (message) is a Message object.
## Note
This is **very new** and will have bugs, please put any new errors [here](https://github.com/DaRealDorseyBro/discord-minigames/issues)!
