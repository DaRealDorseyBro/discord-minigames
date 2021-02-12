// Import files
const { createBattle } = require("./battle"), 
  { createISpy } = require("./ispy"),
  { snake } = require("./snake.js")
// Export files
module.exports = {
  ISpy: createISpy,
  startBattle: createBattle,
  snake
}

