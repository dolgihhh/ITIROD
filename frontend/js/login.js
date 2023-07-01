async function Login() {
    var form = document.getElementById("login-form");
    var formData = new FormData(form);
    var email = formData.get("email")
    var password = formData.get("password")
    console.log(email)
    console.log(password)
    let response = await fetch('http://127.0.0.1:8000/users/login', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'email': `${email}`, 'password': `${password}`})
    });
    let result = await response.json();
    console.log(result.id)
    if(result.message=="Successful login"){
        console.log(result.id)
        localStorage.setItem("user_id", result.id)
        alert("Login Confirmed")
        window.location.replace('main.html');
    }
    else{
        alert("Wrong email or password")
    }
}
