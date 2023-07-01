async function Register() {
    var form = document.getElementById("signup-form");
    var formData = new FormData(form);
    var email = formData.get("email")
    var name = formData.get("name")
    var password = formData.get("password")
    var confirmpassword = formData.get("confirm-password")
    console.log(email)
    console.log(name)
    console.log(password)
    console.log(confirmpassword)
    if(password != confirmpassword){
        alert("Пароли не совпадают")
        return 
    }
    let response = await fetch('http://127.0.0.1:8000/users/registration', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': `${name}`,'email': `${email}`, 'password': `${password}`})
    });
    let result = await response.json();
    alert(result.message)
    if(result.message=="User succesfully created"){
        window.location.replace('login.html');
    }
}