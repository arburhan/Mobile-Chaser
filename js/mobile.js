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
    mobiles.forEach(mobile=>{
        console.log(mobile);
    });

    //
}