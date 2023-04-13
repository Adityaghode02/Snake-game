//constants and variables of Snakida
let inputDir = { x:0 , y:0 }
 const musicSound= new Audio('Assets/music.mp3');
 const foodSound= new Audio('Assets/food.mp3');
 const GameOverSound= new Audio('Assets/GameOver.mp3');
 const moveSound= new Audio('Assets/move.mp3');

let lastPaintTime = 0;
let speed = 7;
let score = 0 ;

let snakeArray = [
    { x:4 , y:5 } ];

let food = {x:7 , y:8};

















//Game functions

function main(ctime){
    window.requestAnimationFrame(main);
if((ctime-lastPaintTime)/1000 < 1/speed){
     return;
    }
lastPaintTime = ctime;
gameEngine();
}














//functions for game over

function isCollide(snake){

    // if you bump into yourself
    for (let i = 1; i < snakeArray.length; i++) {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
        return true;
    }     
  }

  //if you bump into wall
  if(snake[0].x<=0 || snake[0].x>=12  || snake[0].y<=0 || snake[0].y>=12){
    return true;
  }
 else{
  return false;   }
}
















function gameEngine(){



    //updating the snake array and food after game over
    if(isCollide(snakeArray)){
        GameOverSound.play();
        musicSound.pause();
        alert("Game is over , press any key to play again!");
        snakeArray = [ { x:4 , y:5 } ];
        food = {x:7 , y:8};
        inputDir = { x:0 , y:0 }
        musicSound.play();
        score = 0;
        scoreBox.innerHTML= 'score : 0'; }








    
    // if you have eaten the food , increment the score and regenerate the food

    //update snake
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        foodSound.play();
        score +=1;


       // HiScore logic
        if(score>hiscorevalue){
            hiscorevalue = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscorevalue));
            hiBox.innerHTML = "HiScore : "+ hiscorevalue;
        }
        
      



        scoreBox.innerHTML= 'score : ' + score;
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x ,  y: snakeArray[0].y + inputDir.y});


    //update food location
        let a = 2; 
        let b = 11;
        food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
    }








    //moving the snake
    for (let i = snakeArray.length-2 ; i>=0; i--) {
        
        snakeArray[i+1]= {...snakeArray[i]};     
    }
    snakeArray[0].x +=inputDir.x;
    snakeArray[0].y +=inputDir.y;
















    
    //Display snake array and food

    //display the snake
Board.innerHTML = "";

snakeArray.forEach((e , index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if(index===0){
    snakeElement.classList.add('head');  }
    else{
    snakeElement.classList.add('tail');}
    Board.appendChild(snakeElement);

});






//display the food
foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    foodElement.classList.add('food');

    Board.appendChild(foodElement);
}



















// Main Logic starts here

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null)
{
    hiscorevalue = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscorevalue))
}
else{
    hiscorevalue = JSON.parse(hiscore);
    hiBox.innerHTML = "HiScore : "+ hiscore;
}









window.requestAnimationFrame(main);

window.addEventListener('keydown', e=>{
 
    //Starts the game

musicSound.play();    
inputDir = {x:0 , y:1};   
moveSound.play();

switch (e.key) {
    case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x =0 ;
        inputDir.y =-1 ;
        break;

    case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x =0 ;
        inputDir.y =1;
        break;

    case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x =-1;
        inputDir.y =0;
        break;

     case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x =1;
        inputDir.y =0;
        break;

    default:
        break;
}

});
