// single value id
const singleDivId = document.getElementById('showSingle');
// show result id
const showResultDivId = document.getElementById('showResults');
// error message id 
const errorMsg = document.getElementById('errorMsg');
// search function *arrow
const searchMobile = () =>{
    singleDivId.textContent = '';
    const searchFieldId = document.getElementById('search-field');
    const searchText = searchFieldId.value;
    if(searchText === ''){
        errorMsg.style.display='block';
        errorMsg.innerHTML=`
            <h1 class="text-danger py-4">Please write mobile name</h1>
            <img class="img-fluid" src="./images/writing-notes.gif">
        `;
    }
    else{
        errorMsg.style.display='none';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => showSearchResult(data.data))
        .catch(error=>displayError(error));
    }
    // clear input value
    searchFieldId.value = '';
}
// error handle
const displayError=(error)=>{
    console.log(error);
}
// search section
const showSearchResult = mobiles =>{
    console.log(mobiles.length);
    showResultDivId.textContent = '';
    // single value display none
    singleDivId.style.display='none';
    if(mobiles.length == 0){
        errorMsg.style.display='block';
        errorMsg.innerHTML=`
            <h1 class="text-danger py-4">Results Not Found</h1>
            <img class="img-fluid" src="./images/resultNotFound.gif">
        `;
    }
   else{
       console.log(mobiles);
       if(mobiles.length >21){
           console.log(654);
       }
    mobiles.forEach(mobile=>{
        const childDiv = document.createElement('div');
        childDiv.classList.add('col', 'text-center');
        childDiv.innerHTML = `
        <div class="card align-items-center p-3 border-secondary">
            <img src="${mobile.image}" class="card-img-top w-50 " alt="...">
            <div class="card-body">
                <h2 class="card-title">${mobile.phone_name}</h2>
                <h3 class ="card-title">${mobile.brand}</h3>
                <div class="card-footer border-0 bg-transparent">
                    <button onclick="loadDetails('${mobile.slug}')" class="btn btn-primary">Explore</button>
                </div>
            </div>
        </div>
        `;
        showResultDivId.appendChild(childDiv);
    });
   }
}
// load details
const loadDetails=ID=>{
    const url = `https://openapi.programming-hero.com/api/phone/${ID}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>showSingle(data.data));
    
}
const showSingle=mobileId=>{
    showResultDivId.textContent = '';
    console.log(mobileId);
    // hide search all result
    // showResultDivId.style.display='none';
    singleDivId.style.display='block';
    // sensor details
    const sensorArray = mobileId.mainFeatures.sensors;
    // new div
    const firstDiv = document.createElement('div');
    firstDiv.classList.add('px-md-5');
    firstDiv.innerHTML=`
        <img src="${mobileId.image}" class="card-img-top w-25 img-fluid" alt="...">
        <div class="card-body">
            <h2 class="card-title">${mobileId.name}</h2>
            <h3 class ="card-text"><img class="feature-images" src="./images/brand-image.png">${mobileId.brand}</h3>
            <!-- Main Features -->
            <h4 class="card-text text-success fw-bold">Main Features</h4>
            <p class ="card-tex">${mobileId.releaseDate}</p>
            <p class ="card-tex"><img class="feature-images" src="./images/cpu.png">${mobileId.mainFeatures.chipSet}</p>
            <p class ="card-tex"><img class="feature-images" src="./images/display.png">${mobileId.mainFeatures.displaySize}</p>
            <p class ="card-tex"><img class="feature-images" src="./images/memory-card.png">${mobileId.mainFeatures.storage}</p>
            <p id="sensorId" class="card-text"><span class="other-feature"> Sensors: </span>${sensorArray.join(', ')}</p>
            <div class="card-footer border-0 bg-transparent">
            </div>
        </div>
    `;
    singleDivId.appendChild(firstDiv);
    // other feature condition
    const secondDiv = document.createElement('div');
    secondDiv.classList.add('px-md-5');
    if(!mobileId.others){
        console.log(3);
    }
    else{
        secondDiv.innerHTML=`
        <!-- Other Features -->
            <h4 class="card-text text-warning fw-bold">Other Features</h4>
            <p class="card-text"> <span class="other-feature"> Bluetooth: </span> ${mobileId.others.Bluetooth}</p>
            <p class="card-text"><span class="other-feature">GPS: </span> ${mobileId.others.GPS}</p>
            <p class="card-text"><span class="other-feature">NFC: </span>${mobileId.others.NFC}</p>
            <p class="card-text"><span class="other-feature">Radio: </span> ${mobileId.others.Radio}</p>
            <p class="card-text"><span class="other-feature">USB: </span> ${mobileId.others.USB}</p>
            <p class="card-text"><span class="other-feature">WLAN: </span> ${mobileId.others.WLAN}</p>
        `;
    }
    singleDivId.appendChild(secondDiv);
    console.log(mobileId);
}

