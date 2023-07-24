const uname = document.getElementById('name')
const fur = document.getElementById('fur')
const weight = document.getElementById('weight')
const likes = document.getElementById('likes')
const dlikes = document.getElementById('dislikes')
const form = document.getElementById('form')
const error = document.getElementById('error')


form.addEventListener('submit',(e)=> {
    var errors = false;
    //name
    if(uname.value == null || uname.value === ''){
        uname.classList.add('error');
        errors = true;
    }else{
        uname.classList.remove('error');
    }

    //fur
    if(fur.value == null || fur.value === ''){
        fur.classList.add('error');
        errors = true;
    }else{
        fur.classList.remove('error');
    }

    //weight
    if(weight.value == null || weight.value === ''){
        weight.classList.add('error');
        errors = true;
    }else{
        weight.classList.remove('error');
    }

    //likes
    if(likes.value == null || likes.value === ''){
        likes.classList.add('error');
        errors = true;
    }else{
        likes.classList.remove('error');
    }

    //dislikes
    if(dlikes.value == null || dlikes.value === ''){
        dlikes.classList.add('error');
        errors = true;
    }else{
        dlikes.classList.remove('error');
    }

    if (errors!=0){
        e.preventDefault();
        error.innerHTML = "Fill out the missing fields";
    }
    else{
        error.innerHTML=" ";
    }
    
});
