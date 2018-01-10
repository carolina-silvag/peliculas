// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCfxD0tkJbQDTjNNPQe-fK79p_V0TUoWvY",
    authDomain: "peliculas-999a3.firebaseapp.com",
    databaseURL: "https://peliculas-999a3.firebaseio.com",
    projectId: "peliculas-999a3",
    storageBucket: "peliculas-999a3.appspot.com",
    messagingSenderId: "918922040142"
  };
  firebase.initializeApp(config);
  
  $('#btnLogin').click(login);
  $('#btnSingUp').click(singUp);
  $('#icoGoogle').click(ingresoGoogle);
  $('#icoFacebook').click(ingresoFacebook);
  $('#btnVolverLogin').click(btnVolverLogin);

  var database = firebase.database();
  var userConect = null;

  function singUp() {
    var userName = $('#userName').val();
    var email = $('#signUpEmail').val();
    var password = $('#signUpPass').val();
    var auth = firebase.auth();

    var promise = auth.createUserWithEmailAndPassword(email, password);
    promise.then(function(user) {
      addUserBD(user, userName);
      console.log(user);
    }).catch(function(error) {
      console.log(error);
    });
  }

  function login() {
    var email = $('#email').val();
    var password = $('#password').val();
    var auth = firebase.auth();

    var promise = auth.signInWithEmailAndPassword(email, password);
    promise.then(function(user) {
      window.location.href = 'movie.html';
      console.log('logged in:', user);
    }).catch(function(error){
      console.log(error);
    })
  }
// })

function ingresoGoogle() {
  if(!firebase.auth().currentUser){
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


    firebase.auth().signInWithPopup(provider).then(function(result){

      var token = result.credential.accesstoken;

      var user = result.user;
      var name = result.user.displayName;

      agregarUserBD(user);
      window.location.href = 'movie.html';

    }).catch(function(error) {
      console.log("error", error.message);
      var errorCode = error.Code;

      var errorMessage = error.message;

      var errorEmail = error.email;

      var errorCredential = error.credential

      if(errorCode === 'auth/account-exists-with-different-credential'){
        alert('Es el mismo usuario')
      }
    });
  }else {
    firebase.auth().signOut();
  }
}

function ingresoFacebook() {
  if(!firebase.auth().currentUser){
    var provider = new firebase.auth.FacebookAuthProvider();

    provider.addScope('public_profile');


    firebase.auth().signInWithPopup(provider).then(function(result){

      var token = result.credential.accesstoken;

      var user = result.user;
      console.log(user);
      agregarUserBD(user);

      window.location.href = 'movie.html';

    }).catch(function(error) {
      console.log("error", error.message);
      var errorCode = error.Code;

      var errorMessage = error.message;

      var errorEmail = error.email;

      var errorCredential = error.credential

      if(errorCode === 'auth/account-exists-with-different-credential'){
        alert('Es el mismo usuario')
      }
    });
  }else {
    firebase.auth().signOut();
  }
}

function InicializarFire () {
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      console.log("USER!!!!", user);
      var displayName = user.displayName;
      var userPhoto = user.photoURL;
      var userEmail = user.email;

      /*userName.textContent = displayName;*/
      userConect = database.ref("/user");
      // agregarUserBD(user);
      /*child_added:*/ //escuchar
      /*child_change:*//*evento para capturar cuando se realiza un modificacion*/
      /*child_remove:*///remover un registro

      /*.on*/
      userConect.on('child_added', function(data){
        console.log("ha ingreado a la sala"+data.val().name);
      });
      userConect.on('child_removed', function(data){
        console.log(data.val().name+"Ha cerrado sesion")
      })
      /*database.ref("/user").on*/
    }
  });
}

/*agregar a la base de datos*/
function agregarUserBD(user){
  var uid = user.uid;
  var name = user.displayName;
  var photoURL = user.photoURL;
  database.ref("/user/"+uid).set({
    uid:uid,
    name:name,
    photoURL:photoURL,
    online:true
  });
}

function addUserBD(user, userName){
  var uid = user.uid;
  // var photoURL = user.photoURL;
  database.ref("/user/"+uid).set({
    uid:uid,
    name:userName,
    // photoURL:photoURL,
    online:true
  });
}

/*function btnVolverLogin(){
  console.log('no esta ocultando porque¡');
  $('#modalSign-up').css({'display': 'none'});
  $('#modalSign-up').removeClass('in');
  $('body').removeClass('modal-open');
  $('body').css({''});
}*/

window.onload = function(){
  InicializarFire();
}



