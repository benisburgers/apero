$(document).ready(function(){

  //pageflow
  //open sign up page positive from landing page
  $("#button_coming").click(function(){
    $(".landing-page").hide();
    $("#signup-positive").removeClass("hidden");
  });
  //open sign up page negative from landing page
  $("#button_not_coming").click(function(){
    $(".landing-page").hide();
    $("#signup-negative").removeClass("hidden");
  });
  //open positive confirmation page from positive sign up page
  $("#button_submit_positive").click(function(){
    $("#signup-positive").addClass("hidden");
    $("#confirmation-positive").removeClass("hidden");
  });
  //open negative confirmation page from negative sign up page
  $("#button_submit_negative").click(function(){
    $("#signup-negative").addClass("hidden");
    $("#confirmation-negative").removeClass("hidden");
  });

  //Form Script: Use bellow function to take media queries (name and email) and insert into the form
  //function to access URL querys
    var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    //create variables for seperate URL querys
    var vname = getUrlParameter('vname');
    var nname = getUrlParameter('nname');
    var name  = vname + " " + nname
    var email = getUrlParameter('email');

    //Insert query values into respective form fields
    $("#name").val(name)
    $("#email").val(email)
});
