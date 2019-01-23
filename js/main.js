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
      var street = $("#street");
      var plz = $("#plz");
      var ort = $("#ort");

      //Create variables for entourage_form inputs
      var name_entourage = $("#name_entourage")
      var email_entourage = $("#email_entourage")


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


  //Validate Form

      //create variable for whether entourage is coming
      var entourage_is_coming = false;

      //create variable to activate submit button
      var button_is_active = false;

      //Check form validity everytime value in input field is changed
      $(".form-input").on('input', function() {
        validateForm();
      });


      //Check whether entourage is coming whenever checkbox-invisible is checked. Validate forms.
      $('#checkbox-invisible').change(function(){
        if ($("#checkbox-invisible").is(':checked')) {
          entourage_is_coming = true;
        }
        else {
          entourage_is_coming = false;
        }
        validateForm();
      });

      //Check Email and Name field for 'me' ('me' is the first guest. 'entourage' is the guest's guest)
      function checkMe() {
        //if (name and email are valid) AND address fields are valid (or empty), return true. Else return false.
        if ((checkBox(name_me) & checkBox(email_me)) & checkAddress()) {
          return true;
        }
        else {
          return false;
        }
      }

      //Check name and email fields for entourage (guest's guest). If NO entourage is coming, return true.
      function checkEntourage() {
        if (entourage_is_coming == true) {
          if (checkBox(name_entourage) & checkBox(email_entourage)) {
            return true;
          }
          else {
            return false;
          }
        }
        //entourage is not coming ==> always return true (user cant insert invalid information for someone who's not coming)
        else {
          return true;
        }
      }

      //CHECK ADDRESSES
      function checkAddress() {
        //if all address fields (street, plz, ort) are left empty ==> Return true
        if (allAddressBoxesEmpty()) {
          return true;
        }
        //else:
        else {
          //all address fields must be valid ==> true
          if (allAddressBoxesValid()) {
            return true;
          }
          //else: return false
          else {
            return false;
          }
        }
      }

      //check whether specific address Box is empty: Return true if it is. Else, return false.
      function addressBoxEmpty(input) {
        if (input.val() == "") {
          return true;
        }
        else {
          return false;
        }
      }

      //check whether ALL address boxes are empty (street, plz, ort)
      function allAddressBoxesEmpty() {
        if (addressBoxEmpty(street) & addressBoxEmpty(plz) & addressBoxEmpty(ort)) {
          return true;
        }
        else {
          return false;
        }
      }
      
      //check whether all Address Inputs fields are Valid (street, plz, ort) by running each field through checkBox. Return true if they are. Else, return false.
      function allAddressBoxesValid() {
        if (checkBox(street) & checkBox(plz) & checkBox(ort)) {
          return true;
        }
        else {
          return false;
        }
      }

      //Create object with a regex to validate each field
      var regex = {
        name: /^[a-z ,.'-]+$/i,
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        street:/^[a-z \d,.'-]+$/i,
        plz:/^[\d]{4}?$/,
        ort:/^[a-z ,.'-]+$/i,
      };

      //Validate each field against its corresponding regex. Return true or false.
      function checkBox(input) {
        //Create variable with value INSIDE the corresponding field (e.g. inside 'name', we find 'Max Mustermann')
        var value = input.val();
        //Create a variable with each field's corresponding regex, by using this field's name and accessing the 'regex' object.
        var specificRegex = regex[input.attr('name')];
        //If the field passes the regex test (is valid), removeClass .invalid (visual, red) from that field. Return true.
        if (specificRegex.test(value)) {
          input.removeClass("invalid");
          return true;
        }
        //Else: addClass .invalid to that field and return false.
        else {
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

      //If both forms (me and entourage) are valid, activate Button.
      //Else: deactivate Button.
      function validateForm() {
        if (checkMe() & checkEntourage()) {
          activateButton();
        }
        else {
          deactivateButton();
        }
      }
      validateForm();

  });
