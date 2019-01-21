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
      //active button only if form requirements bellow are met
      if (button_is_active == true) {
        $(".signup-page").addClass("left");
        $(".confirmation-positive").addClass("center").removeClass("right");
      }
    });
    //open negative confirmation page from negative sign up page
    $("#button_submit_negative").click(function(){
      //active button only if form requirements bellow are met
      if (button_is_active == true) {
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
      var name_me  = vname + " " + nname
      var email_me = getUrlParameter('email');

      //Create variables for me_form inputs
      var nameBox_me = $("#name_me");
      var emailBox_me = $("#email_me");

      //Insert query values into respective form fields in me_form input fields.
      function fillOutForm() {
        //fill out nameBox_me only if vname and nname are available from URL, in order to avoid "undefined undefined" string inside form
        if (vname != null && nname != null) {
          nameBox_me.val(name_me);
        }
        emailBox_me.val(email_me);
      }
      //run upon page load
      fillOutForm();


  //Validate Form

      //Create variables for entourage_form inputs
      var nameBox_entourage = $("#name_entourage");
      var emailBox_entourage = $("#email_entourage");

      //access values from inside form inputs
      var nameBoxValue_me = nameBox_me.val();
      var emailBoxValue_me = emailBox_me.val();
      var nameBoxValue_entourage = nameBox_entourage.val();
      var emailBoxValue_entourage = emailBox_entourage.val();

      //create variable for whether entourage is coming
      var entourage_is_coming = false;

      //create variable to activate submit button
      var button_is_active = false;

      //Actualize and validate values of input fields everytime they change
      nameBox_me.add(nameBox_entourage).on('input', function() {
        nameCheckNew($(this));
      });
      emailBox_me.add(emailBox_entourage).on('input', function() {
        emailCheckNew($(this));
      });

      //Check whether entourage is coming whenever checkbox-invisible is checked. Validate forms.
      $('#checkbox-invisible').change(function(){
        if ($("#checkbox-invisible").is(':checked')) {
          entourage_is_coming = true;
        }
        else {
          entourage_is_coming = false;
        }
        formCheckBoth();
      });

      //Check whether name input is valid
      function nameCheck(input) {
        //rgex to check name input value
        var nameRegex = /^[a-z ,.'-]+$/i
        //test value of name against regex ==> Return true if validate (must include only "valid" characters and one space)
        return((nameRegex.test(input)))
      }

      //Check whether email input is valid
      function emailCheck(input) {
        //regex to check email box value
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //test value of email box against regex ==> Return true if valid
        return(emailRegex.test(input));
      }

      //Check whether name input is valid
      function nameCheckNew(input) {
        //rgex to check name input value
        var nameRegex = /^[a-z ,.'-]+$/i
        //access value inside namebox
        var nameValue = input.val();
        //test value of name against regex ==> Return true if validate (must include only "valid" characters and one space)
        if (nameRegex.test(nameValue)) {
          //if nameInput meets requirenments removeClass("invalid") (visual/red text)
          input.removeClass("invalid");
        }
        else {
          //else: add class .invalid (visual)
          input.addClass("invalid");
        }
      }

      //Check whether email input is valid
      function emailCheckNew(input) {
        //regex to check email box value
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //access value inside emailBox
        var emailValue = input.val()
        //test value of email box against regex ==> Return true if valid
        if (emailRegex.test(emailValue)) {
          input.removeClass("invalid");
        }
        else {
          input.addClass("invalid");
        }
      }

      //check for name and email validity in forms. Return true if both values are valid.
      function formCheck(nameValue, emailValue) {
        if ((nameCheck(nameValue) == true) && (emailCheck(emailValue) == true)) {
          return true
        }
        else {
          return false;
        }
      }

      //activate submit button (positive and negative) and remove .inactive class (visually)
      function activateButton() {
        button_is_active = true;
        $("#button_submit_negative").removeClass("inactive");
        $("#button_submit_positive").removeClass("inactive");
      }

      //deactivate button (positive and negative) and add .inactive class (visually)
      function deactivateButton() {
        button_is_active = false;
        $("#button_submit_negative").addClass("inactive");
        $("#button_submit_positive").addClass("inactive");
      }

      //check both forms (me and entourage) for validity. Activate button if forms are valid, deactive button if they are not valid.
      function formCheckBoth() {
        //Is form_me valid AND entourage is NOT coming
        if (formCheck(nameBoxValue_me, emailBoxValue_me) && entourage_is_coming == false) {
          activateButton();
        }
        //Is form_me valid AND entourage_form is valid
        else if (formCheck(nameBoxValue_me, emailBoxValue_me) && formCheck(nameBoxValue_entourage, emailBoxValue_entourage)) {
            activateButton();
          }
        //If neither is neither the case
        else {
          deactivateButton();
        }
      }
      // run function upon load
      formCheckBoth();

  });
