class Food {
  //定义一个属性表示食物所对应的元素
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("food")!; //没有叹号会报错，系统会认为没有这个元素
  }

  //获取食物的坐标,判断食物的坐标和蛇的坐标
  get X() {
    return this.element.offsetLeft;
  }
  get Y() {
    return this.element.offsetTop;
  }

  //随机生成食物位置   0-290的10的倍数   floor向下取整
  change() {
    let left = Math.floor(Math.random() * 30) * 10;
    let top = Math.floor(Math.random() * 30) * 10;
    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}

/* const food = new Food();
food.change();
console.log("food", food); */

export default Food;
