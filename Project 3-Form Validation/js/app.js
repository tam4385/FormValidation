
//Focus on the first (name) input box
$('#name').focus();
/* job Role Section*/
//initially hide the 'other' job role search bar
$('#other-title').hide();

//show the 'other' job role search bar if other is selected from the drop-down menu
$('#title').change(function () {
     const $selected = $(this).val()
     //console.log($selected);
    if ($selected === 'other') {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});
//creating a new select theme option and initially appending it to the colors list
const $selectTheme = document.createElement('option');
$($selectTheme).text('Please select a t-shirt theme');
$('#color').prepend($selectTheme);
$('#color').val('Please select a t-shirt theme');
//Initially hiding color options
$('#color option').hide();
// change event on design choices to determine which colors are available
$('#design').on('change', function () {
        
    if ($('#design').val() === 'heart js') {
            //set default value
            console.log('1st if successful');
            $('#color').find('option[value="gold"]').hide();
            console.log($('#color').find('option[value="gold"]'));
            $('#color').find('option[value="darkslategrey"]').hide();
            $('#color').find('option[value="cornflowerblue"]').hide();

            $('#color').find('option[value="dimgrey"]').show();
            $('#color').find('option[value="steelblue"]').show();
            $('#color').find('option[value="tomato"]').show();
            $('#color').val("tomato");
        }
        
        else if ($('#design').val() === 'js puns') {
            console.log('second if successful');
            $('#color').find('option[value="dimgrey"]').hide();
            $('#color').find('option[value="steelblue"]').hide();
            $('#color').find('option[value="tomato"]').hide();
            // use show method to return values back to the function in case there is a revert back
            $('#color').find('option[value="gold"]').show();
            console.log($('#color').find('option[value="gold"]'));
            $('#color').find('option[value="darkslategrey"]').show();
            $('#color').find('option[value="cornflowerblue"]').show();
            $('#color').val('cornflowerblue');
        }
        else {
            $('#color').find('option').hide();
        }

    
    });

//initially hiding all the options
$('#color').find('option[value="cornflowerblue"]').hide();

//activities section:

//global variable for total cost of activities
let total = 0;
let dollarSign = '$';
//create and append cost span element
const $costSpan = document.createElement('span');
$costSpan.textContent = 'Total cost: $' + total;
$('.activities').append($costSpan);
//event listener on the activites section
$('.activities').on('change blur', function (e) {
    //declaring needed local variables
    //the target element in a variable
    let $clicked = $(e.target);
    //The string of the label
    let string = $clicked.parent().text();
    //console.log(string);
    //The index of the dollar sign in the string
    $index = string.indexOf('$');
    //slicing the string to extract the cost of the clicked activity
    let cost = string.slice($index + 1);
    //console.log(cost);
    //turning the string into an integer
    cost = parseInt(cost);
    //console.log(cost);
        if ($($clicked).prop('checked')) {
        total += cost;
        //console.log('first if');
    } 
        else {
        total -= cost;
        //console.log('else');
    }
    //console.log(total);
    indexDash = string.indexOf('—');
    indexComma = string.indexOf(',');
    let date = string.slice(indexDash, indexComma);
    //console.log(date);
    //selecting the checkbox elements
    let checkboxes = $('.activities input');
    for (let i = 0; i < checkboxes.length; i++) {
        let input = $(checkboxes[i]).parent().text();
        if (input.includes(date) && input !== string) {
            if ($clicked[0].checked) {
            //console.log('so far so good')
            checkboxes[i].disabled = true;
            //console.log('disable successful');
        } else  {
            checkboxes[i].disabled = false;
        }   
    }
}
if (validActivity() === true) {
    $('.activities').css({border: 'none'});
}
$costSpan.textContent = '$' + total;
});

// payment section

//initially hiding the select payment type option from select menu
$('#payment').find('option[value="select_method"]').hide();
//targetting the div variables
const $creditCard = $('#credit-card');

//set default payment as credit card
$('#payment').val('credit card');

const $paypal = $($creditCard).next();
const $bitcoin = $($paypal).next();
//console.log($creditCard);
//console.log($paypal);
//console.log($bitcoin);
//initially hiding other payment options
$($paypal).hide();
$($bitcoin).hide();
//setting a change event handler to show and hide payment sections
$('#payment').on('change', function (e) {
    if (e.target.value === 'credit card') {
        $($paypal).hide();
        $($bitcoin).hide(); 
        $($creditCard).show();
    }
    if (e.target.value === 'paypal') {
        $($creditCard).hide();
        $($bitcoin).hide();
        $($paypal).show();
    }
    if (e.target.value === 'bitcoin') {
        $($paypal).hide();
        $($creditCard).hide();
        $($bitcoin).show();  
}
});
// validation of form fields

//validation functions for the master validator
function isValidName() {
    const nameInput = $('#name').val();
    return /^[a-zA-Z] ?[a-zA-Z]+$/.test(nameInput);   
}
function isValidEmail() {
    let emailInput = $('#mail').val();
    return /^[^@]+@[^@.]+\.[^@.]+$/.test(emailInput);
}
function validActivity() {
    if (total > 0) {
        return true;
    } else {
        return false;
  }
}
function isCreditCardValid() {
    let ccInput2 = $('#cc-num').val();
    return /^\d{16}$/.test(ccInput2)
}
function isCVVValid() {
    CVVInput = $('#cvv').val();
return /^\d{3,4}$/.test(CVVInput)
}
function isZipValid() {
    let zipInput = $('#zip').val();
   return /^\d{5}$/.test(zipInput); 
}
//email validator
$('#mail').on('keyup blur change', function () {
    let regex = /^[^@]+@[^@.]+\.[^@.]+$/;
    let emailInput = $('#mail').val();
    if (regex.test(emailInput) === true) {
    //console.log('if statement successful');
    $('#mail').css({border: "none"});
    }
    else { 
        $('#mail').css({border: "2px solid red"})
    }

});
// credit card validator
$('#cc-num').on('keyup blur', function () {
    const regex = /^\d{13,16}$/;
    let ccInput = $('#cc-num').val();
    //console.log(ccInput);
    if (ccInput.length === 0) {
        $('#cc-num').css({border: "2px solid red"})
    }
    else if (regex.test(ccInput) === true) {
        $('#cc-num').css({border: "none"});
    } else {
        $('#cc-num').css({border: "2px solid red"})
    }
});
//cvv validator
$('#cvv').on('keyup blur change', function () {
    const regex = /^\d{3,4}$/;
    let CVVInput = $('#cvv').val();
    //console.log(CVVInput);
    if (CVVInput.length === 0 || CVVInput.length > 4) {
        $('#cvv').css({border: "2px solid red"})
    }
    else if (regex.test(CVVInput) === true) {
        $('#cvv').css({border: "none"})
    }
    else {
        $('#cvv').css({border: "2px solid red"})
    }
});
//zip code validator (US zipcodes)
$('#zip').on('keyup blur change', function () {
    const regex = /^\d{5}$/;
    let zipInput = $('#zip').val();
    //console.log(zipInput);
    if (zipInput.length === 0) {
        $('#zip').css(  
            {border: "2px solid red"});
    }
    else if (regex.test(zipInput) === true) {
        $('#zip').css({border: "none"})
    } else { 
        $('#zip').css({border: "2px solid red"})
    }
});
//name validation event
$('#name').on('keyup change blur', function () {
    let nameInput = $('#name').val();
    if (nameInput.length === 0) {
        $('#name').css({border: "2px solid red"})
        // $('newErrorElement').show();
    } else {
        $('#name').css({border: "none"})
    }
});
//Master check on all fields
$('button').on('click', function (e) {
    let ccInput = $('#payment').val();
    if ($('#mail').val().length === 0) {
        $('#mail').focus();
        //alert('Please enter an email address.')
    }
    if (total === 0) {
        //alert('Please select an activity');
        $('.activities').css({border: 'red 2px solid'}); 

    }
    else {
        $('.activities').css({border: 'none'});
        $('.activities').focus();
    }
    if (ccInput === 'credit card') {
        if($('#cc-num').val().length === 0) {
            //alert('Please enter all valid credit card information.');
            $('#cc-num').focus();

        }
    if ($('#cvv').val().length === 0) {
        $('#cvv').focus();
    }
    if ($('#zip').val().length === 0) {
        $('#zip').focus();
    }
    }
    //if payment field value = credit card
    if (ccInput === 'credit card') {
        if (isValidName() === true && isValidEmail() === true && validActivity() === true
            && isCreditCardValid() === true && isCVVValid() === true && isZipValid() === true) {
        console.log('first if');
        alert('Thank you! Your request has been successfully submitted');
    } else {
        //console.log('else statement');
        e.preventDefault();
        //alert('Oops! Please ensure all fields are filled in correctly')
    }
}
// if payment selected is paypal or bitcoin
if (ccInput === 'paypal' || ccInput === 'bitcoin') {
    if (isValidName() === true && isValidEmail() === true
     && validActivity() === true) {
        alert('Thank you! Your request has been successfully submitted')
        $('form').submit();
        console.log('paypal and bitcoin if');
    } else {
        //alert('Oops! Please ensure all fields are filled in correctly');
        e.preventDefault();
    }
}
// if there is no payment method selected
if (ccInput !== 'credit card' && ccInput !== 'paypal' && ccInput !== 'paypal') {
    e.preventDefault();
}
});

  