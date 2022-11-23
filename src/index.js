"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./style/index.less");
class Food {
    constructor() {
        this.element = document.getElementById("food");
    }
    //获取食物的坐标,判断食物的坐标和蛇的坐标
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
}
