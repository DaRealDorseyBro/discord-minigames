//BATTLES
const {createBattle} = require("./battle")
module.exports.startBattle = async function (member, message) { return createBattle(member, message) }
//I SPYS
const {createISpy} = require("./ispy")
module.exports.ISpy = createISpy
//SNAKE GO BRRRRR
const { snake } = require("./snake.js")
module.exports.snake = snake
