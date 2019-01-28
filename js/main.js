
//Create global variables

  //Create variables for me_form inputs
  var name_me = $("#name_me");
  var email_me = $("#email_me");
  var street = $("#street");
  var plz = $("#plz");
  var ort = $("#ort");

  //Create variables for entourage_form inputs
  var name_entourage = $("#name_entourage")
  var email_entourage = $("#email_entourage")

$(document).ready(function(){



  //Page Flow: Hide and show different sections
    //open sign up page positive from landing page
    // LANDING PAGE ==> SIGN UP PAGE

    $(".button").click(function(){
      //active button only if button_is_active is true
      var origin = ($(this).attr('data-origin'))
      var destination = ($(this).attr('data-destination'))
      var positiveOrNegative = ($(this).attr('name'))
      if ($(this).hasClass("activated")) {
        $("." + origin).addClass("left").delay(100).addClass("hidden");
        $("." + destination).addClass("center").removeClass("right hidden").find("." + positiveOrNegative).removeClass("hidden");
      }
    });


  //Fill out Form Script: Use bellow function to take URL queries (name and email) and insert into the form
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
      //Create variables for URL queries
      var vname = getUrlParameter('vname');
      var nname = getUrlParameter('nname');
      var full_name  = vname + " " + nname
      var email = getUrlParameter('email');


      //Insert URL query values into respective form fields in me_form input fields.
      function fillOutForm() {
        //fill out nameBox_me only if vname and nname are available from URL, in order to avoid "undefined undefined" string inside form
        if (vname != null && nname != null) {
          name_me.val(full_name);
        }
        email_me.val(email);
      }
      //run upon page load
      fillOutForm();

  });
