// GetFavouriteFlats();
GetFavouriteFlats();
GetUserFlats();
async function GetFavouriteFlats() {
    // console.log("Запрос пошел");
    // let response_favflats = await fetch(`http://127.0.0.1:8000/favourites/${localStorage.getItem('user_id')}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
       
    // });
    // let result_favflats = await response_favflats.json();
    console.log("Запрос пошел 1");
    document.getElementsByClassName("favsec__flats")[0].innerHTML = '';
    let response = await fetch(`http://127.0.0.1:8000/favourites/${localStorage.getItem('user_id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=0, no-cache, no-store, must-revalidate'
        }
    });
    let result = await response.json();
    console.log(result)
    for (let item of result){
        if(item.hasOwnProperty('message')){
            if(item.message =="User has 0 favourites"){
                var zero_fav = document.createElement("div");
                var h2 = document.createElement("h2");
                h2.setAttribute('class', 'favsec__title');
                h2.innerHTML = 'Favourite:';
                zero_fav.innerHTML = 'You didnt add any favourite yet!';
                document.getElementsByClassName("favsec")[0].innerHTML = '';
                h2.appendChild(zero_fav);
                document.getElementsByClassName("favsec")[0].appendChild(h2);
            }
            continue
        }
        var div = document.createElement("div");
        div.setAttribute('class', 'favsec__flat');
        var img = document.createElement("img");
        img.setAttribute('src', `${item.photo_url}`);
        img.setAttribute('height', '270px');
        img.setAttribute('width', '450px');
        div.appendChild(img);
        var div2 = document.createElement("div");
        div2.setAttribute('class', 'favsec__flat-desc');
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
        div3.setAttribute('class', 'favsec__flat-btn');
        var morebtn = document.createElement("button");
        morebtn.setAttribute('class', 'favsec__flat-morebtn');
        morebtn.setAttribute('id', `more_${item.id}`);
        morebtn.setAttribute('onClick', 'javascript:ShowMore(this.id)');
        morebtn.innerHTML = 'More';
        var delbtn = document.createElement("button");
        delbtn.setAttribute('class', 'favsec__flat-delbtn');
        delbtn.setAttribute('id', `deletefav_${item.id}`)
        delbtn.setAttribute('onClick', 'javascript:DeleteFavouriteFlats(this.id)')
        delbtn.innerHTML = 'Delete';
        div3.appendChild(morebtn);
        div3.appendChild(delbtn);
        div.appendChild(div2);
        div.appendChild(div3);
        document.getElementsByClassName("favsec__flats")[0].appendChild(div);
    }
    console.log("Obnovilos")
}

// GetFavouriteFlats();

async function GetUserFlats() {
    document.getElementsByClassName("myflatsec__flats")[0].innerHTML = '';
    let response = await fetch(`http://127.0.0.1:8000/flats/user/${localStorage.getItem('user_id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=0, no-cache, no-store, must-revalidate'
        }
       
    });
    let result = await response.json();
    console.log(result)
    // const cities = new Set()
    for (let item of result){
        if(item.hasOwnProperty('message')){
            if(item.message == "User has 0 flats"){
                var zero_flat = document.createElement("h2");
                zero_flat.setAttribute('class', 'myflatsec__title');
                zero_flat.innerHTML = 'You didnt add any flat yet!';
                var before = document.getElementsByClassName("myflatsec__flats")[0];
                document.getElementsByClassName("myflatsec")[0].insertBefore(zero_flat, before);
            }
            continue
        }
        var div = document.createElement("div");
        div.setAttribute('class', 'myflatsec__flat');
        var img = document.createElement("img");
        img.setAttribute('src', `${item.photo_url}`);
        img.setAttribute('height', '270px');
        img.setAttribute('width', '450px');
        div.appendChild(img);
        var div2 = document.createElement("div");
        div2.setAttribute('class', 'myflatsec__flat-desc');
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
        div3.setAttribute('class', 'myflatsec__flat-btn');
        var morebtn = document.createElement("button");
        morebtn.setAttribute('class', 'myflatsec__flat-morebtn');
        morebtn.setAttribute('id', `more_${item.id}`);
        morebtn.setAttribute('onClick', 'javascript:ShowMore(this.id)');
        morebtn.innerHTML = 'More';
        var editbtn = document.createElement("button");
        editbtn.setAttribute('class', 'myflatsec__flat-editbtn');
        editbtn.setAttribute('id', `edit_${item.id}`);
        editbtn.setAttribute('onClick', 'javascript:EditFlat(this.id)');
        editbtn.innerHTML = 'Edit';
        var delbtn = document.createElement("button");
        delbtn.setAttribute('class', 'myflatsec__flat-delbtn');
        delbtn.setAttribute('id', `deleteuser_${item.id}`);
        delbtn.setAttribute('onClick', 'javascript:DeleteUserFlats(this.id)')
        delbtn.innerHTML = 'Delete';
        div3.appendChild(morebtn);
        div3.appendChild(editbtn);
        div3.appendChild(delbtn);
        div.appendChild(div2);
        div.appendChild(div3);
        document.getElementsByClassName("myflatsec__flats")[0].appendChild(div);
    }
}

// GetUserFlats();

async function DeleteFavouriteFlats(flat_id){
    flat_id = flat_id.substring(10);
    let response = await fetch('http://127.0.0.1:8000/favourites/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'user_id': `${localStorage.getItem('user_id')}`, 'flat_id': `${flat_id}`})
    });
    let result = await response.json();
    // console.log(result);
    GetFavouriteFlats();
}

async function DeleteUserFlats(flat_id){
    flat_id = flat_id.substring(11);
    let response = await fetch(`http://127.0.0.1:8000/flats/${flat_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let result = await response.json();
    // console.log(result);
    GetFavouriteFlats();
    GetUserFlats();
}


function ShowMore(flat_id){
    var flat_num = flat_id.substring(5);
    localStorage.setItem("flat_id", flat_num)
    window.location.href = "flat.html";
}


function EditFlat(flat_id){
    var flat_num = flat_id.substring(5);
    localStorage.setItem("flat_id", flat_num)
    window.location.href = "editflat.html";
}


// GetFavouriteFlats();
// GetUserFlats();