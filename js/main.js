$(document).ready(function(){

  //Page Flow: Hide and show different sections
    //open sign up page positive from landing page
    $("#button_coming").click(function(){
      $(".landing-page").addClass("left");
      $(".signup-page").addClass("center").removeClass("right");
      $(".signup-page > .negative").addClass("hidden");
    });
    //open sign up page negative from landing page
    $("#button_not_coming").click(function(){
      $(".landing-page").addClass("left");
      $(".signup-page").addClass("center").removeClass("right");
      $(".signup-page > .positive").addClass("hidden");
    });
    //open positive confirmation page from positive sign up page
    $("#button_submit_positive").click(function(){
      //active button only if button_is_active is true
      if (button_is_active) {
        $(".signup-page").addClass("left");
        $(".confirmation-positive").addClass("center").removeClass("right");
      }
    });
    //open negative confirmation page from negative sign up page
    $("#button_submit_negative").click(function(){
      //active button only if button_is_active is true
      if (button_is_active) {
        $(".signup-page").addClass("left");
        $(".confirmation-negative").addClass("center").removeClass("right");
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

      //Create variables for me_form inputs
      var name_me = $("#name_me");
      var email_me = $("#email_me");

      var name_entourage = $("#name_entourage")
      var email_entourage = $("#email_entourage")

      var street = $("#street");
      var plz = $("#plz");
      var ort = $("#ort");


      //Insert query values into respective form fields in me_form input fields.
      function fillOutForm() {
        //fill out nameBox_me only if vname and nname are available from URL, in order to avoid "undefined undefined" string inside form
        if (vname != null && nname != null) {
          name_me.val(full_name);
        }
        email_me.val(email);
      }
      //run upon page load
      fillOutForm();


  //Validate Form

      //create variable for whether entourage is coming
      var entourage_is_coming = false;

      //create variable to activate submit button
      var button_is_active = false;

      //Actualize and validate values of input fields everytime they change
      $(".form-input").on('input', function() {
        checkEveryone();
      });


      //Check whether entourage is coming whenever checkbox-invisible is checked. Validate forms.
      $('#checkbox-invisible').change(function(){
        if ($("#checkbox-invisible").is(':checked')) {
          entourage_is_coming = true;
        }
        else {
          entourage_is_coming = false;
        }
        checkEveryone();
        console.log("entourage_is_coming" + entourage_is_coming)
      });

      //CHECK NAME AND EMAIL


      function checkMe() {
        if (nameAndEmailCheck(name_me, email_me) & addressCheck()) {
          return true;
        }
        else {
          return false;
        }
      }

      function checkEntourage() {
        if (entourage_is_coming == true) {
          if (checkBox(name_entourage) & checkBox(email_entourage)) {
            return true;
          }
          else {
            return false;
          }
        }
        //entourage is not coming ==> always return true (cant insert invalid information for someone who's not coming)
        else {
          return true;
        }
      }

      function nameAndEmailCheck() {
        console.log("nameAndEmailCheck");
        if (checkBox(name_me) & checkBox(email_me)) {
          return true;
        }
        else {
          return false;
        }
      }

      //CHECK ADDRESSES
      function addressCheck() {
        console.log("addressCheck")
        if (allAddressBoxesEmpty()) {
          console.log("addressCheck: true")
          return true;
        }
        else {
          if (allAddressBoxesValid()) {
            console.log("addressCheck: true")
            return true;
          }
          else {
            console.log("addressCheck: false");
            return false;
          }
        }
      }

      function allAddressBoxesEmpty() {
        console.log("allAddressBoxesEmpty")
        if (addressBoxEmpty(street) & addressBoxEmpty(plz) & addressBoxEmpty(ort)) {
          console.log("allAddressBoxesEmpty: true")
          return true;
        }
        else {
          console.log("allAddressBoxesEmpty: false")
          return false;
        }
      }

      function addressBoxEmpty(input) {
        console.log("addressBoxEmpty")
        if (input.val() == "") {
          console.log("addressBoxEmpty: true");
          return true;
        }
        else {
          console.log("addressBoxEmpty: false");
          return false;
        }
      }

      function allAddressBoxesValid() {
        console.log("allAddressBoxesValid")
        if (checkBox(street) & checkBox(plz) & checkBox(ort)) {
          console.log("allAddressBoxesValid: true")
          return true;
        }
        else {
          console.log("allAddressBoxesValid: false");
          return false;
        }
      }

      var regex = {
        name: /^[a-z ,.'-]+$/i,
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        street:/^[a-z \d,.'-]+$/i,
        plz:/^[\d]{4}?$/,
        ort:/^[a-z ,.'-]+$/i,
      };

      function checkBox(input) {
        console.log("checkBox")
        var value = input.val();
        console.log(value);
        var specificRegex = regex[input.attr('name')];
        console.log(specificRegex);
        console.log(specificRegex.test(value));
        if (specificRegex.test(value)) {
          console.log("checkBox: true")
          input.removeClass("invalid");
          return true;
        }
        else {
          console.log("checkBox: false");
          input.addClass("invalid");
          return false;
        }
      }

      //activate submit button (positive and negative) and remove .inactive class (visually)
      function activateButton() {
        button_is_active = true;
        $("#button_submit_negative, #button_submit_positive").removeClass("inactive");
      }

      //deactivate button (positive and negative) and add .inactive class (visually)
      function deactivateButton() {
        button_is_active = false;
        $("#button_submit_negative, #button_submit_positive").addClass("inactive");
      }


            function checkEveryone() {
              if (checkMe() & checkEntourage()) {
                activateButton();
              }
              else {
                deactivateButton();
              }
            }
            checkEveryone();

  });
