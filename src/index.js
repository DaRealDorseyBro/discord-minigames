//BATTLES
const {createBattle} = require("./battle")
exports.startBattle = async function (member, message) { return createBattle(member, message) }