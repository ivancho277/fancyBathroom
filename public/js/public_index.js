
$("#fun").on("click", function() {
    console.log("button pressed");
    $.post("/api/users", {userid:"hhww", userName: "sailormoon"}, function(err, result) {
        console.log("in ajax post call", result);
       
    });

});
// $.get("/api/users", function(err, result) {
//     console.log(result);
// });