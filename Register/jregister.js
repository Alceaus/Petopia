const email = document.getElementById('email')
const uname = document.getElementById('uname')
const pass = document.getElementById('pass')
const rpass = document.getElementById('rpass')
const error = document.getElementById('error')

form.addEventListener('submit',(e) => {
    var errors = false;
    //email
    if(email.value == null || email.value === ''){
        email.classList.add('error');
        errors = true;
    }else{
        email.classList.remove('error');
    }

     //uname
    if(uname.value == null || uname.value === ''){
        uname.classList.add('error');
        errors = true;
    }else{
        uname.classList.remove('error');
    }

    //pass
    if(pass.value == null || pass.value === ''){
        pass.classList.add('error');
        errors = true;
    }else{
        pass.classList.remove('error');
    }

    //rpass -- no input
    if(rpass.value == null || rpass.value === ''){
        rpass.classList.add('error');
        errors = true;
    }
    else if(rpass.value != pass.value || pass.value != rpass.value){
        rpass.classList.add('error');
        errors = true;
        
    }else{
        rpass.classList.remove('error');
        errors = false;
    }
    

    if (errors != false){
        e.preventDefault();
        error.innerHTML = "Fill out the missing fields";
    }
    else{
        errors = false;
        error.innerHTML="";
    }


});