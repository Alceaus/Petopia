// input fields and button
const registerBtn = document.querySelector("#registerBtn");
const loginBtn = document.querySelector("#loginBtn");
const updateBtn = document.querySelector("#updateBtn");
const regEmailNoInput = document.querySelector("#email");
const regUsernameNoInput = document.querySelector("#username");
const logUsernameNoInput = document.querySelector("#l_username");
const logPasswordNoInput = document.querySelector("#l_password");
const uploadBtn= document. querySelector ("#uploadBtn")
// forms
const regForm = document.forms.registerForm;
const loginForm = document.forms.loginForm;

// error paragraph elements
const registerError = document.querySelector("r_error");
const loginError = document.querySelector("l_error");

/*
    TODO:   The code below attaches a `click` event to `#registerBtn` button.
        The code should communicate asynchronously with the server to save
        the information in the database.

        As long as the input serial number does not yet exist in the database,
        the form data (i.e., serial no, product name, purchase date) should be 
        successfully sent to the route `/register` via a POST request. 

        If the new product was saved successfully into the database, the page
        should immediately refresh, displaying the updated list of products
        on the screen. Otherwise, simply stay on the page.
*/
registerBtn?.addEventListener("click", async function (e) {
    e.preventDefault();
    console.log('clicked register');

    const formData = new FormData(regForm);
    
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            location.reload();
        } else {
            const errorData = await response.json();
            console.error('Registration error:', errorData);
        }
    } catch (error) {
        console.error('Error while registering:', error);
    }
});

/*
    TODO:   The code below attaches a `keyup` event to `#r_serialNo` text field.
        The code checks if the current serial number entered by the user
        in the text field does not exist in the database.

        If the current reference number exists in the database:
        - `#r_serialNo` text field background color turns to `red`
        - `#r_error` displays an error message `Serial Number already exists on the database!`
        - `#registerBtn` is disabled

        else, if the current reference number does not exist in the
        database:
        - `#r_serialNo` text field background color turns back to `#E3E3E3`
        - `#r_error` displays no error message
        - `#registerBtn` is enabled
*/

/*
regEmailNoInput?.addEventListener("keyup", async function (e) {
    console.log('register email input value changed');

    const email = e.target.value;

    try {
        const response = await fetch(`/checkEmail?r_email=${email}`);
        const data = await response.json();

        if (data.exists) {
            regEmailNoInput.style.backgroundColor = 'red';
            registerError.textContent = 'Email already exists on the database!';
            registerBtn.disabled = true;
        } else {
            regEmailNoInput.style.backgroundColor = '#E3E3E3';
            registerError.textContent = '';
            registerBtn.disabled = false;
        }
    } catch (error) {
        console.error('Error while checking email:', error);
    }
});

regUsernameNoInput?.addEventListener("keyup", async function (e) {
    console.log('register username input value changed');

    const username = e.target.value;

    try {
        const response = await fetch(`/checkUsername?r_username=${username}`);
        const data = await response.json();

        if (data.exists) {
            regUsernameNoInput.style.backgroundColor = 'red';
            registerError.textContent = 'Username already exists on the database!';
            registerBtn.disabled = true;
        } else {
            regUsernameNoInput.style.backgroundColor = '#E3E3E3';
            registerError.textContent = '';
            registerBtn.disabled = false;
        }
    } catch (error) {
        console.error('Error while checking username:', error);
    }
});
*/

loginBtn?.addEventListener("click", async function (e) {
    e.preventDefault();
    console.log('clicked login');

    const formData = new FormData(loginForm);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Login successful, redirect to home page or any other desired page
            window.location.href = "/home";
        } else {
            // Login failed, display error message
            const errorData = await response.json();
            const loginError = document.querySelector("#l_error");
            loginError.textContent = errorData.err || 'Login failed.';
        }
    } catch (error) {
        console.error('Error while logging in:', error);
    }
});

uploadBtn?.addEventListener("click", async function (e) {
    try {
        const fileInput = document.querySelector('#fileInput'); // Assuming fileInput is the input element for selecting files
        const selectedFile = fileInput.files[0];
        
        if (!selectedFile) {
            alert('Please select a file before uploading.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('File uploaded successfully!');
        } else {
            const errorData = await response.json();
            alert(`Error uploading file: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


/*
    TODO:  (BONUS) The code below attaches a `click` event to `#updateBtn` button.
        The code should communicate asynchronously with the server to update the product's
        shipping status information in the database.

        As long as the input serial number exists in the database,
        the form data (i.e., serial no, status) should be successfully 
        sent to the route `/update` via a POST request. 

        If the user enters an invalid serial number (e.g., one that is not yet registered),
        the frontend should react by displaying the message: 
        `Serial Number does not exist on the database!`
        in the `#s_error` paragraph element.

        If the product was successfully updated on the database, the page
        should immediately refresh, displaying the updated status of the product,
        as seen from the list on the screen. Otherwise, simply stay on the page.
  
*/

/* TO BE EDITED. DO NOT REMOVE
updateBtn?.addEventListener("click", async function (e) {
    e.preventDefault();
    console.log('clicked update');

    const serialno = document.querySelector("#s_serialNo").value;
    const status = document.querySelector("#statusDropdown").value;

    try {
        const response = await fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ serialno, status }),
        });

        if (response.ok) {
            location.reload();
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.error || 'Update failed';
            updateError.textContent = errorMessage;
        }
    } catch (error) {
        console.error('Error while updating status:', error);
    }
});
*/