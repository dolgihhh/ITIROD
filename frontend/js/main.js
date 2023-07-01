if (!localStorage.getItem('user_id')){
    window.location.replace('index.html');
}

function Logout(){
    localStorage.removeItem("user_id")
    window.location.replace("index.html")
}

async function FillCities() {
    let response = await fetch('http://127.0.0.1:8000/flats', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
       
    });
    let result = await response.json();
    const cities = new Set();
    for (let item of result){
        if(item.hasOwnProperty('message')){
            continue
        }
        cities.add(`${item.city}`);
    }
    // console.log(cities);
    for (let item of cities){
        var cities_select = document.getElementById("city");
        var option = document.createElement("option");
        option.setAttribute('value', item);
        option.innerHTML = item;
        cities_select.appendChild(option);
    }
}

FillCities();


async function GetFlats() {
    document.getElementById("flats").innerHTML = '';
    var city = document.getElementById("city");
    var city_value = city.value;
    var order = document.getElementById("order");
    var order_value = order.value;
    if(city_value == "clear" && order_value == "clear"){
        var url = 'http://127.0.0.1:8000/flats'
    }
    else if(city_value != "clear" && order_value == "clear"){
        var url = `http://127.0.0.1:8000/flats?city=${city_value}`
    }
    else if(order_value != "clear" && city_value == "clear"){
        var url = `http://127.0.0.1:8000/flats?orderby=${order_value}`
    }
    else{
        var url = `http://127.0.0.1:8000/flats?city=${city_value}&orderby=${order_value}`
    }
    let response_flats = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let result_flats = await response_flats.json();
    let response_favflats = await fetch(`http://127.0.0.1:8000/favourites/${localStorage.getItem('user_id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
       
    });
    let result_favflats = await response_favflats.json();
    var favflats_ids = [];
    for (let item of result_favflats){
        if(item.hasOwnProperty('message')){
            continue
        }
        favflats_ids.push(item.id);
    }
    for (let item of result_flats){
        if(item.hasOwnProperty('message')){
            continue
        }
        // var cities_select = document.getElementById("city");
        // var option = document.createElement("option");
        // option.setAttribute('value',`${item.city}`)
        // option.innerHTML = `${item.city}`
        // cities_select.appendChild(option)
        // cities.add(`${item.city}`);
        // console.log(item);
        var div = document.createElement("div");
        div.setAttribute('class', 'flats__flat');
        var img = document.createElement("img");
        img.setAttribute('src', `${item.photo_url}`);
        img.setAttribute('height', '270px');
        img.setAttribute('width', '450px');
        div.appendChild(img);
        var div2 = document.createElement("div");
        div2.setAttribute('class', 'flats__flat-desc');
        var adress = document.createElement("span");
        adress.innerHTML = 'Adress : ' + `${item.adress}`
        var flats = document.createElement("span");
        flats.innerHTML = 'Flats : ' + `${item.rooms}`
        var area = document.createElement("span");
        area.innerHTML = 'Apartment area : ' + `${item.area}` + 'm2'
        var price = document.createElement("span");
        price.innerHTML = 'Price : ' + `${item.price}` + '$'
        div2.appendChild(adress);
        div2.appendChild(flats);
        div2.appendChild(area);
        div2.appendChild(price);
        div.appendChild(div2)
        var div3 = document.createElement("div");
        div3.setAttribute('class', 'flats__flat-btn');
        var morebtn = document.createElement("button");
        morebtn.setAttribute('class', 'flats__flat-morebtn');
        morebtn.setAttribute('id', `more_${item.id}`);
        morebtn.setAttribute('onClick', 'javascript:ShowMore(this.id)');
        morebtn.innerHTML = 'More';
        var addbtn = document.createElement("button");
        addbtn.setAttribute('class', 'flats__flat-addbtn');
        addbtn.setAttribute('id', `add_${item.id}`);
        addbtn.setAttribute('onclick', 'javascript:AddFavFlat(this.id)');
        // addbtn.setAttribute('onClick', 'javascript:DisableAdd(this.id)')
        // addbtn.setAttribute('onClick', '')
        addbtn.innerHTML = 'Add';
        // console.log(favflats_ids);
        // console.log(item.id);
        
        div3.appendChild(morebtn);
        div3.appendChild(addbtn);
        div.appendChild(div2);
        div.appendChild(div3);
        document.getElementById("flats").appendChild(div);
        // console.log(`add_${item.id}`);
        if(favflats_ids.includes(item.id)){
            // console.log("Pidor");
            DisableAdd(`add_${item.id}`);
        }
        // DisableAdd('10');
    }
    // console.log(cities);
    // for (let item of cities){
    //     var cities_select = document.getElementById("city");
    //     var option = document.createElement("option");
    //     option.setAttribute('value', item);
    //     option.innerHTML = item;
    //     cities_select.appendChild(option);
    // }
}


GetFlats();

function DisableAdd(flat_id){
    var flat = document.getElementById(flat_id);
    flat.setAttribute('disabled', '');
    flat.style.backgroundColor = "#AFAFAF"
    flat.innerHTML = 'Added';
}

// DisableAdd('10');

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


function ShowMore(flat_id){
    var flat_num = flat_id.substring(5);
    localStorage.setItem("flat_id", flat_num)
    window.location.href = "flat.html";
}