let started=false;
let level=0;
let btns=["blue","yellow","orange","red"];
let gameSeq=[];
let userSeq=[];
let h2=document.querySelector("h2");
let hScore=document.querySelector(".high-score span");
 
document.addEventListener("keypress",function(){
    
    //it start the game by preesing any key
    if(started==false){
        started=true;
            //increase level
             levelUp();
    } 
})

//it flash random button automatically.
function gameFlashBtn(randomBtn){
    randomBtn.classList.add("flash");
    setTimeout(function(){
        randomBtn.classList.remove("flash");
    },250);

}

//it flash button pressed by user.
function userFlashBtn(randomBtn){
    randomBtn.classList.add("user-flash");
    setTimeout(function(){
        randomBtn.classList.remove("user-flash");
    },250);

}

//  levleUp method to increase levele and 
//  flash random button automatically.
function levelUp(){
    userSeq=[]; // once level up user sequence become empty.
    level++; //level increased to 1 .
    h2.innerText=`level ${level}`; // assigned level here.

    //flashing random button using Math.random().
    let randomIdx=Math.floor(Math.random()*3);
    let randomColor=btns[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`);

    //stored random generated color button in gameSeq array.
    gameSeq.push(randomColor);
    gameFlashBtn(randomBtn); // calling gameFlashBtn.
}

function reset(){
    gameSeq=[];
    userSeq=[];
    level=0;
    started=false;
    
}

// checking gameSeq array and userSeq array to continue the game or over it.
//index is coming from userSeq array.
function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
            // delay the level here.
            //to understand which button pressed next.
            setTimeout( levelUp,1000); 
           
        }
    }else{
         h2.innerHTML=`<i>Game Over! </i><b> Your score was ${level-1} </b> <br>Press any key to start.`
         let body=document.querySelector("body");
         body.setAttribute("class","red");
         setTimeout(function(){
            body.removeAttribute("class");
         },100)

         //set high score

        if(level>hScore.innerText){
            localStorage.setItem("hScore",`${level-1}`);
            hScore.innerText=`${localStorage.getItem("hScore")}`;
        }
         
         reset();
      
    }

}

//it tracking which button flashed by user.
function buttonPress(){
    if(!started){
        return;
    }
    let btn=this;
    userFlashBtn(btn); // calling userFlashBtn.

    //store tracked color button in userSeq array.
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1); // passing last user pressed button index.
}

let allBtn=document.querySelectorAll(".btn");
for(btn of allBtn){
        btn.addEventListener("click",buttonPress);
    }

    

    



