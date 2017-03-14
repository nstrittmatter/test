var chars = []; //store characters temporarily
var s_char = new Store('character'); //store characters until you delete it

if(s_char.get('characters')){
    for(var x in s_char.get('characters')){
       var name = s_char.get('characters')[x]['name'];
       var skills = s_char.get('characters')[x]['skills'];
       var items = s_char.get('characters')[x]['items'];

       put_contents(x, name, skills, items);
    }
}

function put_contents(id, name, skills, items){
        var div = $("<div>").attr('class', 'box').appendTo('#characters');
        $("<p>").text('Name: ' + name).appendTo(div);
        $("<p>").text('Skills: ' + skills).appendTo(div);
        $("<p>").text('Items: ' + items).appendTo(div);
        $("<p>").html("<input type='button' class='btn_delete' id="+ id +" value='delete'/>").appendTo(div);
    }

    $('#btn_create').click(function(e){
    var character_count = $('.box').length;
    if(character_count < 3){ //we can only add up to 3 characters
        var name    = $('#name').val();
        var skills  = $('#skills').val();
        skills = skills.split(','); //convert skills to array
        var items   = $('#items').val();
        items = items.split(','); //convert to items array

        //create a template for the character
        var character = function(name, skills, items){
         this.name = name,
         this.skills = skills,
         this.items = items
        }

        //create new characters from the template
        chars[character_count] = new character(name, skills, items);

        s_char.set('characters', chars); //save character to store

        put_contents(character_count, name, skills, items);

        $('input[type=text]').val(''); //clear all textbox
    }else{
        alert('Cannot create more than 3 characters');
    }
});

$('.btn_delete').live('click', function(){

    //using delete leaves an undefined item on the index
    //that was deleted the following code
    //removes the undefined items
    $('.box').remove();
    var characters = s_char.get('characters');
    var id = $(this).attr('id');

    delete characters[id];

    var tmpArray = new Array();
    for(el in characters) {
         if(characters[el]) { //if current item is not a falsy value
              tmpArray.push(characters[el]);
         }
    }
    s_char.set('characters', tmpArray);  //save to store

    //loop through the new list of characters
    for(var x in tmpArray){
        var name = tmpArray[x]['name'];
        var skills = tmpArray[x]['skills'];
        var items = tmpArray[x]['items'];

        put_contents(x, name, skills, items);
    }
});

$('#btn_reset').click(function(){
    s_char.reset(); //resets the s_char store
    alert('Storage has been successfully reset!');
    $('.box').remove();
});

window.addEventListener("storage", function(e){
    location.reload();
}, false);
