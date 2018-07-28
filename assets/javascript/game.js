//Start the game showing all of the characters to chose from
//Selecting one will move it to the character selected spot and the rest go to the enemies spot
//select an enemy to attack to move that enemy to the defender spot
//Hitting attack button will celculate the attack and counter atted of only the selected char and defender
//if selected char's life is 0, game over
//if defender life is 0, defender disapears and a new one is selected
//if all enemies disappear game won
//try for life bars compaired to health

var char = $(".char");
var charPicked = $("#charPicked");
var enemies = $("#enemies");
var defender = $("#defender");
var charSelected = false;
var defSelected = false;
var hero = $(".hero");
var hero = $(".defender");



char.on("click", function () {
    if ((charSelected === false) && (defSelected === false)) {
        char.appendTo(enemies);
        $(this).addClass("hero");
        $(this).appendTo(charPicked);
        charSelected = true;
    } else if ((charSelected === true) && (defSelected === false)) {
        $(this).addClass("defender");
        $(this).appendTo(defender);
        defSelected = true;
    }
});

