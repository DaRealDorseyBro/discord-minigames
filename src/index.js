//BATTLES
const {createBattle} = require("./battle")
exports.startBattle = async function (member, message) { return createBattle(member, message) }
//I SPYS
const {createISpy} = require("./ispy")
exports.startISpy = async function (member, message) { return createISpy(member, message) }
