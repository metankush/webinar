$("#test").click(function() {
    $.ajax({
        url: "record",
        success: function(result) {
            $("#h11").html(result);
        }
    });
});