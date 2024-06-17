// Getting references to HTML elements
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

// Unsplash API access key
const accesskey = "93_wKWDlC2zpVLKk7te2rqB3DMB6I8ABY_cPnqlU1N0";

// Variables to manage search query and pagination
let keyword = "";
let page = 1;

// Function to fetch and display images based on search query
async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.forEach((result) => {
        // Creating image elements and links for each search result
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    showMoreBtn.style.display = "block";
}

// Event listener for form submission to trigger the search
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchResult.innerHTML = ''; // Clear previous search results
    searchImages();
});

// Event listener for 'Show more' button to load more results
showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
