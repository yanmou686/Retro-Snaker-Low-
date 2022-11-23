//记分牌的类
class ScroePanel {
  score: number = 0;
  level: number = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  //设置一个变量来限制等级
  maxLevel: number;
  //设置一个变量来表示多少分升一级
  upScore: number;
  constructor(maxLevel: number = 10, upScore: number = 3) {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  /* 设置加分的方法 */
  addScore() {
    this.score++;
    this.scoreEle.innerHTML = this.score + ""; //需要拼串，innerHTML不支持number类型
    /* 判断分数是多少，用来增加管卡难度 */
    if (this.score % this.upScore === 0) {
      //每吃十个就升一级
      this.levelUp();
    }
  }

  /* 提升等级的方法 */
  levelUp() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.levelEle.innerHTML = this.level + "";
    }
  }
}
const scorePanel = new ScroePanel();

export default ScroePanel;
