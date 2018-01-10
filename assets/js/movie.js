
var config = {
    apiKey: "AIzaSyCfxD0tkJbQDTjNNPQe-fK79p_V0TUoWvY",
    authDomain: "peliculas-999a3.firebaseapp.com",
    databaseURL: "https://peliculas-999a3.firebaseio.com",
    projectId: "peliculas-999a3",
    storageBucket: "peliculas-999a3.appspot.com",
    messagingSenderId: "918922040142"
  };
  firebase.initializeApp(config);



// Configura accesos directos a las características de Firebase e inicia la autenticación de base de firebase.
  this.auth = firebase.auth();
  this.database = firebase.database();
  console.log(this.auth.currentUser);

  this.storage = firebase.storage();
  // this.store = firebase.storage();

  /*this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));*/



  var userPic = $('#user-pic').val();
  var userName = $('#user-name').val();
  $('#btnSignOut').click(signOut);

  function signOut() {
    var currentUser = this.auth.currentUser;

  if (currentUser) {
    var uid = currentUser.uid;
    var name = currentUser.displayName;
    var photoURL = currentUser.photoURL;
    this.database.ref("/user/"+uid).set({
      uid:uid,
      name:name,
      photoURL:photoURL,
      online:false
    });
    this.auth.signOut();
  }
  window.location.href = 'index.html';
  }

/*buscar por titulo*/
$('#btnSearch').click(search);
function search() {
  setSearchMovie($('#search').val());
}
