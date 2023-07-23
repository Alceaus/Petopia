const uname = document.getElementById('name')
const fur = document.getElementById('fur')
const weight = document.getElementById('weight')
const likes = document.getElementById('likes')
const dlikes = document.getElementById('dislikes')
const form = document.getElementById('form')
const error = document.getElementById('error')


form.addEventListener('submit',(e)=> {
    var errors = 0;
    //name
    if(uname.value == null || uname.value === ''){
        uname.classList.add('error');
        errors++;
    }else{
        uname.classList.remove('error');
        errors--;
    }

    //fur
    if(fur.value == null || fur.value === ''){
        fur.classList.add('error');
        errors++;
    }else{
        fur.classList.remove('error');
        errors--;
    }

    //weight
    if(weight.value == null || weight.value === ''){
        weight.classList.add('error');
        errors++;
    }else{
        weight.classList.remove('error');
        errors--;
    }

    //likes
    if(likes.value == null || likes.value === ''){
        likes.classList.add('error');
        errors++;
    }else{
        likes.classList.remove('error');
        errors--;
    }

    //dislikes
    if(dlikes.value == null || dlikes.value === ''){
        dlikes.classList.add('error');
        errors++;
    }else{
        dlikes.classList.remove('error');
        errors--;
    }

    if (errors!=0){
        e.preventDefault();
        error.innerHTML = "Fill out missing fields";
    }
    else{
        errors = 0;
        error.innerHTML=" ";
    }
    
});
