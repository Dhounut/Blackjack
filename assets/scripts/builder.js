//Deven Weeden 340 proj 1
function initialize(data){
    if(typeof(data) == "string"){    
        var hld = menus[data]
         if(hld!=undefined){
        makeSelect(hld,menus[data][0]);
         }
    }else{
        var hld = menus[data.value]
        //removal code, checks to see if its the last child, then deletes other options if needed.
       while(data != data.parentNode.lastChild){
            data.parentNode.removeChild(data.parentNode.lastChild);       
        }
        if(hld!=undefined){
            makeSelect(hld,menus[data.value][0]);
        }
    }
} 
//this function handles the creation of the select, option nodes
function makeSelect(hld,func){
    let i = 1; //i starts at 1 because 0 holds the function and should not be displayed
    var len = hld.length;
    var sel = document.createElement('select')
    sel.setAttribute('onchange', func);
    sel.setAttribute('name', 'menu')
    //this loop adds the options to the select node
    while (i < len) {
        let option = document.createElement('option');
        if (i === 1) {
            //this makes the first option for display only
            option.selected = true;
            option.disabled = true;
        }
        option.textContent = hld[i]; 
        sel.appendChild(option);
        i++;
    }
    document.getElementById('main').appendChild(sel);
    requestAnimationFrame(animate);
}

function animate(){
    //manages the fade in animation
    let subject = document.getElementById('main').lastChild;
    if(!subject.style.opacity){
        //sets opacity to 0 if its a new select object
        subject.style.opacity = 0;
    }
    //parseFloat because we are dealing with decimals
    let op = parseFloat(subject.style.opacity) + 0.01 ;
        if(op < 1){
		subject.style.opacity = op;
		requestAnimationFrame(animate);
	}
}
//this function creates the final node with the summary of choices
function createChoices() {
    //creating the node
    let pathCnt = document.createElement('div');
    let pathTxt = document.createElement('p');
    //grabbing all the selected choices
    let menus = document.querySelectorAll('select[name="menu"]');
    // making a string of selected option texts
    let path = Array.from(menus).map(menu => menu.options[menu.selectedIndex].textContent).join(' , ') + '.';
    pathTxt.textContent = `Your path: ${path}`;
    //displaying the message
    pathCnt.appendChild(pathTxt);
    document.getElementById('main').appendChild(pathCnt);
}
function finish(){
    createChoices();
    createForm();
}


