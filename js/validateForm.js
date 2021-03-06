$(document).ready(function(){

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
      $(".button-submit").addClass("activated");
    }

    //deactivate button (positive and negative) and add .inactive class (visually)
    function deactivateButton() {
      $(".button-submit").removeClass("activated");
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
    //Run upon load
    validateForm();

});
