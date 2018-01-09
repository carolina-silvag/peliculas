/*var randomMovieArray = ['Star Wars', 'Game of Thrones', 'Lord of the anillos', 'harry potter'];

var randomNumber = math.floor((Math.random))*/



$('#btnSearch').click(search);
function search() {
  setSearchMovie($('#search').val());
}

function setSearchMovie(movie) {
	console.log($.ajax({url : "https://www.omdbapi.com/?apikey=9e7fd663"}))
}