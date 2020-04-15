  // Get the modal
  var modalLogin = document.getElementById("modalL");
  var modalRegistraija = document.getElementById("modalR");

  // Get the button that opens the modal
  var btnLogin = document.getElementById("loginBtn");
  var btnRegistraija = document.getElementById("registracijaBtn");

  // Get the <span> element that closes the modal
  var closeLogin = document.getElementById("closeL");
  var closeRegistracija = document.getElementById("closeR");




// When the user clicks on the button, open the modal
btnLogin.onclick = function() {
  modalLogin.style.display = "block";
};
btnRegistraija.onclick = function() {
  modalRegistraija.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeLogin.onclick = function() {
  modalLogin.style.display = "none";
};
closeRegistracija.onclick = function() {
  modalRegistraija.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalLogin) {
    modalLogin.style.display = "none";
  }
  if (event.target == modalRegistraija) {
    modalRegistraija.style.display = "none";
  }
};
