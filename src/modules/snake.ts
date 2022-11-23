class Snake {
  //获取蛇头的元素
  head: HTMLElement;
  //获取蛇身的元素(包括蛇头)  数组
  bodies: HTMLCollection;
  //获取蛇的容器div
  element: HTMLElement;
  constructor() {
    this.head = document.querySelector("#snake>div")!;
    this.bodies = document.getElementById("snake")!.getElementsByTagName("div");
    this.element = document.getElementById("snake")!;
  }

  //获取蛇的X坐标 (蛇头的坐标)
  get X() {
    return this.head.offsetLeft;
  }
  //获取蛇的Y坐标 (蛇头的坐标)
  get Y() {
    return this.head.offsetTop;
  }

  //设置蛇头的坐标
  set X(value) {
    //如果新值和旧值相同则直接返回不做修改
    if (this.X == value) {
      return;
    }
    //X的合法范围是0-290之间
    if (value < 0 || value > 290) {
      //进入判断说明蛇撞墙了,抛出异常
      throw new Error("蛇撞墙了");
    }
    //修改X时，是在水平方向移动，不能在向左移动时向右移动 反之亦然
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      //发生了掉头,蛇需要向反方向继续移动
      if (value > this.X) {
        /* console.log("禁止向右"); */
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    this.moveBody();
    this.head.style.left = value + "px";
    this.checkHeadBody();
  }
  set Y(value) {
    if (this.Y == value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了");
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }

    this.moveBody();
    this.head.style.top = value + "px";
    this.checkHeadBody();
  }

  //蛇增加身体的方法
  addBody() {
    //向element添加蛇的身体
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  //身体的移动
  moveBody() {
    /*   从后往前存储
    第四节 = 第三节
    第三节 = 第二节
    第二节 = 第一节 
    */
    //遍历获取我们所有的身体节点
    for (let i = this.bodies.length - 1; i > 0; i--) {
      //获取前面身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      //将获取到的位置 值赋予给当前身体
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

  //检查最新的蛇头坐标
  checkHeadBody() {
    //获取所有的身体，检查是否和蛇头的坐标有重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let X = (this.bodies[i] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i] as HTMLElement).offsetTop;
      if (this.X === X && this.Y === Y) {
        throw new Error("撞到自己了!!!");
      }
    }
  }
}

export default Snake;
