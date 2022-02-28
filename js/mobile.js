// search function *arrow
const searchMobile = () =>{
    const searchFieldId = document.getElementById('search-field');
    const searchText = searchFieldId.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showSearchResult(data.data));
}
const showSearchResult = mobiles =>{
    // console.log(mobiles);
    const showResultDivId = document.getElementById('showResults');
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
                    <button class="btn btn-primary">Explore</button>
                </div>
            </div>
        </div>
        `;
        showResultDivId.appendChild(childDiv);
        console.log(mobile);
    });

    //
}