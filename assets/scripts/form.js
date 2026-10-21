//Deven Weeden 340 proj 1
const day = 24 * 60 * 60 * 1000;
function createForm(version){  
    //sets up the body fo the form
    var formCnt = document.createElement('div');
    document.getElementById('main').appendChild(formCnt);
    var form = document.createElement('form');
    form.id = 'form';
    //runs validation when the form is submitted
    form.onsubmit = async function(event) {
        let hld = await validate();
        if(!hld){
          event.preventDefault();  
        }
    };
    //form title
    formCnt.appendChild(form);
    var thanks = document.createElement('h2');
    thanks.textContent = "Thanks for playing!";
    form.appendChild(thanks);
    //form subtitle
    var message = document.createElement('h3');
    message.textContent = "Make a profile to unlock infinite play:";
    form.appendChild(message);
    //setting up username input
    //label first
    var pUn = document.createElement('p');
    var labelUser = document.createElement('label');
    labelUser.textContent = "Username: ";
    pUn.appendChild(labelUser);
    //then the field
    var username = document.createElement('input');
    username.id = 'username'; 
    pUn.appendChild(username);
    form.appendChild(pUn);
    //setting up email input, same way as username
    var pEm = document.createElement('p');
    var labelEmail = document.createElement('label');
    pEm.appendChild(labelEmail);
    labelEmail.textContent = "Email: ";
    var email = document.createElement('input');
    email.id = 'email';
    pEm.appendChild(email);
    form.appendChild(pEm);
    //creating the submit button
    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.id = 'submit';
    form.appendChild(submit);
    //this auto fills the forms fields with the info stored locally
    var savedUn = localStorage.getItem('username');
    var savedEm = localStorage.getItem('email');
        if (savedUn) {
            var username = document.getElementById('username');
            if (username) {
                username.value = savedUn;
            }
        }
        if (savedEm) {
            var email = document.getElementById('email');
            if (email) {
                email.value = savedEm;
            }
        } 
}
//validation function
async function validate() {
    //making an array to store the error message
    var errMsg = [];
    var start = "complete the following fields: ";
    function sanitize(input) {
        return input.replace(/['"\\;]/g, '');
    }
    //making sure the username is valid, throwing an error if it is not
    var username = sanitize(document.getElementById("username").value);
    if (!username) {
        errMsg.push("Username");
        document.getElementById("username").style.color = "red";
    }
    var email = sanitize(document.getElementById("email").value);
    //making sure the email does not have unallowed symbols
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email && emailRegex.test(email)) {
        errMsg.push("Email");
        document.getElementById("email").style.color = "red";
    }
    if (errMsg.length) {
        alert(start + " " + errMsg)
        return false;
    }else{
    //saving username and email to local storage, using a cookie to store completion.
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    if(document.cookie){
        if(! await cookieStore.get('finish')){
            cookieStore.set({ name: 'finish', value: 'you did it', expires: Date.now() + day,})
        }
    }else{
        localStorage.setItem('finish', true);
    }
    return true;
}
}
