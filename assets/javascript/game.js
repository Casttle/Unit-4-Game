//Start the game showing all of the characters to chose from


//try for life bars compaired to health
$(document).ready(function () {
    var char = $(".char-select");
    var charPicked = $("#charPicked");
    var enemies = $("#enemies");
    var defender = $("#defender");
    var charSelected = false;
    var defSelected = false;
    var startBlock = false;
    var battleLog = $("#battleLog");
    var bash1 = new Audio("assets/audio/hit.wav");
    var bash2 = new Audio("assets/audio/bash2.wav");
    var bash3 = new Audio("assets/audio/bash3.wav");
    var strike = [bash1, bash2, bash3];
    var win = new Audio("assets/audio/kill.wav");
    var victory = new Audio("assets/audio/Victory.wav");
    var gameOver = new Audio("assets/audio/Game-Over.wav");
    var beep = new Audio("assets/audio/beep.wav");
    var battleTheme = new Audio("assets/audio/Fighting.wav");

    // Set character stats and apply them repectfully
    var cloud = {
        name: "Cloud",
        life: 160,
        attackP: 15,
        cAttack: 15
    };
    $("#cloud").attr(cloud);
    $("#cloud").append("<p>" + cloud.name +
        "</p><img src='assets/images/cloud.png' class='charImage'><br><p class='health'>HP: " + cloud.life + "</p>");

    var barret = {
        name: "Barret",
        life: 185,
        attackP: 10,
        cAttack: 10
    };
    $("#barret").attr(barret);
    $("#barret").append("<p>" + barret.name +
        "</p><img src='assets/images/barret.png' class='charImage'><br><p class='health'>HP: " + barret.life + "</p>");

    var tifa = {
        name: "Tifa",
        life: 115,
        attackP: 20,
        cAttack: 20
    };
    $("#tifa").attr(tifa);
    $("#tifa").append("<p>" + tifa.name +
        "</p><img src='assets/images/tifa.png' class='charImage'><br><p class='health'>HP: " + tifa.life + "</p>");

    var vincent = {
        name: "Vincent",
        life: 100,
        attackP: 25,
        cAttack: 25
    };
    $("#vincent").attr(vincent);
    $("#vincent").append("<p>" + vincent.name +
        "</p><img src='assets/images/vincent.png' class='charImage'><br><p class='health'>HP: " + vincent.life + "</p>");

        // A click anywere will start the game and play the battle theme
    $(document).on("click", function () {
        if (startBlock === false) {
            battleTheme.play();
            $("header").hide();
            startBlock = true;
            console.log(startBlock);
        }
    });
    //Selecting one will move it to the character selected spot and the rest go to the enemies spot
    char.on("click", function () {
        if ((charSelected === false) && (startBlock === true)) {
            charPicked.append($(this));
            $(this).addClass("hero");
            $(enemies).append($("#charSelect").children().addClass("nemesis"));
            beep.play();
            charSelected = true;
        }
    });
    //select an enemy to attack to move that enemy to the defender spot
    $(document).on("click", ".nemesis", function () {
        if (defSelected === false) {
            defender.append($(this));
            $(this).addClass("defender");
            beep.play();
            defSelected = true;
        }
    });
    //Hitting attack button will celculate the attack and counter attack of only the selected character and defender
    $("#attack").on("click", function () {
        var heroName = $(".hero").attr("name");
        var heroLife = $(".hero").attr("life");
        var heroAttack = $(".hero").attr("attackP");
        var defenderName = $(".defender").attr('name');
        var defenderLife = $(".defender").attr("life");
        var defenderCattack = $(".defender").attr("cAttack");
        if ((charSelected === true) && (defSelected === true) && (heroLife > 0) && (defenderLife > 0)) {
            strikeSound = strike[Math.floor(Math.random() * strike.length)];
            strikeSound.pause();
            strikeSound.currentTime = 0;
            strikeSound.play();
            defenderLife -= heroAttack;
            $(".defender").attr("life", defenderLife);
            $(".defender .health").text("HP: " + defenderLife);

            console.log(defenderLife);

            heroLife -= defenderCattack;
            $(".hero").attr("life", heroLife);
            $(".hero .health").text("HP: " + heroLife);

            console.log(heroLife);
            charPicked.animate({left:"+=40px"},200);
            defender.animate({left:"-=40px"},200);
            charPicked.animate({left:"-=40px"},200);
            defender.animate({left:"+=40px"},200);

            battleLog.html("<p class='bp'>" + heroName + " attacked " + defenderName + " for " + heroAttack + " Damage</p><p class='bp'>" +
                defenderName + " attacked " + heroName + " for " + defenderCattack + " Damage</p>");
            // increace the hero's attack by its starting attack after each click
            if (heroLife > 0) {
                if (heroName === "Cloud") {
                    heroAttack = (parseInt(heroAttack) + cloud.attackP)
                    $(".hero").attr("attackP", heroAttack);
                }
                if (heroName === "Barret") {
                    heroAttack = (parseInt(heroAttack) + barret.attackP)
                    $(".hero").attr("attackP", heroAttack);
                }
                if (heroName === "Tifa") {
                    heroAttack = (parseInt(heroAttack) + tifa.attackP)
                    $(".hero").attr("attackP", heroAttack);
                }
                if (heroName === "Vincent") {
                    heroAttack = (parseInt(heroAttack) + vincent.attackP)
                    $(".hero").attr("attackP", heroAttack);
                }
                console.log(heroAttack);
            }
            //if defender life is 0, defender disapears and a new one is selected
            if (defenderLife <= 0) {
                win.play();
                $(".defender").fadeOut(1000);
                setTimeout(empty, 1000);
                function empty() {
                    defender.empty();
                    defSelected = false;
                    checkWin();
                }
                battleLog.html(heroName + " has defeated " + defenderName + "!! Who will be next?");
            }
            //if all enemies disappear game won. Was not needed as a function untill the fadeOut was added
            function checkWin() {
                if ((enemies.children().length === 0) && (defender.children().length === 0) && (heroLife > 0)) {
                    battleTheme.pause();
                    battleTheme.currentTime = 0;
                    victory.play();
                    battleLog.html("That's Amazing! You Won!!");
                }
            }
            //if selected character's life is 0, game over
            if (heroLife <= 0) {
                win.play();
                $(".hero").fadeOut(1000);
                setTimeout(empty, 1000);
                function empty() {
                    battleTheme.pause();
                    battleTheme.currentTime = 0;
                    gameOver.play();
                    charPicked.empty();
                }
                battleLog.html("You Lost!! Reset to try again");
            }

        } else {
            battleLog.html("You must select your Attacker and a Defenfer");
        }
    });

    // function playTheme() {
    //     battleTheme.play();
    //     };
    //     setTimeout(playTheme, 1000);
});
