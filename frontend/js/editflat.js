async function GetFlat() {
    // var section = document.getElementsByClassName("flat")[0];
    // section.innerHTML = '';

    let response_flat = await fetch(`http://127.0.0.1:8000/flats/${localStorage.getItem('flat_id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
       
    });
    let result_flat = await response_flat.json();
    console.log(result_flat);
    document.getElementById('city').value = `${result_flat.city}`;
    document.getElementById('adress').value = `${result_flat.adress}`;
    document.getElementById('rooms').value = `${result_flat.rooms}`;
    document.getElementById('area').value = `${result_flat.area}`;
    document.getElementById('price').value = `${result_flat.price}`;
    document.getElementById('phone_number').value = `${result_flat.phone_number}`;
    document.getElementById('owner_name').value = `${result_flat.area}`;
    document.getElementById('description').value = `${result_flat.description}`;
    localStorage.setItem("photo_url", `${result_flat.photo_url}`);
    var photo_warning = document.getElementById('photo_warning');
    photo_warning.style.marginLeft = '10px';
    photo_warning.style.color = '#E9EC5B';
    photo_warning.innerHTML = `Prev`;

}

GetFlat();

const upload = Upload({ apiKey: "free" });

// <input type="file" onchange="onFileSelected(event)" />
async function onFileSelected(event) {
  const [ file ]    = event.target.files;
  const { fileUrl } = await upload.uploadFile(file);
  var photo_warning = document.getElementById('photo_warning');
  localStorage.setItem("photo_url", fileUrl);
  photo_warning.innerHTML = '';
  photo_warning.innerHTML = `Added new`;
//   photo_warning.style.fontSize = '16px';
  photo_warning.style.marginLeft = '10px';
  photo_warning.style.color = '#689D3E';
  console.log(`File uploaded: ${fileUrl}`);
}


async function EditFlat() {
    var form = document.getElementById("editflat-form");
    var formData = new FormData(form);
    var city = formData.get("city");
    var adress = formData.get("adress");
    var flats = formData.get("rooms");
    var area = formData.get("area");
    var price = formData.get("price");
    var phone_number = formData.get("phone_number");
    var owner_name = formData.get("owner_name");
    var photo_url = localStorage.getItem("photo_url");
    localStorage.removeItem("photo_url");
    var description = formData.get("description");
    var user_id = `${localStorage.getItem('user_id')}`;
    console.log(city);
    console.log(adress);
    console.log(flats);
    console.log(area);
    console.log(price);
    console.log(phone_number);
    console.log(owner_name);
    console.log(photo_url);
    console.log(description);
    console.log(user_id);
    let response = await fetch(`http://127.0.0.1:8000/flats/update_flat/${localStorage.getItem('flat_id')}`, {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'city': `${city}`, 'adress': `${adress}`, 'rooms': `${flats}`, 'area': `${area}`, 'price': `${price}`, 'phone_number': `${phone_number}`, 'adress': `${adress}`,
        'owner_name': `${owner_name}`, 'photo_url': `${photo_url}`, 'description': `${description}`, 'user_id': `${user_id}`})
    });
    let result = await response.json();
    console.log(result);
    window.location.href='profile.html';
}


function Logout(){
    localStorage.removeItem("user_id")
    window.location.replace("index.html")
}