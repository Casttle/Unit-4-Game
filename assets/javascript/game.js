//Start the game showing all of the characters to chose from

//if all enemies disappear game won
//try for life bars compaired to health

var char = $(".char-select");
var charPicked = $("#charPicked");
var enemies = $("#enemies");
var defender = $("#defender");
var charSelected = false;
var defSelected = false;
var battleLog = $("#battleLog");
// Set character stats and apply them repectfully

var cloud = {
    name: "Cloud",
    life: 200,
    attackP: 20,
    cAttack: 20
};
$("#cloud").attr(cloud);
$("#cloud").append("<p>" + cloud.name + 
"</p><img src='assets/images/cloud.png' class='charImage'><br><p class='Health'>HP: " + cloud.life + "</p>");

var barret = {
    name: "Barret",
    life: 250,
    attackP: 15,
    cAttack: 15
};
$("#barret").attr(barret);
$("#barret").append("<p>" + barret.name + 
"</p><img src='assets/images/barret.png' class='charImage'><br><p class='Health'>HP: " + barret.life + "</p>");

var tifa = {
    name: "Tifa",
    life: 180,
    attackP: 25,
    cAttack: 25
};
$("#tifa").attr(tifa);
$("#tifa").append("<p>" + tifa.name + 
"</p><img src='assets/images/tifa.png' class='charImage'><br><p class='Health'>HP: " + tifa.life + "</p>");

var vincent = {
    name: "Vincent",
    life: 150,
    attackP: 30,
    cAttack: 30
};
$("#vincent").attr(vincent);
$("#vincent").append("<p>" + vincent.name + 
"</p><img src='assets/images/vincent.png' class='charImage'><br><p class='Health'>HP: " + vincent.life + "</p>");


//Selecting one will move it to the character selected spot and the rest go to the enemies spot
char.on("click", function () {
    if (charSelected === false) {
        charPicked.append($(this));
        $(this).addClass("hero");
        $(enemies).append($("#charSelect").children().addClass("nemesis"));
        charSelected = true;
    }
});
//select an enemy to attack to move that enemy to the defender spot
$(document).on("click", ".nemesis", function () {
    if (defSelected === false) {
        defender.append($(this));
        $(this).addClass("defender");
        defSelected = true;
    }
});
//Hitting attack button will celculate the attack and counter attack of only the selected character and defender
//if selected character's life is 0, game over
//if defender life is 0, defender disapears and a new one is selected
$("#attack").on("click", function () {
    var heroName = $(".hero").attr("name");
    var heroLife = $(".hero").attr("life");
    var heroAttack = $(".hero").attr("attackP");
    var defenderName = $(".defender").attr('name');
    var defenderLife = $(".defender").attr("life");
    var defenderCattack = $(".defender").attr("cAttack");
    if ((charSelected === true) && (defSelected === true) && (heroLife > 0)) {
        defenderLife -= heroAttack;
        $(".defender").attr("life", defenderLife);
        $(".defender .hpDisplay").text("HP: " + defenderLife);
        
        console.log(defenderLife);

        heroLife -= defenderCattack;
        $(".hero").attr("life", heroLife);
        $(".hero .hpDisplay").text("HP: " + heroLife);

        console.log(heroLife);

        battleLog.html(heroName + " attacked " + defenderName + " for " + heroAttack + " Damage " +
        defenderName + " attacked " + heroName + " for " + defenderCattack + " Damage");
        // increace the hero's attack by its starting attack after each click
        if (heroLife > 0){
                if (heroName === "Cloud" ){
                    heroAttack = (parseInt(heroAttack) + cloud.attackP)
                    $(".hero").attr("attackP", heroAttack);
                }
                if (heroName === "Barret" ){
                    heroAttack = (parseInt(heroAttack) + barret.attackP)
                    $(".hero").attr("attackP", heroAttack);
                }
                if (heroName === "Tifa" ){
                    heroAttack = (parseInt(heroAttack) + tifa.attackP)
                    $(".hero").attr("attackP", heroAttack);
                }
                if (heroName === "Vincent" ){
                    heroAttack = (parseInt(heroAttack) + vincent.attackP)
                    $(".hero").attr("attackP", heroAttack);
                }
                console.log(heroAttack);
            }
        if (defenderLife <= 0) {
            defender.empty();
            defSelected = false;
            battleLog.html(heroName + " has defeated " + defenderName + "!! Who will be next?");    

    
            }
            if ((enemies.children().length === 0) && (defender.children().length === 0)) {
                battleLog.html("That's Amazing! You Won!!");
            }
            if (heroLife <= 0){
                charPicked.empty();
                battleLog.html("You Lost!! Reset to try again");
            }        
        } else {
        battleLog.html("You must select your Attacker and a Defenfer");
    }
});
