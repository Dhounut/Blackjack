// Deven Weeden 2025 340 Proj 1
//This is definetly overkill but I had a lot of fun making this
var hld = '';
var infinite = false;
var playerScore = 0;
var dealerScore = 0;
var dialouge = document.createElement('header');
var dDone = false;
var wins = 0;
var losses = 0;
var draws = 0;
function delay(ms) {
    return new Promise( function(resolve) {
        setTimeout(resolve, ms);
    });
}
dialouge.setAttribute('id', 'dialogueMenu');
function startGame(){
    playerScore=0;
    dealerScore=0;
    //Clears the screen w/ the exception of the reset button
    //to allow ample room for the game
    document.getElementById('main').appendChild(dialouge);
    if(dialouge.firstChild)
        while(document.getElementById('dialogueMenu').firstChild){
        document.getElementById('dialogueMenu').removeChild(document.getElementById('dialogueMenu').firstChild);
    }
    playGame()
    
}
async function playGame(){
    //player is dealt two cards, dealer is dealt two cards (one face down), 
    //then the player can take action
    //the delay adds a bit of tension
    await delay(500);
    hit(0);
    await delay(500);
    hit(0);;
    await delay(500);
    hit(1);
    initialize('moves')
}
//(who) exists to keep track of who is hitting
function hit(who){
    let dealtCard = 0;
    let name = '';
    let score = parseInt(0);
    dealtCard = generateCard();
    //who == 0, means the player is hitting, otherwise the dealer is hitting
    if(who == 0){
        name = 'The Gambler';
        score = playerScore;
        //Aces can either be 1 or 11
        //this block of code works out what the ace should be worth based on the current score
        if(dealtCard[0] == 'Ace'){
            if(parseInt(score)+11<=21){
                hitReport(name,score,2,dealtCard);
                playerScore+=parseInt(dealtCard[2]);
            }
        }else{
            hitReport(name,score,1,dealtCard)
            playerScore+=parseInt(dealtCard[1]);
        }
    } else{
        name = 'The Dealer';
        score = dealerScore;
        if(dealtCard[0] == 'Ace'){
            if(parseInt(score)+11<=21){
                hitReport(name,score,2,dealtCard);
                dealerScore+=parseInt(dealtCard[2]);
            }
        }else{
            hitReport(name,score,1,dealtCard)
            dealerScore+=parseInt(dealtCard[1]);
        }
    }
    }

function generateCard(){
    //Pulls a random card from cards.js
    let cardNum = Math.floor(Math.random() * 13) + 1; // Always 1–13
    return cards[cardNum];
}

async function dealer(){
    //Dealer draws to 16 and stays on all 17s
    while(!dDone){
    if(dealerScore < 16){
        await delay(500)
        hit(1);
    } else{
        dDone = true;
        gameReview();
    }
}
}

async function hitReport(name,score,ace,newCard){
    let rand = Math.random()*2500;
    //this function reports the result of a hit, it also handles busting out.
    let reporter=document.createElement('div');
    reporter.setAttribute('name', 'entry');
    score = parseInt(score) + parseInt(newCard[ace])
    //checks for a bust
    if(score > 21){
        hld = document.createTextNode(name +' was dealt a '+ newCard[0] + '...' + " " + name + ' BUSTED OUT');
        //sees who busted
        if(name=='The Dealer'){
            //the if(!infinite) exists to facilitate freeplay.
            if(!infinite){
            report(reporter, hld);
            startEnd('win');
            } else{
                dDone=true;
                report(reporter, hld);
                wins = wins + 1;
                document.getElementById('main').removeChild(document.getElementById('main').lastChild); 
                // this line needs to be present in every loop condition or you get infinetly stacking option boxes
                loop();
            }
        }else{
            if(!infinite){
            report(reporter, hld);
            startEnd('loss');
            }else{
                dDone=true;
                report(reporter, hld);
                losses = losses + 1;
                document.getElementById('main').removeChild(document.getElementById('main').lastChild);
                loop();
            }
        }
    }else 
        hld = document.createTextNode(name +' was dealt a '+ newCard[0] + ' bringing their score to: ' + score);
        report(reporter, hld)
}

async function gameReview(){
    //If niether player busts this function handles who wins.
    let reporter=document.createElement('div');
    reporter.setAttribute('name', 'entry');
    if(parseInt(playerScore) > parseInt(dealerScore)){
        await delay(1000)
        hld = document.createTextNode('The Gambler' +' Wins!');
        report(reporter, hld);
        if(!infinite){
            startEnd('win')
            } else{
                wins = wins + 1;
                document.getElementById('main').removeChild(document.getElementById('main').lastChild);
                loop();
            }

    }else if(parseInt(playerScore) == parseInt(dealerScore)){
        //drawing boots you back to the narritive section, in real life you would just lose
        //so this version of blackjack is actually fair.
        await delay(1000)
        hld = document.createTextNode("Its a draw...")
        if(!infinite){
        report(reporter, hld);
        initialize('draw'); 
        } else{
            draws = draws + 1;
            report(reporter, hld);
            document.getElementById('main').removeChild(document.getElementById('main').lastChild);
            loop();
        }
    } 
    else if(parseInt(dealerScore)>parseInt(playerScore)){
        await delay(1000)
        hld = document.createTextNode('The Dealer' +' Wins!');  
        report(reporter, hld);
        if(!infinite){
            startEnd('loss')
            }else{
                
                losses = losses + 1;
                document.getElementById('main').removeChild(document.getElementById('main').lastChild);
                loop();
            }

    }
}

function startEnd(version){
    document.getElementById('main').appendChild(dialouge);//failsafe because dialogue gets randomly destroyed sometimes
    //creates a button that will start the ending, this allows game review instead of 
    //instantly kicking players to the ending.
    let endBtn = document.createElement('button');
    endBtn.setAttribute('id', 'endBtn');
    endBtn.setAttribute('onclick', 'end("'+String(version)+'")');
    endBtn.appendChild(document.createTextNode('Continue')); 
    document.getElementById('main').appendChild(endBtn);
}

function end(){
    let btn = document.getElementById('endBtn') 
    document.getElementById('main').removeChild(btn);
    document.getElementById('main').removeChild(dialouge);
    createChoices();
    createForm();
}

function report(reporter, hld){
    //this helper function streamlines adding entries to the game interface
    reporter.appendChild(hld);
    dialouge.prepend(reporter);
}

function wipe(){
    // clears main
    while(document.getElementById('main').firstChild){
    document.getElementById('main').removeChild(document.getElementById('main').firstChild);
    }
    
}

async function processMove(dom){
    //this function processes the moves (go figure)
    let reporter=document.createElement('div');
    reporter.setAttribute('name', 'entry');
    //func caller grabs the name of the move and then its checked to see which move it is, finally the move is executed.
    let funcCaller = dom.value;
    if(funcCaller=='hit'){
        //the removeChild lines are here to stop the select boxes from piling up while still being dynamically created / destroyed
        if(infinite){
        document.getElementById('main').removeChild(document.getElementById('main').lastChild);
        }
        initialize('moves');
        await delay(500)
        hit(0)

    }
    if(funcCaller=='stay'){
        if(dDone == true){
            dDone = false;
        }
        if(infinite){
        document.getElementById('main').removeChild(document.getElementById('main').lastChild);
        }
        dealer();
    }
    if(funcCaller =='fold'){
        if(!infinite){
            let hld = document.createTextNode("You folded")
            report(reporter, hld);
            startEnd('fold');
            }
        else{
        document.getElementById('main').removeChild(document.getElementById('main').lastChild);
        losses = losses + 1;
        loop();
    }
    }
}
//checks to see if youve finished the main expierence
async function completionCheck(){
    if(!infinite){
    if(document.cookie){
        if(await cookieStore.get('finish')){
            infinite=true;
            wipe();
            startGame();
        }else{
            alert('You dont have access to freeplay yet.')
        }
    }else{
    if(localStorage.getItem('finish')){
        infinite = true
        wipe();
        startGame();
    }else{
        alert('You dont have access to freeplay yet.')
    }
}
    }
}
async function loop(){
    let reporter=document.createElement('div');
    reporter.setAttribute('name', 'entry');
    document.getElementById('main').appendChild(dialouge);//failsafe because dialogue gets removed occasionally
    await delay(1500);
    hld = document.createTextNode(wins + ' ' + losses + ' ' + draws);
    report(reporter, hld);
    dealerScore = 0;
    playerScore = 0;
    playGame();
}