let hamburger = $('.hamburger');
let content = $('.hamburger-content');

$(hamburger).click(function(e){
    $(content).slideToggle();
})

let showPeople = $('#show-all-people');
let contacts = $('#show -all-contacts');