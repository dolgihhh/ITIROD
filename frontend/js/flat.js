// import {AddFavFlat, DisableAdd} from './main.js';


async function GetFlat() {
    var section = document.getElementsByClassName("flat")[0];
    section.innerHTML = '';

    let response_flat = await fetch(`http://127.0.0.1:8000/flats/${localStorage.getItem('flat_id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
       
    });
    let result_flat = await response_flat.json();

    let response_favflats = await fetch(`http://127.0.0.1:8000/favourites/${localStorage.getItem('user_id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
       
    });
    let result_favflats = await response_favflats.json();

    var favflats_ids = [];
    // console.log(favflats_ids)
    for (let item of result_favflats){
        if(item.hasOwnProperty('message')){
            continue
        }
        favflats_ids.push(item.id);
    }

    console.log(result_flat)
    var div = document.createElement("div");
    div.setAttribute('class', 'flat__img');
    var image = document.createElement("img");
    image.setAttribute('src',`${result_flat.photo_url}`)
    div.appendChild(image);
    section.appendChild(div);
    var div2 = document.createElement("div");
    div2.setAttribute('class', 'flat__desc');
    var div3 = document.createElement("div");
    div3.setAttribute('class', 'flat__desc-wrapper');
    var city = document.createElement("span");
    city.innerHTML = `City : ${result_flat.city}`;
    var adress = document.createElement("span");
    adress.innerHTML = `Adress : ${result_flat.adress}`;
    var flats = document.createElement("span");
    flats.innerHTML = `Flats : ${result_flat.rooms}`;
    var area = document.createElement("span");
    area.innerHTML = `Apartment area : ${result_flat.area}m2`;
    var price = document.createElement("span");
    price.innerHTML = `Price : ${result_flat.price}$`;
    var phone_number = document.createElement("span");
    phone_number.innerHTML = `Phone number : ${result_flat.phone_number}`;
    var owner_name = document.createElement("span");
    owner_name.innerHTML = `Owner name : ${result_flat.owner_name}`;
    var description = document.createElement("span");
    description.innerHTML = `Description : ${result_flat.description}`;
    div3.appendChild(city);
    div3.appendChild(adress);
    div3.appendChild(flats);
    div3.appendChild(area);
    div3.appendChild(price);
    div3.appendChild(phone_number);
    div3.appendChild(owner_name);
    div3.appendChild(description);
    div2.appendChild(div3);
    section.appendChild(div2);

    var addbtn = document.getElementsByClassName("add-button")[0];
    addbtn.setAttribute('id', `add_${result_flat.id}`);
    addbtn.setAttribute('onClick', 'javascript:AddFavFlat(this.id)');
    if(favflats_ids.includes(result_flat.id)){
        // console.log("Pidor");
        DisableAdd(`add_${result_flat.id}`);
    }
}   

GetFlat();


function DisableAdd(flat_id){
    var flat = document.getElementById(flat_id);
    flat.setAttribute('disabled', '');
    flat.style.backgroundColor = "#AFAFAF"
    flat.innerHTML = 'Added';
}


async function AddFavFlat(flat_id) {
    var flat_num = flat_id.substring(4);
    console.log(flat_num);
    let response = await fetch('http://127.0.0.1:8000/favourites/', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'user_id': `${localStorage.getItem('user_id')}`, 'flat_id': `${flat_num}`})
    });
    let result = await response.json();
    // alert(result.message);
    DisableAdd(flat_id);
}




