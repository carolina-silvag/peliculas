$(document).ready(() => {
  var idMovie = []
  $.ajax({
    url: 'http://www.omdbapi.com/?i=tt3896198&apikey=9e7fd663',
    /*data: {
        apikey: '9e7fd663',
        s: movie,
        type : 'movie'
    },*/
  })
  .done(function(data) {
    console.log(data);
    //for(var i = 0; i < data.Search.length; i++) {
      /*console.log(data['Search'][i]['imdbID']);
      idMovie.append(data['Search'][i]['imdbID']);*/
      //$('#listMovie').append('<div class="listMovieAll"><a href="#"><img src="'+data['Search'][i]['Poster']+'" alt=""></a></div>')
    //}
  })
  .fail(function(error) {
    console.log(error);
  });

  
})


/*buscar por titulo*/
$('#btnSearch').click(search);
function search() {
  setSearchMovie($('#search').val());
}
