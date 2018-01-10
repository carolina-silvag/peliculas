
/*cargando peliculas encontradas*/
function setSearchMovie(movie) {
  console.log('generando peticion para ', movie);
  $.ajax({
    url: 'http://www.omdbapi.com',
    data: {
        apikey: '9e7fd663',
        s: movie,
        type : 'movie'
    },
  })
  .done(function(data) {
    console.log(data);
    for(var i = 0; i < data.Search.length; i++) {
      console.log(data['Search'][i]['Poster']);
      $('#listMovie').append('<div class="listMovieAll"><a href="#"><img src="'+data['Search'][i]['Poster']+'" alt=""></a></div>')
    }
  })
  .fail(function(error) {
    console.log(error);
  });
    
}
