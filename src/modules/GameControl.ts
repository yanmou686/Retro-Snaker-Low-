//引入其他类
import Snake from "./snake";
import Food from "./Food";
import ScorePanel from "./scorePanel";

//游戏控制器
class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction: string = "";
  //isLive用来判断游戏是否结束
  isLive = true;
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }

  //游戏初始化,调用即开始
  init() {
    //绑定键盘按键按下的事件
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    this.run();
  }

  //创建一个键盘的响应函数
  keydownHandler(event: KeyboardEvent) {
    //event.key表示用户按下的是哪个键,检查值是否合法
    this.direction = event.key;
  }

  //创建一个控制蛇移动的方法
  run() {
    /* 根据方向 this.direction 来使蛇的位置改变 */
    //获取蛇的现在的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;
    switch (this.direction) {
      case "ArrowUp":
        Y -= 10;
        break;
      case "ArrowDown":
        Y += 10;
        break;
      case "ArrowLeft":
        X -= 10;
        break;
      case "ArrowRight":
        X += 10;
        break;
    }
    //检查蛇是否吃到食物
    if (this.checkEat(X, Y)) {
      this.food.change();
      this.scorePanel.addScore();
      this.snake.addBody();
    }
    //修改蛇的X和Y值
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (error) {
      //进入到catch,游戏结束
      alert((error as any).message + "，游戏结束");
      this.isLive = false;
    }

    //开启一个定时的调用  如果isLive为false就结束游戏
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  //检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    return X === this.food.X && Y === this.food.Y;
  }
}

export default GameControl;
