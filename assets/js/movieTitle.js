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
    window.location.href = 'index.html';
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
