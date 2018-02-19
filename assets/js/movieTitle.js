var config = {
  apiKey: "AIzaSyCfxD0tkJbQDTjNNPQe-fK79p_V0TUoWvY",
  authDomain: "peliculas-999a3.firebaseapp.com",
  databaseURL: "https://peliculas-999a3.firebaseio.com",
  projectId: "peliculas-999a3",
  storageBucket: "peliculas-999a3.appspot.com",
  messagingSenderId: "918922040142"
};

firebase.initializeApp(config);
var database = firebase.database();
var auth = firebase.auth();
var currentUser = null;

auth.onAuthStateChanged(function(user) {
  if (user) {
    //Cargamos la informacion del usuario logueado
    loadCurrentUser(user.uid);
  } else {
    // No usuario logueado.
    /*window.location.href = 'index.html';*/
  }
});

function loadCurrentUser(uid) {
  console.log('buscando ', uid);
  database.ref('/user/'+uid).on("value", function(data) {
    var user = data.val();
    currentUser = user;
    var divUserName = $('#user-name');
    var divUserPic = $('#user-pic');
    divUserName.html(user.name);
    divUserName.removeAttr('hidden');
    divUserPic.find('img').attr({
      src: user.photoURL
    });
    divUserPic.removeAttr('hidden');
  });
}


$('#btnSignOut').click(signOut);

function signOut() {
  currentUser;
  console.log(currentUser);

  if (currentUser) {
    var uid = currentUser.uid;
    var name = currentUser.name;
    var photoURL = currentUser.photoURL;
    console.log(currentUser);
    database.ref("/user/"+uid).set({
      uid:uid,
      name:name,
      photoURL:photoURL,
      online:false
    });
    auth.signOut();
  }
  window.location.href = 'index.html';
}

/*informacion desde movie.html */
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}

console.log($.urlParam('search'));

$('#btnSearch').click(search);
function search() {
  setSearchMovie($('#search').val());
}
/*guardando el valor obtenido de movie.js*/
var movie = $.urlParam('search');
setSearchMovie(movie);


var cols = 0;
var idMovie = [];
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
    // Se limipia la lista de fotos
    $('#listMovie').html("");
    cols = 0;
    if (data.Response != "False") {
      for(var i = 0; i < data.Search.length; i++) {
        var imgMovie = data['Search'][i]['Poster'];
        var nameMovie = data['Search'][i]['Title'];
        var id = data['Search'][i]['imdbID'];
        if(imgMovie != "N/A") {
          createElement(imgMovie, nameMovie, i + 1, id);  
        }
        /*$('#listMovie').append('<div class="listMovieAll"><a href="#"><img src="'+data['Search'][i]['Poster']+'" alt=""></a></div>')*/
      }
    }
  })
  .fail(function(error) {
    console.log(error);
  });
    
}

/*filtro por año mas titulo*/
function setFiltreMovie(movie, year) {
  iIndex = 0;
  console.log('generando peticion para ', movie);
  $.ajax({
    url: 'http://www.omdbapi.com',
    data: {
        apikey: '9e7fd663',
        s: movie,
        type : 'movie',
        y: year
    },
  })
  .done(function(data) {
    console.log(data);
    // Se limipia la lista de fotos
    $('#listMovie').html("");
    cols = 0;
    for(var i = 0; i < data.Search.length; i++) {
      var id = data['Search'][i]['imdbID'];
      if ($('#language').val() == "") {
        var imgMovie = data['Search'][i]['Poster'];
        var nameMovie = data['Search'][i]['Title'];
        if (imgMovie != "N/A") {
          createElement(imgMovie, nameMovie, i + 1, id);    
        }
      } else {
        getDataMovie(id);
      }
    }
  })
  .fail(function(error) {
    console.log(error);
  });
    
}

/*fitro con titulo mas año mas idioma*/
var iIndex = 0;
function getDataMovie(id) {
  $.ajax({
    url: 'http://www.omdbapi.com',
    data: {
        apikey: '9e7fd663',
        i: id,
        type : 'movie'
    }
  })
  .done(function(data) {
    console.log(data['Language'], $('#language').val(), data['Language'] == $('#language').val());
    if (data['Language'] == $('#language').val()) {
      console.log("success", data);
      var imgMovie = data['Poster'];
      var nameMovie = data['Title'];
      var id = data['imdbID'];
      iIndex++;
      createElement(imgMovie, nameMovie, iIndex, id);
    }
  })
  .fail(function(e) {
    console.log("error", e);
  });
  
}

function createElement(imgMovie, nameMovie, index, id) {
  console.log(imgMovie, nameMovie, index);
    if (cols == 0) {
      $("#listMovie").append('<div class="row listMovie"></div>');
    }

    var urlImage = imgMovie
    var name = nameMovie;
    /*var direccion = place.vicinity;
    var local = place.location;*/

    $("#listMovie .row").last().append('<div class="portafolio col-xs-3 imgcont"><div class="portafolio-contenedor img-'+index+' imgContenedor data-toggle="modal" data-target="#modalLocal""></div></div>');
    $('.img-'+index).css({'background-image': 'url('+urlImage+')', 'height': '20em', 'background-repeat': 'no-repeat', 'background-position': 'center center'});
    $('.img-'+index).last().append('<span class="nameList text-center"><strong>'+name+'</strong></span>');
    $('.img-'+index+' span').hide();
      $('.btnClose').click(function(event) {
      $('.name').last().html('');
      $('.direccion').last().html('');
      });

    $('.img-'+index).click(function(event) {
      console.log("me pinche!!!", id);
      window.location.href = 'view.html?search='+id;
    });


    $('.img-'+index).mouseover(function(event) {
      $('.img-'+index).css({'opacity': '0.6'})
      $('.img-'+index+' span').show();
    });
    $('.img-'+index).mouseleave(function(event) {
      $('.img-'+index).css({'opacity': '1'})
      $('.img-'+index+' span').hide();
    });


    cols++;

    if (cols == 4) {
      cols = 0;
    }
  
}

for (var i = 1900; i <= 2018; i++) {
  $("#yearCombobox").append('<option value="'+i+'">'+i+'</option>');
}
$("#yearCombobox").val(2018);

$('#btnFilter').click(filterResults);
function filterResults() {
  var movie = $('#search').val();
  var year = $('#yearCombobox').val();
  setFiltreMovie(movie, year);
}