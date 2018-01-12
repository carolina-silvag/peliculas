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
    myMovies(uid);
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

function myMovies (uid) {
  console.log('buscando peliculas para ', uid);
  database.ref('/sagas/'+uid).on("value", function(data) {
    var movies = data.val();
    console.log(movies);
  });
}
// Instantiate the Bootstrap carousel
$('.multi-item-carousel').carousel({
  interval: false
});

// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
$('.multi-item-carousel .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));
  
  if (next.next().length>0) {
    next.next().children(':first-child').clone().appendTo($(this));
    
    if (next.next().next().length > 0) {
          next.next().next().children(':first-child').clone().appendTo($(this));
     } else {
       $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
     }
  } else {
  	$(this).siblings(':first').children(':first-child').clone().appendTo($(this));
  }
  
});
