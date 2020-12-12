let Discord, {Message, MessageEmbed} = require("discord.js");
class createISpy {
    constructor(message) {
        this.message = message
        this.scenes = [
            {
                name: "The Perfect Living",
                url: "https://i.imgur.com/1SzSNJ8.png",
                mainColor: "YELLOW",
                colors: ["brown", "green", "yellow", "orange", "red"],
                brownObjectsArray: ["cabinet", "table"],
                greenObjectsArray: ["flower"],
                yellowObjectsArray: ["carpet", "painting", "vase", "light"],
                orangeObjectsArray: ["shade", "pillow"],
                redObjectsArray: ["chair", "book", "flower", "painting"],
                brown: {
                    cabinet: {
                        name: "cabinet",
                        locations: ["top-left", "center", "top-right"],
                        amount: 3
                    },
                    table: {
                        name: "table",
                        locations: ["center"],
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
        ];
        this.scene = this.scenes[Math.floor(Math.random() * this.scenes.length)];
    }
    async startISpy(member) {
        let message = this.message
        if (!member) throw new Error("Please specify a member to play with!");
        if (!message.author) throw new Error("Looks like the message object is messed up :/");
        if (member.id === message.author.id) throw new Error("You can't play with yourself!");
        if (member.user.bot) throw new Error("Bots can't play!");

        message.channel
            .send(
                `Hey ${member}! ${message.author} has challenged you to I Spy, do you accept?`
            )
            .then(async msg => {
                let reactions = ["✅", "❌"];
                await Promise.all(reactions.map(r => msg.react(r)));
                let filter = (reaction, user) =>
                    reactions.includes(reaction.emoji.name) && user.id === member.id;
                const challengeCheck = await msg.awaitReactions(filter, {
                    time: 30000,
                    max: 1
                });
                if (challengeCheck.size < 1)
                    return msg.edit(
                        "Looks like they didn't react in time, the challenge has been cancelled"
                    );

                if (challengeCheck.first().emoji.name === "❌")
                    return msg.edit(
                        "Looks like they declined your challenge. Operation cancelled."
                    );
                else {
                    const players = [
                        {
                            id: message.author.id,
                            active: false,
                            pickedColor: "",
                            pickedObject: ""
                        },
                        { id: member.id, active: false, pickedColor: "", pickedObject: "" }
                    ];
                    await this.accept(message, member, players);
                }
            });
    }
    async accept(message, member, players) {
        players[0].active = true;
        players[1].active = true;
        return await this.sceneOne(message, member, players);
    }
    async sceneOne(message, member, players) {
        await message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(`It's ${message.author.username}'s turn!`)
                .setImage(this.scene.url)
                .setDescription(
                    `Brown Objects: \`${this.scene.brownObjectsArray.join(
                        "`, `"
                    )}\`\nGreen Objects: \`${this.scene.greenObjectsArray.join(
                        "`, `"
                    )}\`\nYellow Objects: \`${this.scene.yellowObjectsArray.join(
                        "`, `"
                    )}\`\nOrange Objects: \`${this.scene.orangeObjectsArray.join(
                        "`, `"
                    )}\`\nRed Objects: \`${this.scene.redObjectsArray.join("`, `")}\``
                )
                .setColor(this.scene.mainColor)
        );
        let nowPlaying = message.member;
        let nextUp = member;
        return await this.sceneOneStart(message, nowPlaying, nextUp, players);
    }

    async sceneOneStart(message, nowPlaying, nextUp, players) {
        await nowPlaying.send(`${nowPlaying}, Please send a color, a object and a hint from the image, and from the objects list (ex: \`red chair like a couch\`)!`)
            .then(yourmom => {
                const filter = msg => msg.author.id === nowPlaying.id;
                const collector = message.channel.createMessageCollector(filter, {
                    max: 1,
                    time: 30000
                });
                collector.on("collect", async collected => {
                    await collected.delete();
                    await yourmom.delete();
                    let color = collected.content.split(" ")[0];
                    let object = collected.content.split(" ")[1];
                    let hint = collected.content
                        .split(" ")
                        .slice(2)
                        .join(" ");
                    let array;
                    if (this.scene.colors.includes(color)) {
                        if (color === "brown") array = this.scene.brownObjectsArray;
                        if (color === "green") array = this.scene.greenObjectsArray;
                        if (color === "yellow") array = this.scene.yellowObjectsArray;
                        if (color === "orange") array = this.scene.orangeObjectsArray;
                        if (color === "red") array = this.scene.redObjectsArray;
                        if (array.includes(object)) {
                            if (hint) {
                                if (nowPlaying.id === players[0].id)
                                    players[0].pickedColor = color;
                                if (nowPlaying.id === players[0].id)
                                    players[0].pickedObject = object;
                                if (nowPlaying.id === players[1].id)
                                    players[1].pickedColor = color;
                                if (nowPlaying.id === players[1].id)
                                    players[1].pickedObject = object;
                                await collector.stop();
                                await message.channel.send(
                                    `${nextUp}, **${nowPlaying.user.username}** has chosen a \`${color}\` color object, with the hint of \`${hint}\`, you have \`30\` seconds to send your guess (ex: \`yellow carpet\`)!`
                                );
                                return await this.sceneOneGuess(
                                    message,
                                    nowPlaying,
                                    nextUp,
                                    players
                                );
                            } else {
                                await collector.stop();
                                await nowPlaying.send(
                                    `**${nowPlaying.user.username}**, Please add a hint!`
                                );
                                return await this.sceneOneStart(
                                    message,
                                    nowPlaying,
                                    nextUp,
                                    players
                                );
                            }
                        } else {
                            await collector.stop();
                            await nowPlaying.send(
                                `**${nowPlaying.user.username}**, Please pick a valid object!`
                            );
                            return await this.sceneOneStart(
                                message,
                                nowPlaying,
                                nextUp,
                                players
                            );
                        }
                    } else {
                        await collector.stop();
                        await nowPlaying.send(
                            `**${nowPlaying.user.username}**, Please pick a valid color!`
                        );
                        return this.sceneOneStart(message, nowPlaying, nextUp, players);
                    }
                });
            });
    }
    async sceneOneGuess(message, nowPlaying, nowGuessing, players) {
        const filter = msg => msg.author.id === nowGuessing.id;
        const collector = message.channel.createMessageCollector(filter, {
            max: 1,
            time: 30000
        });
        collector.on("collect", async collected => {
            let color = collected.content.split(" ")[0];
            let object = collected.content.split(" ")[1];
            let playerData;
            playerData = nowPlaying.id === players[0].id ? players[0] : players[1];
            if (
                color.toLowerCase() === playerData.pickedColor.toLowerCase()  &&
                object.toLowerCase()  === playerData.pickedObject.toLowerCase()
            ) {
                await collector.stop();
                await message.channel.send(
                    `**${nowGuessing.user.username}**, that was correct!`
                );
                return await this.sceneOneStart(
                    message,
                    nowGuessing,
                    nowPlaying,
                    players
                );
            } else {
                await collector.stop();
                await message.channel.send(
                    `**${nowGuessing.user.username}**, that wasn't correct :/`
                );
                return await this.end(message, nowPlaying, players);
            }
        });
    }

    async end(message, winner, players) {
        let playerData;
        console.log(players);
        if (winner.id === players[0].id) playerData = players[0];
        if (winner.id === players[1].id) playerData = players[1];
        players[0].active = false;
        players[1].active = false;
        players[0].id = 0;
        players[1].id = 0;
        setTimeout(() => {
            return message.channel.send(
                new Discord.MessageEmbed()
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

module.exports.createISpy = createISpy
