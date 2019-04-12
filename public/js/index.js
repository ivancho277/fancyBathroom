// load login modal on button click 
$("#login-modal").modal("show");
$("#modal-button").on("click", function () {
    $("#login-modal").modal("show");
});

res.render('index', {favorites: true});