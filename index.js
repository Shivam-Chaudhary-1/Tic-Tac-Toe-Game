
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let CurrentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// create a function to initialsie the game
function initGame(){
    CurrentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI pr boxes ko empty krna prega
    boxes.forEach((box, index) =>{
            box.innerText = "";
            boxes[index].style.pointerEvents = "all";
            // initialises boxes with CSS properties again
            box.classList = `box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${CurrentPlayer}`;
}

initGame();

function swapTurn(){
    if(CurrentPlayer === "X"){
        CurrentPlayer = "0";
    }
    else{
        CurrentPlayer = "X";
    }
    // UI update
    gameInfo.innerText = `CurrentPlayer - ${CurrentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position) => {
        // all 3 boxes should be non-empty and same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && 
        (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])
       ) {
        // check if winneer is X
        if(gameGrid[position[0]]  === "X")  
            answer = "X";
        else
           answer = "0";

        // disable pointer events
          boxes.forEach((box) =>{
            box.style.pointerEvents = "none";
          })

        // now we known to winning player
         boxes[position[0]].classList.add("win");
         boxes[position[1]].classList.add("win");
         boxes[position[2]].classList.add("win");
       }
    });
    
    // we have a winner
    if(answer !== ""){
          gameInfo.innerText = `Winner Player - ${answer}`;
          newGameBtn.classList.add("active");
          return;
    }

    // lets check whether there is a tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });
    
    // board is filled, game is TIED
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index){
   if(gameGrid[index] === ""){
    boxes[index].innerText = CurrentPlayer;
    gameGrid[index] = CurrentPlayer;
    boxes[index].style.pointerEvents = "none";
    // swap player's turn
    swapTurn();
    // check if any player has won
    checkGameOver();
   }
}


boxes.forEach((box, index) =>{
    box.addEventListener("click",() =>{
        handleClick(index);
    })
}
) 

newGameBtn.addEventListener("click", initGame);

