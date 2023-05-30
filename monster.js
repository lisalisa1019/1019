var monster_colors = "072ac8-1e96fc-a2d6f9-fcf300-ffc600".split("-").map(a=>"#"+a)

class Monster{  //宣告一個怪物類別，名稱為Monster
    constructor(args){ //預設值,基本資料(物件的顏色,移動的速度,大小,初始顯示位置.....)
        this.r = args.r || random(50,100) //設計怪物的主體,就傳參數args.r來設定飛彈大小,沒有傳參數,就以100為直徑
        this.p = args.p || createVector(random(width),random(height)) //建立一個向量,{x:width/2 , y:height/2}
        this.v = args.v || createVector(random(-1,1),random(-1,1)).limit(10) //移動的速度，如果沒有船args參數，就會利用亂數(-1,1)，抽出x,y軸的移動速度
        this.color = args.color || random(monster_colors)
        this.mode = random(["happy","bad"])  //+++++++++++++++++++++++++
        this.deed = false
        this.timenum = 0 //延長時間，讓它顯示
    }
    draw() {
      if (this.deed == false) {
        push();
        translate(this.p.x, this.p.y);
        fill(this.color);
        noStroke();
        ellipse(0, 0, this.r);
    
        if (this.mode == "happy") {
          fill("#FF0000");
          ellipse(-this.r / 4, -this.r / 5, this.r / 6, this.r / 6);
          ellipse(this.r / 4, -this.r / 5, this.r / 6, this.r / 6);
          fill("#000000");
          arc(0, this.r / 4, this.r / 2, this.r / 2, PI, 2 * PI, CHORD);
        } else {
          fill("#FFFFFF");
          ellipse(-this.r / 4, -this.r / 5, this.r / 6, this.r / 6);
          ellipse(this.r / 4, -this.r / 5, this.r / 6, this.r / 6);
          fill("#000000");
          arc(0, this.r / 4, this.r / 2, this.r / 2, PI, 2 * PI, CHORD);
        }
    
        pop();
      } else {
        this.timenum = this.timenum + 1;
        push();
        translate(this.p.x, this.p.y);
        fill(this.color);
        noStroke();
        ellipse(0, 0, this.r);
        stroke(255);
        line(-this.r / 2, 0, this.r / 2, 0);
        stroke(this.color);
        strokeWeight(4);
        noFill();
        for (var j = 0; j < 8; j++) {
          rotate(PI / 4);
          line(this.r / 2, 0, this.r, 0);
        }
        pop();
      }
    }
    update(){  //計算出移動元件後的位置
        this.p.add(this.v)
        //+++++++++++++++++++碰地彈回++++++++++++++++++++++++++++++++
        if(this.p.x<=0 || this.p.x>=width){//x軸碰到左邊(<=0)，或是碰到右邊(>=height)
            this.v.x = -this.v.x  //把x軸速度方向改變
        }
        if(this.p.y<=0 || this.p.y>=height){ //y軸碰到上邊(<=0)，或是碰到下邊(>=height)
          this.v.y = -this.v.y //把y軸方向速度改變
    }
    }
    isBallInRanger(x,y){  //功能:判斷飛彈是否在怪物的範圍內
        let d = dist(x,y,this.p.x,this.p.y) // 計算兩點(滑鼠)
        if(d<this.r/2){
          return true  //飛彈(x,y)與物件的距離，代表觸碰了，則傳回true的值
      }else{
        return false //飛彈(x,y)與物件的寬度，代表觸碰了，則傳回true的值
      }
    }

}
