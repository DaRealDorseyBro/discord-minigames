const {MessageEmbed} = require("discord.js");
exports.createISpy = async function (member, message) {
    if (!message.guild.members.cache.get(member.id)) return message.channel.send('Please specify a member to play with!')
    if (member.id === message.author.id)
        return message.reply("You can't play with yourself!");
    if (member.user.bot) return message.reply("Bots can't play!");
    let scenes = ['scene1']
    let randomScene = Math.floor(Math.random() * scenes.length)
    const playerOneData = {
        id: message.author.id,
        active: false,
        pickedColor: "",
        pickedObject: ""
    }
    const playerTwoData = {
        id: member.id,
        active: false,
        pickedColor: "",
        pickedObject: ""
    }
    const scene1 = {
        name: "The Perfect Living",
        url: "https://i.imgur.com/1SzSNJ8.png",
        mainColor: "YELLOW",
        colors: ['brown', 'green', 'yellow', 'orange', 'red'],
        brownObjectsArray: ['cabinet', 'table'],
        greenObjectsArray: ['flower'],
        yellowObjectsArray: ['carpet', 'painting', 'vase', 'light'],
        orangeObjectsArray: ['shade', 'pillow'],
        redObjectsArray: ['chair', 'book', 'flower', 'painting'],
        brown: {
            cabinet: {
                name: "cabinet",
                locations: ["top-left", "center", "top-right"],
                amount: 3
            },
            table: {
              name: "table",
              locations: ['center'],
              amount: 1
            }
        },
        yellow: {
            carpet: {
                name: "carpet",
                locations: ["bottom"],
                amount: 1
            },
            painting: {
                name: "painting",
                locations: ["top"],
                amount: 1
            },
            vase: {
                name: "vase",
                locations: ["bottom-right"],
                amount: 1
            },
            light: {
                name: "light",
                locations: ["top"],
                amount: 1
            }
        },
        orange: {
            shade: {
                name: "shade",
                locations: ["right"],
                amount: 1
            },
            pillow: {
                name: "pillow",
                locations: ["right", "center", "center", "left"],
                amount: 4
            }
        },
        red: {
            chair: {
                name: "chair",
                locations: ["bottom-left", "center", "bottom-right"],
                amount: 3
            },
            book: {
                name: "book",
                locations: ["top-right", "right", "center", "top-left"],
                amount: 4
            },
            flower: {
                name: "flower",
                locations: ["left", "left", "center", "right"],
                amount: 4
            },
            painting: {
                name: "painting",
                locations: ["top-left"],
                amount: 1
            }
        }
    }
    return start(member, message);
    
    async function start(member, message) {
        await message.channel.send(`Hey ${member}! ${message.author} has challenged you to I Spy, do you accept?`).then(async msg => {
                await msg.react("✅");
                await msg.react("❌");
                const filter = (reaction, user) =>
                    reaction.emoji.name === "❌" && user.id === member.id;
                const no = msg.createReactionCollector(filter, {
                    time: 15000,
                    max: 1
                });
                const filter2 = (reaction, user) =>
                    reaction.emoji.name === "✅" && user.id === member.id;
                const yes = msg.createReactionCollector(filter2, {
                    time: 15000,
                    max: 1
                });

                no.on("collect", async collected => {
                    await msg.edit("Looks like they declined your challenge :/");
                    return yes.stop();
                });
                yes.on("collect", async collected => {
                    await no.stop();
                    if ((playerOneData.active === true && playerOneData.id === message.author.id) || (playerTwoData.active === true && playerTwoData.id === member.id)) return msg.edit("You are already in a I Spy match!");
                    return accept(member, message);
                });
                setTimeout(() => {
                    if (
                        playerOneData.active === false &&
                        playerTwoData.active === false
                    ) {
                        return msg.edit("They didn't react in time :/");
                    }
                }, 15000);
            });
    }

    async function accept(member, message) {
        if (scenes[randomScene] === 'scene1') {
            playerOneData.active = true
            playerTwoData.active = true
            return sceneOne(member, message)
        }
    }

    async function sceneOne(member, message) {
            await message.channel.send(new MessageEmbed()
                .setTitle(`It's ${message.author.username}'s turn!`)
                .setImage(scene1.url)
                .setDescription(`Brown Objects: \`${scene1.brownObjectsArray.join('`, `')}\`\nGreen Objects: \`${scene1.greenObjectsArray.join('`, `')}\`\nYellow Objects: \`${scene1.yellowObjectsArray.join('`, `')}\`\nOrange Objects: \`${scene1.orangeObjectsArray.join('`, `')}\`\nRed Objects: \`${scene1.redObjectsArray.join('`, `')}\``)
                .setColor(scene1.mainColor)
            )
            let nowPlaying = message.member;
            let nextUp = member;
            return sceneOneStart(message, nowPlaying, nextUp)
    }

    async function sceneOneStart(message, nowPlaying, nextUp) {
        await message.channel.send(`${nowPlaying}, Please send a color, a object and a hint from the image, and from the objects list (ex: \`red chair like a couch\`)!`).then(yourmom => {
        const filter = (msg) => msg.author.id === nowPlaying.id
        const collector = message.channel.createMessageCollector(filter, {max: 1, time: 30000})
        collector.on('collect', async collected => {
          await collected.delete()
          await yourmom.delete()
          let color = collected.content.split(' ')[0]
          let object = collected.content.split(' ')[1]
          let hint = collected.content.split(' ').slice(2).join(' ')
          let array;
          if (scene1.colors.includes(color)) {
              if (color === 'brown') array = scene1.brownObjectsArray
              if (color === 'green') array = scene1.greenObjectsArray
              if (color === 'yellow') array = scene1.yellowObjectsArray
              if (color === 'orange') array = scene1.orangeObjectsArray
              if (color === 'red') array = scene1.redObjectsArray
              if (array.includes(object)) {
                  if(hint) {
                  if (nowPlaying.id === playerOneData.id) playerOneData.pickedColor = color
                  if (nowPlaying.id === playerOneData.id) playerOneData.pickedObject = object
                  if (nowPlaying.id === playerTwoData.id) playerTwoData.pickedColor = color
                  if (nowPlaying.id === playerTwoData.id) playerTwoData.pickedObject = object
                  await collector.stop()
                  await message.channel.send(`${nextUp}, **${nowPlaying.user.username}** has chosen a \`${color}\` color object, with the hint of \`${hint}\`, you have \`30\` seconds to send your guess (ex: \`yellow carpet\`)!`)
                  return sceneOneGuess(message, nowPlaying, nextUp)
                  } else {
                  await collector.stop()
                  await message.channel.send(`**${nowPlaying.user.username}**, Please add a hint!`)
                  return sceneOneStart(message, nowPlaying, nextUp)
                  }
              } else {
                await collector.stop()
                await message.channel.send(`**${nowPlaying.user.username}**, Please pick a valid object!`)
                return sceneOneStart(message, nowPlaying, nextUp)
              }
          } else {
                await collector.stop()
                await message.channel.send(`**${nowPlaying.user.username}**, Please pick a valid color!`)
                return sceneOneStart(message, nowPlaying, nextUp)
          }
        })
    })
}

    async function sceneOneGuess(message, nowPlaying, nowGuessing) {
        const filter = (msg) => msg.author.id === nowGuessing.id
        const collector = message.channel.createMessageCollector(filter, {max: 1, time: 30000})
        collector.on('collect', async collected => {
            let color = collected.content.split(' ')[0]
            let object = collected.content.split(' ')[1]
            let playerData;
            if (nowPlaying.id === playerOneData.id) playerData = playerOneData;
            if (nowPlaying.id === playerTwoData.id) playerData = playerTwoData;
            if (color === playerData.pickedColor && object === playerData.pickedObject) {
                await collector.stop()
                await message.channel.send(`**${nowGuessing.user.username}**, that was correct!`)
                return sceneOneStart(message, nowGuessing, nowPlaying)
            } else {
                await collector.stop()
                await message.channel.send(`**${nowGuessing.user.username}**, that wasn't correct :/`)
                return end(message, nowPlaying)
            }
        })
    }

    async function end(message, winner) {
      if (winner.id === playerOneData.id) playerData = playerOneData;
      if (winner.id === playerTwoData.id) playerData = playerTwoData;
      playerOneData.active = false
      playerTwoData.active = false
      playerOneData.id = 0
      playerTwoData.id = 0
      setTimeout(() => {
            return message.channel.send(
                new MessageEmbed()
                    .setTitle("Congratgulations!")
                    .setDescription(
                        `${winner} has won the game!\nThe final object was a \`${playerData.pickedColor} ${playerData.pickedObject}\`!`
                    )
                    .setColor("GREEN")
                    .setFooter(winner.displayName, winner.user.displayAvatarURL())
            );
      }, 1500);
    }
}
