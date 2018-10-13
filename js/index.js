requirejs.config({
  paths: {
    jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",
    axios: "https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios"
  }
});

require(["jquery", "axios"], function($, axios) {
  $(".searchButton").on("click", () => {
    $(".searchBar").val()
      ? axios
          .get(
            `https://www.googleapis.com/customsearch/v1/?key=AIzaSyCavtYBupCwMRf_OpjmHYjakCCUYkZCqI8&cx=003773381590146380647:xsrslhgqpey&q=${$(
              ".searchBar"
            ).val()}`
          )
          .then(data => {
            axios
              .get(
                `https://www.googleapis.com/customsearch/v1/?key=AIzaSyCavtYBupCwMRf_OpjmHYjakCCUYkZCqI8&cx=003773381590146380647:xsrslhgqpey&searchType=image&q=${$(
                  ".searchBar"
                ).val()}`
              )
              .then(images => {
                $(".searchBar").val("");
                displaySearchResults(data.data.items);
                displayImageSearchResults(images.data.items);
              });
          })
          .catch(err => {
            throw new Error(err);
          })
      : "";
  });
});

const displaySearchResults = data => {
  $(".searchResults").empty();
  $(".searchResults").append("<h2>Web Results</h2>");
  data ? 
    data.map(item => {
      const { link, title, snippet } = item;
      $(".searchResults").append(
        `<li><a href=${link}>${title}</a><p>${snippet}</p></li>`
      );
    })
  : $(".searchResults").append("<p>No results</p>");
};

const displayImageSearchResults = images => {
  $(".imageSearchResults").empty();
  $(".imageSearchResults").append("<h2>Image Results</h2>");
  images ? images.map(item => {
    let link = item.link;
    let name = item.title;

    $(".imageSearchResults").append(`<img src=${link}>`);
  })
  : $(".imageSearchResults").append("<p>No results</p>");
};
