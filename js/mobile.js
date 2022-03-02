// single value id
const singleDivId = document.getElementById('showSingle');
// show result id
const showResultDivId = document.getElementById('showResults');
// error message id 
const errorMsg = document.getElementById('errorMsg');
const myText = document.getElementById('myText');
// result 20 div
const result20Div = document.getElementById('showResults20');
// see-more button
const seeMoreButton = document.getElementById('see-more');

// search function *arrow
const searchMobile = () =>{
    // clear field
    singleDivId.textContent = '';
    result20Div.textContent = '';
    seeMoreButton.style.display='none';
    singleDivId.style.display='none';
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
        singleDivId.style.display='none';
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
    singleDivId.style.display='none';
    result20Div.textContent='';
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
       if(mobiles.length >21){
        const value20 = mobiles.slice(0, 20);
        value20.forEach(mobile20=>{
            const childDiv20 = document.createElement('div');
            childDiv20.classList.add('col', 'text-center', 'shadow-sm-sm');
            childDiv20.innerHTML = `
                <div class="card align-items-center p-3 border-0">
                    <img src="${mobile20.image}" class="card-img-top w-50 " alt="...">
                    <div class="card-body">
                        <h4 class="card-title">${mobile20.phone_name}</h4>
                        <h4 class ="card-title">${mobile20.brand}</h4>
                        <div class="card-footer border-0 bg-transparent">
                            <button onclick="loadDetails('${mobile20.slug}')" class="btn btn-primary">Explore</button>
                        </div>
                    </div>
                </div>
            `;  
            result20Div.appendChild(childDiv20);
            seeMoreButton.style.display='block';
        });
       }
       else{
        
        mobiles.forEach(mobile=>{
            const childDiv = document.createElement('div');
            childDiv.classList.add('col', 'text-center', 'shadow-sm');
            childDiv.innerHTML = `
            <div class="card align-items-center p-3 border-0">
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
}
// load details
const loadDetails=ID=>{
    const url = `https://openapi.programming-hero.com/api/phone/${ID}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>showSingle(data.data));
    
}
const showSingle=mobileId=>{
    // go top
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // clean field
    result20Div.textContent='';
    showResultDivId.textContent = '';
    seeMoreButton.style.display='none';
    // hide search all result
    singleDivId.style.display='block';
    // sensor details
    const sensorArray = mobileId.mainFeatures.sensors;
    const releaseDateNew = "Not found in our record";
    // new div
    const firstDiv = document.createElement('div');
    firstDiv.classList.add('px-md-5');
    firstDiv.innerHTML=`
        <img src="${mobileId.image}" class="card-img-top w-25 img-fluid" alt="...">
        <div class="card-body">
            <h3 class="card-title">${mobileId.name}</h3>
            <h4 class ="card-text"><img class="feature-images" src="./images/brand-image.png">${mobileId.brand}</h4>
            <!-- Main Features -->
            <h4 class="card-text text-success fw-bold">Main Features</h4>
            <p class ="card-tex">Release Date: ${mobileId.releaseDate? mobileId.releaseDate:releaseDateNew}</p>
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
}

