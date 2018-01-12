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
var movieData = null;

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

/*guardando el valor obtenido de movie.js*/
var movie = $.urlParam('search');
setSearchMovie(movie);


/*cargando peliculas encontradas*/
function setSearchMovie(movie) {
  console.log('generando peticion para ', movie);
  $.ajax({
    url: 'http://www.omdbapi.com',
    data: {
        apikey: '9e7fd663',
        i: movie,
        type : 'movie'
    },
  })
  .done(function(data) {
    console.log(data);
    // Se limipia la lista de fotos
    if (data.Response != "False") {
      movieData = data;
      $('#choseImage').attr('src', data['Poster'])
      $('#parrafo').html(data['Plot'])
      $('#title').html(data['Title']);
      $('#director').html(data['Director']);
      $('#writer').html(data['Writer']);
      $('#actors').html(data['Actors']);
      $('#production').html(data['Production']);
      $('#year').html(data['Year']);
      $('#awards').html(data['Awards']);
      $('#runtime').html(data['Runtime']);
    }

  })
  .fail(function(error) {
    console.log(error);
  });
    
}

$('#btnVerMovie').click(watchMovie)

function watchMovie() {
  addDatosMovie();
}


function addDatosMovie() {
  console.log(currentUser);
  var uid = currentUser.uid;
  database.ref("/sagas/"+uid+"/"+movieData['imdbID']).set(movieData);
}

$('#star1').click(califico);
$('#star2').click(califico);
$('#star3').click(califico);
$('#star4').click(califico);
$('#star5').click(califico);

/*var star1 = 0;
var star2 = 0;
var star3 = 0;
var star4 = 0;
var star5 = 0;*/
function califico() {

}