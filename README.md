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
`battle` is the only game so far, `I spy`, `tictactoe` and `conect four` is in progress, and will be done within the next week, so stay tune for updates!
## How to use
### Starting Games
Start with the basics of a discord bot (Getting the token, making the files, etc) then, in your main file put this
```js
/* DEFINE DISCORD AND DISCORD-MINIGAMES */
const Discord = require('discord.js')
const minigames = require('discord-minigames')
/* CREATE DISCORD CLIENT */
const client = new Discord.Client()

/* ON READY EVENT */
client.on('ready', () => {
    console.log(`${client.tag} is online!`)
})

let prefix = "!" /* You can change this to your desired prefix. */

/* MESSAGE EVENT */
client.on('message', message => {
    let member = message.mentions.members.first()
        /* BATTLES */
        if (message.content.startsWith() === `${prefix}battle` && member) {
            minigames.startBattle(member, message)
        /* ISPYS */    
        } else if (message.content.startsWith() === `${prefix}ispy` && member) {
            let ISpy = new minigames.ISpy(message)
            ISpy.startISpy(member).catch(err => {
                console.log(err)
                message.channel.send(err.message)
            })
        }
})
client.login('YOUR_TOKEN') /* Replace "YOUR_TOKEN" with a token from https://discord.com/developers/applications. */
```
Now when a Discord member does `!<game name> [ mention ]` they will request a game with that person!
## Documentation
#### startBattle()
```js
const {GuildMember, Message} = require('discord.js')
const minigames = require('discord-minigames')
minigames.startBattle(GuildMember, Message)
```
Run the function startBattle(), this requires 2 parameters, the first parameter (member) is a GuildMember object, and the second (message) is a Message object.
#### startISpy()
```js
const {GuildMember, Message} = require('discord.js')
const minigames = require('discord-minigames')
let ISpy = new minigames.ISpy(Message)
ISpy.startISpy(GuildMember)
```
Create a new ISpy class with the 1 parameter being `message` which is a Message object, then
run the function startISpy(), this requires 1 parameter, the parameter `member` is a GuildMember object.
## Note
This is **very new** and will have bugs, please put any new errors [here](https://github.com/DaRealDorseyBro/discord-minigames/issues)!
