$(document).ready(function(){

  //pageflow
    //open sign up page positive from landing page
    $("#button_coming").click(function(){
      $(".landing-page").hide();
      $(".signup-page").removeClass("hidden");
      $(".signup-page > .negative").addClass("hidden");
    });
    //open sign up page negative from landing page
    $("#button_not_coming").click(function(){
      $(".landing-page").hide();
      $(".signup-page").removeClass("hidden");
      $(".signup-page > .positive").addClass("hidden");
    });
    //open positive confirmation page from positive sign up page
    $("#button_submit_positive").click(function(){
      //active button only if form requirements bellow are met
      if (buttonActive == true) {
        $(".signup-page").addClass("hidden");
        $(".confirmation-positive").removeClass("hidden");
      }
    });
    //open negative confirmation page from negative sign up page
    $("#button_submit_negative").click(function(){
      //active button only if form requirements bellow are met
      if (buttonActive == true) {
        $(".signup-page").addClass("hidden");
        $(".confirmation-negative").removeClass("hidden");
      }
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
      var nameBox = $("#name");
      var emailBox = $("#email");
      var isEmailValid;
      var isNameValid;
      var emailBoxValue;
      var nameBoxValue;
      var entourage;
      var buttonActive;

      //Insert query values into respective form fields
      nameBox.val(name);
      emailBox.val(email);


      //Check whether email is valid
      function emailCheck() {
        //gain access to value inside email box
        emailBoxValue = emailBox.val();
        //create regex to check email box value
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //test value of email box against regex, save as variable
        isEmailValid = emailRegex.test(emailBoxValue);
      }

      function nameCheck() {
        //gain access to value inside nameBox
        nameBoxValue = nameBox.val();
        //nameBoxValue must be longer than three characters to allow for two names (first and last) and a space. Additionaly, a space must be present.
        if ((nameBoxValue.length > 2 == true) && (nameBoxValue.search(" ") > -1)) {
          isNameValid = true;
        }
        else {
          isNameValid = false;
        }
        console.log(nameBoxValue)
        console.log(nameBoxValue.length)
        console.log(isNameValid)
      }

      //if requirenments for form are met (email and name), remove .inactive class (appearance) to button_submit_positive and button_submit_negative, AND activate button by giving buttonActive value=true
      //Do opposite if requirenments are not met.
      function addClassToButton() {
        emailCheck();
        nameCheck();
        if (isEmailValid == true && isNameValid == true) {
          $("#button_submit_positive").removeClass("inactive");
          $("#button_submit_negative").removeClass("inactive");
          buttonActive = true;
        }
        else {
          $("#button_submit_positive").addClass("inactive");
          $("#button_submit_negative").addClass("inactive");
          buttonActive = false;
        }
      }
      //Run function on load
      addClassToButton();

      //Run above function(check input's validity), everytime user changes content in emailBox or nameBox
      emailBox.on('input', function(){
        addClassToButton();
      });
      nameBox.on('input', function(){
        addClassToButton();
      });

      //everytime checkbox-invisible is checked, function checks whether a guest/entourage is coming
      $('#checkbox-invisible').change(function(){
        if ($("#checkbox-invisible").is(':checked')) {
          console.log("theres guests coming");
        }
        else (
          console.log("there's no guests")
        )
      })

});
