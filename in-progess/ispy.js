import {MessageEmbed} from "discord.js";
exports.createISpy = async function(member, message) {
    const objects = {
        scene1: {
            scene: {
                url: "https://i.imgur.com/1SzSNJ8.png",
                name: "The Perfect Living"
            },
            purple: {

            },
            pink: {

            },
            blue: {

            },
            green: {

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
                    locations: ["bottom-left"],
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
    }
}