function Logout(){
    localStorage.removeItem("user_id")
    window.location.replace("index.html")
}

async function GetUser() {
    let response = await fetch(`http://127.0.0.1:8000/users/${localStorage.getItem('user_id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
       
    });
    let result = await response.json();
    // console.log(result);
    document.getElementById("hello-user").innerHTML = 'Hello, ' + `${result.name}`;
    document.getElementById("email").setAttribute('placeholder', `${result.email}`); 
    document.getElementById("name").setAttribute('placeholder', `${result.name}`); 
}

GetUser();

var count = 1;
function Edit(){
    var change_btn = document.getElementsByClassName('profile__form-changebtn');
    var save_btn = document.getElementsByClassName('profile__form-savebtn');
    if (count == 0) {
        document.getElementById("email").value = "";
        document.getElementById("name").value = "";
        document.getElementById("old-password").value = "";
        document.getElementById("new-password").value = "";
        document.getElementById("email").setAttribute('disabled', '');
        document.getElementById("name").setAttribute('disabled', '');
        document.getElementById("old-password").setAttribute('disabled', '');
        document.getElementById("new-password").setAttribute('disabled', '');
        change_btn[0].style.backgroundColor = "#E9EC5B";
        change_btn[0].innerHTML = 'Edit';
        save_btn[0].setAttribute('disabled','');
        save_btn[0].style.backgroundColor = "#AFAFAF";
        count = 1;        
    }
    else {
        document.getElementById("email").removeAttribute('disabled');
        document.getElementById("name").removeAttribute('disabled');
        document.getElementById("old-password").removeAttribute('disabled');
        document.getElementById("new-password").removeAttribute('disabled');
        change_btn[0].style.backgroundColor = "#A7361D"
        change_btn[0].innerHTML = 'Cancel'
        save_btn[0].removeAttribute('disabled','');
        save_btn[0].style.backgroundColor = "#689D3E"
        count = 0;
    }
}

async function UpdateUser() {
    var form = document.getElementById("profile-form");
    var formData = new FormData(form);
    var email = formData.get("email");
    var name = formData.get("name");
    var password = formData.get("old-password");
    var new_password = formData.get("new-password");
    if(email == "" && name == "" && new_password == ""){
        alert("Заполните хотя бы еще 1 поле")
        return
    }
    if (email == ""){
        email = document.getElementById("email").getAttribute('placeholder');
    }
    if (name == ""){
        name = document.getElementById("name").getAttribute('placeholder');
    }
    if (new_password == ""){
        new_password = password;
    }
    let response = await fetch(`http://127.0.0.1:8000/users/update_user/${localStorage.getItem('user_id')}`, {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': `${name}`,'email': `${email}`, 'password': `${password}`,'new_password': `${new_password}`})
    });
    let result = await response.json();
    alert(result.message);
    if(result.message == "User data updated"){
        Change();
        document.getElementById("email").value = "";
        document.getElementById("name").value = "";
        document.getElementById("old-password").value = "";
        document.getElementById("new-password").value = "";
        GetUser();
    }
    
}
