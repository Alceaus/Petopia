const uname = document.getElementById('uname')
const pass = document.getElementById('pass')
const errorm = document.getElementById('error')

const ucont = document.getElementById('ucont')
const pcont = document.getElementById('pcont')

form.addEventListener("submit", (e) => {
    var errors = false;
    if(uname.value == null || uname.value === ''){
        ucont.classList.add('error');
        errors = true;
    }else{
        ucont.classList.remove('error');
    }
    

    if(pass.value == null || pass.value === ''){
        pcont.classList.add('error');
        errors = true;
    }else{
        pcont.classList.remove('error');
    }

    if (errors != false){
        e.preventDefault();
        errorm.innerHTML = "Fill out the missing fields";
    }
    else{
        errors = false;
        errorm.innerHTML=" ";
    }
})

/*
OLD CODE

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "web_dev") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})
*/