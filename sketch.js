let points = [
  [1/2, 11/2], [4/2, 10/2], [7/2, 10/2], [11/2, 9/2], [13/2, 8/2], [15/2, 5/2], [15/2, 3/2],
  [16/2, 1/2], [16/2, -1/2], [15/2, -1/2], [11/2, 1/2], [9/2, 2/2], [7/2, 1/2], [5/2, -1/2],
  [1/2, -1/2], [0, 0], [3/2, 1/2], [1/2, 1/2], [-2/2, 0], [-6/2, -2/2], [-9/2, -6/2], [-9/2, -7/2],
  [-7/2, -9/2], [-7/2, -11/2], [-8/2, -12/2], [-9/2, -11/2], [-11/2, -10/2], [-13/2, -11/2],
  [-15/2, -11/2], [-17/2, -12/2], [-17/2, -10/2], [-15/2, -7/2], [-12/2, -6/2], [-11/2, -6/2],
  [-10/2, -3/2], [-8/2, 2/2], [-5/2, 6/2], [-3/2, 9/2], [-4/2, 10/2], [-5/2, 10/2], [-2/2, 12/2],
  [1/2, 11/2],[1/2, 11/2],[1/2, 11/2], [4/2, 10/2], [7/2, 10/2]
];
var fill_colors = "9c89b8-f0a6ca-efc3e6-f0e6ef-b8bedd".split("-").map(a=>"#"+a)
var line_colors = "ffd6ff-e7c6ff-c8b6ff-b8c0ff-bbd0ff".split("-").map(a=>"#"+a)

//++++++++設定畫points所有"點"的物件變數
var ball //"目前要處理"的物件,暫時放在ball變數內
var balls =[] //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//+++++++++++++++++++++

//++++++++設定飛彈物件的變數
var bullet  //"目前要處理"的物件,暫時放在ball變數內
var bullets =[] //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//+++++++++++++++++++++

//++++++++設定怪物物件的變數
var monster  //"目前要處理"的物件,暫時放在monster變數內
var monsters =[] //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//+++++++++++++++++++++設定砲台位置
var shipP
//+++++++++++++++


var score=0

function preload(){ //程式碼準備執行之前,所執行的程式碼內容,
  obj_sound=loadSound("sound/e25a1-9lfg7.wav")
  bullet_sound=loadSound("sound/Launching wire.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP= createVector(width/2,height/2) //預設砲台位置為()
  for(var i=0;i<10;i=i+1){ //i=0、1、2、3、4、...、8、9
    ball = new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball的物件放入到balls陣列內
  }
  for(var i=0;i<10;i=i+1){ //i=0、1、2、3、4、...、8、9
    monster = new Monster({}) //產生一個Obj class元件
    monsters.push(monster) //把ball的物件放入到balls陣列內
  }
}

function draw() {
 background(220);

if(keyIsPressed){
  if(key=="ArrowLeft" || key=="a"){ //按下鍵盤的往左鍵或a建
    shipP.x = shipP.x - 5
  }
  if(key=="ArrowRight"|| key=="d"){//按下鍵盤的往左鍵或d建
    shipP.x = shipP.x + 5
  }
  if(key=="ArrowUp"|| key=="w"){//按下鍵盤的往左鍵或w建
    shipP.y = shipP.y - 5
  }
  if(key=="ArrowDown"|| key=="s"){//按下鍵盤的往左鍵或s建
    shipP.y = shipP.y + 5
}


}

//大象的顯示
for(let ball of balls) //只要是陣列的方式，都可以利用此方式處理
 {
  ball.draw()
  ball.update()
  for(let bullet of bullets){ //檢查每一個飛彈物件
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有沒有接觸現在的ball
        balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))
        bullets.splice(bullets.indexOf(bullet),1)
        score = score - 1
        obj_sound.play()
      }

  }
 }


 //飛彈的顯示
 for(let bullet of bullets) //只要是陣列的方式，都可以利用此方式處理
 {
  bullet.draw()
  bullet.update()
 }
 //怪物的顯示
 for(let monster of monsters) //只要是陣列的方式，都可以利用此方式處理
 {
  if(monster.deed == true && monster.timenum>4){
    monsters.splice(monsters.indexOf(monster),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))
  }
  monster.draw()
  monster.update()
  for(let bullet of bullets){ //檢查每一個飛彈物件
    if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有沒有接觸現在的ball
      //monsters.splice(monsters.indexOf(monster),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))
      bullets.splice(bullets.indexOf(bullet),1)
      score = score + 1
      monster.deed = true //
    }

}
 }

textSize(50)
text(score,50,50) //在座標為(50,50)上，顯示score分數內容
push() //重新規劃原點(0,0),在視窗的中間
  let dx = mouseX - width/2
  let dy = mouseY - height/2
  let angle = atan2(dy,dx)
  translate(shipP.x,shipP.y) //把砲台中心點放在視窗中間
  fill("#c9ada7")
  noStroke()
  rotate(angle)
  triangle(-25,-25,-25,25,50,0) //設定三個點,畫成一個三角形
  ellipse(0,0,50)
pop() //恢復原本設定,原點(0,0)在視窗的左上角
}

function mousePressed(){
 //++++++++++++按一下產生一個飛彈+++++++++++++
 bullet = new Bullet({}) //在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)
 bullets.push(bullet) //把bullet的物件放入到bullet陣列內(丟到倉庫)
 bullet_sound.play()
}

function keyPressed(){
  if(key==" "){  //按下空白建，發射飛彈，其實跟案下滑屬依樣
    bullet = new Bullet({}) //在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)
    bullets.push(bullet) //把bullet的物件放入到bullet陣列內(丟到倉庫)
    bullet_sound.play()
  }
 
}
