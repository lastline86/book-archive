const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const resultCount = document.getElementById('result-count');
const errorDiv = document.getElementById("error");

//Search Button Click event handler
searchBtn.addEventListener('click', function () {
    const searchText = searchInput.value;
    // if Search field is empty
    if (searchText === "") {
        errorDiv.innerHTML = `<h3 class="bg-white">Search field cannot be empty.</h3>`;
        resultCount.innerHTML = '';
        bookContainer.innerHTML = '';
        return;
    }

    //Clear the Search field
    bookContainer.innerHTML = '';
    resultCount.innerHTML = '';
    searchInput.value = '';
    errorDiv.innerHTML = '';

    //Fetch the API
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.docs));
});

//Show Data Function
const showData = (data) => {
    if (Object.keys(data).length === 0) {
        const errordiv = document.createElement("div");
        errordiv.innerHTML = `<h6 class="bg-white"><br>NO Result Found<br></h6>`
        errorDiv.appendChild(errordiv);
    }
    else {
        errorDiv.innerText = ""; //clear error div
    }


    data.forEach((book) => {
        const div = document.createElement("div");

        div.classList.add('col');

        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.author_name ? book.author_name : ''}</p>
                    <p class="card-text">${book.first_publish_year ? book.first_publish_year : ''}</p>
                </div>
            </div>
        `
        bookContainer.appendChild(div);
    });

    // Total Search Result count 
    const divResultCount = document.createElement("div");
    divResultCount.innerHTML = `<h6 class="bg-white">About ${Object.keys(data).length} results fuond</h6>`
    resultCount.appendChild(divResultCount);
}