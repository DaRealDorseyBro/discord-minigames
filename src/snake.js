let Discord,
  { Message, MessageEmbed } = require("discord.js");
class snake {
  constructor(message, color) {
    this.message = message;
    this.color = color ? color : "#ff9966";
    this.foods = ["🍎", "🥧"];
    this.food = this.foods[Math.floor(Math.random() * this.foods.length)];
    this.snake = "🟢";
    this.head = "🔴";
    this.end = "🟢";
    this.blank = "⬛";
    this.dontHit = "🟨";
    this.snakeLen = 1;
    this.snakePos = [{ x: 0, y: 0 }];
    this.foodPos = { x: 0, y: 0 };
    this.startBoard = this.createEmptyBoard(10);
  }
  createEmptyBoard(size) {
    const boardToReturn = [];
    for (let j = 0; j < size; j++) {
      const section = [];
      for (let i = 0; i < size; i++) section.push(this.blank);
      boardToReturn.push(section);
    }
    return boardToReturn;
  }

  initializeBoard(board) {
    const randColIndex = Math.floor(Math.random() * board.length);
    const randRowIndex = Math.floor(Math.random() * board[0].length);

    this.snakePos[0].y = randColIndex;
    this.snakePos[0].x = randRowIndex;

    const randFoodCol = Math.floor(Math.random() * board.length);
    const randFoodRow = Math.floor(Math.random() * board[0].length);

    this.foodPos.y = randFoodCol;
    this.foodPos.x = randFoodRow;

    board[randColIndex][randRowIndex] = this.head;
    board[randFoodCol][randFoodRow] = this.food;

    let string = "";

    string = string.concat(`${this.dontHit.repeat(12)}\n`);
    for (const section of board)
      string += `${this.dontHit}${section.join("")}${this.dontHit}\n`;
    string = string.concat(`${this.dontHit.repeat(12)}\n`);

    return { arrBoard: board, strBoard: string };
  }
  renderBoard() {
    const board = this.createEmptyBoard(10);

    for (let i = 0; i < this.snakePos.length; i++) {
      let pos = this.snakePos[i];
      if (i === 0) board[pos.y][pos.x] = this.head;
      else if (i === this.snakePos.length - 1) board[pos.y][pos.x] = this.end;
      else board[pos.y][pos.x] = snake;
    }

    board[this.foodPos.y][this.foodPos.x] = this.food;
    let string = "";

    string = string.concat(`${this.dontHit.repeat(12)}\n`);
    for (const section of board)
      string += `${this.dontHit}${section.join("")}${this.dontHit}\n`;
    string = string.concat(`${this.dontHit.repeat(12)}\n`);

    return { arrBoard: board, strBoard: string };
  }
  async create(message) {
    if (!message) throw new Error("Message param must be provided");
    if (!message instanceof Discord.Message)
      throw new Error("Message must be a discord message");
    const data = this.initializeBoard(this.startBoard);
    this.startBoard = data.arrBoard;

    const startEmbed = new Discord.MessageEmbed()
      .setColor(this.color)
      .setAuthor(`Snake`, message.author.displayAvatarURL({ format: "png" }))
      .setDescription(
        `Length: ${this.snakeLen}\nHead: ${this.head}\nBody: ${snake}\nFood: ${this.food}\nGoal: Eat as many ${this.food}\'s as you can and grow your snake\n${data.strBoard}`
      );
    const start = await message.channel.send("", { embed: startEmbed });
    this.start = start;
    const reactions = ["⬆️", "⬇️", "⬅️", "➡️"];

    reactions.map(async r => await start.react(r));
    this.reactions = reactions;
    this.initCol(message);
  }
  randomizeFood(board) {
    const newX = Math.floor(Math.random() * board.length);
    const newY = Math.floor(Math.random() * board[0].length);
    return { x: newX, y: newY };
  }
  checkFood(board, x, y) {
    if (board[y] && board[y][x] && board[y][x] === this.food) {
      board[y][x] = snake;
      let newSpace = this.randomizeFood(board);
      let spaceOnBoard = board[newSpace.y][newSpace.x];

      while (spaceOnBoard !== this.blank) {
        newSpace = this.randomizeFood(board);
        spaceOnBoard = board[newSpace.y][newSpace.x];
      }

      this.foodPos.y = newSpace.y;
      this.foodPos.x = newSpace.x;

      return true;
    } else return false;
  }
  addLength(dirrection) {
    if (dirrection === "up")
      this.snakePos.push({ x: this.snakePos[0].x, y: this.snakePos[0].y + 1 });
    else if (dirrection === "down")
      this.snakePos.push({ x: this.snakePos[0].x, y: this.snakePos[0].y - 1 });
    else if (dirrection === "left")
      this.snakePos.push({ x: this.snakePos[0].x + 1, y: this.snakePos[0].y });
    else if (dirrection === "right")
      this.snakePos.push({ x: this.snakePos[0].x - 1, y: this.snakePos[0].y });
    this.snakeLen++;
  }
  checkSnake(board, x, y) {
    if (board[y] && board[y][x] && board[y][x] === snake) return true;
    else return false;
  }

  die(collector) {
    collector.stop();
    this.start.edit(
      `${this.message.author}, you got a total score of ${this.snakeLen}!`,
      {
        embed: null
      }
    );
  }
  move(dir) {
    switch (dir) {
      case "up":
        const newHeadPosU = {
          x: this.snakePos[0].x,
          y: this.snakePos[0].y - 1
        };
        this.snakePos.unshift(newHeadPosU);
        this.snakePos.pop();
        break;
      case "down":
        const newHeadPosD = {
          x: this.snakePos[0].x,
          y: this.snakePos[0].y + 1
        };
        this.snakePos.unshift(newHeadPosD);
        this.snakePos.pop();
        break;
      case "left":
        const newHeadPosL = {
          x: this.snakePos[0].x - 1,
          y: this.snakePos[0].y
        };
        this.snakePos.unshift(newHeadPosL);
        this.snakePos.pop();
        break;
      case "right":
        const newHeadPosR = {
          x: this.snakePos[0].x + 1,
          y: this.snakePos[0].y
        };
        this.snakePos.unshift(newHeadPosR);
        this.snakePos.pop();
        break;
    }
  }

  initCol(message) {
    const filter = (reaction, user) =>
      this.reactions.includes(reaction.emoji.name) &&
      user.id === message.author.id;
    const collector = this.start.createReactionCollector();
    collector.on("collect", async (reaction, user) => {
      const Head = this.snakePos[0];

      switch (reaction.emoji.name) {
        case "⬆️":
          if (this.checkSnake(this.startBoard, Head.x, Head.y - 1))
            return this.die();
          if (this.checkFood(this.startBoard, Head.x, Head.y - 1))
            this.addLength("up");
          this.move("up");
          if (Head.y - 1 < 0) return this.die();
          break;
        case "⬇️":
          if (this.checkSnake(this.startBoard, Head.x, Head.y + 1))
            return this.die();
          if (this.checkFood(this.startBoard, Head.x, Head.y + 1))
            this.addLength("down");
          this.move("down");
          if (Head.y + 1 > this.startBoard.length - 1) return this.die();
          break;
        case "⬅️":
          if (this.checkSnake(this.startBoard, Head.x - 1, Head.y))
            return this.die();
          if (this.checkFood(this.startBoard, Head.x - 1, Head.y))
            this.addLength("left");
          this.move("left");
          if (Head.x - 1 < 0) return this.die();
          break;
        case "➡️":
          if (this.checkSnake(this.startBoard, Head.x + 1, Head.y))
            return this.die();
          if (this.checkFood(this.startBoard, Head.x + 1, Head.y))
            this.addLength("right");
          this.move("right");
          if (Head.x + 2 > this.startBoard[0].length) return this.die();
          break;
      }

      const newData = this.renderBoard();
      this.startBoard = newData.arrBoard;

      const newEmbed = new Discord.MessageEmbed()
        .setColor(this.color)
        .setAuthor(`Snake`, message.author.displayAvatarURL({ format: "png" }))
        .setDescription(
          `Length: ${this.snakeLen}\nHead: ${this.head}\nBody: ${snake}\nFood: ${this.food}\nGoal: Eat as many ${this.food}\'s as you can and grow your snake\n${newData.strBoard}`
        );
      this.start.edit("", { embed: newEmbed });
    });
  }
}

module.exports.snake = snake;
