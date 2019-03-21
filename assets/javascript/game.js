var jediArray = [];
var jediImgLookup = {};

// General Character Structure and Functions.  Note this is a factory method.  See Init below.
const trainJedi = ({ name, healthPoints, attackPower, counterAttackPower, index, attackNumber = 1, isPlayer = false }) => ({
    //Game related
    healthPoints,
    attackPower,
    counterAttackPower,
    index,
    attackNumber,
    isPlayer,

    isStillInTheGame: function () {
        return this.healthPoints > 0;
    },

    fatalDamage: function () {
        var dom = this.getMainDiv();
        //Remove Jedi from Defend Area.
        dom.remove();
        if(!this.isPlayer) {
            jediGameStateMachine.foeIndex = undefined;
            $("#damageDoneLog").html("");
            $("#damageRecievedLog").html("You have defeated " + this.name + ", you can choose to fight another enemy.");
            instruction("Pick a new Foe.");
        }
    },

    sufferDamage: function (damageValue) {
        this.healthPoints -= damageValue;

        if(this.isPlayer) {
            $("#damageRecievedLog").html(jediArray[jediGameStateMachine.foeIndex].name + " attacked you back for " + damageValue + " damage.");
        } else {
            $("#damageDoneLog").html("You attacked " + this.name + " for " + damageValue + " damage.");
        }

        if (!this.isStillInTheGame()) {
            this.fatalDamage();
            this.getHealthDom().html("0");
        }
        else {
            this.getHealthDom().html(this.healthPoints);
        }
    },

    defend: function (attackDamage, sourceJedi) {
        //Take Damage.
        this.sufferDamage(attackDamage);

        if (this.isStillInTheGame()) {
            sourceJedi.sufferDamage(this.counterAttackPower);
        }
    },

    isNoOneElseStanding: function() {
        var assumedVictory = false;
        for(var i = 0; i < jediArray.length; i++) {
            if(i != this.index) {
                assumedVictory |= jediArray[i].isStillInTheGame();
            }
        }
        return !assumedVictory;
    },

    evaluateSituation: function () {
        if (!this.isStillInTheGame()) {
            //Handle Defeat.
            instruction("You have been defeated.  Click an image or refresh to try again.");
        } else if (this.isNoOneElseStanding()) { //Replace false with check to see if there no jedi in the available AND Defend Area.
            //Handle Victory.
            jediGameStateMachine.getPlayerDom().addClass("master");
            instruction("You've gained the master class.  Woohoo!");
        }
    },

    attack: function (jedi) {
        jedi.defend(this.attackPower * this.attackNumber++, this);
    },

    //HTML related
    name,
    getMainDiv: function () {
        return $("div[index='" + this.index + "']");
    },

    getHealthDom: function () {
        return this.getMainDiv().find(".health");
    }

});

function instruction(sNewText) {
    $("#instruction").html(sNewText);
}

var jediGameStateMachine = {
    playerIndex: undefined,
    foeIndex: undefined,

    getPlayer: function () {
        return jediArray[this.playerIndex];
    },

    getPlayerDom: function() {
        return $(".player");
    }
};

// Events
// Attack Button
// if personal jedi is selected && defender jedi is selected, call personal Jedi.attack(defenderJedi)

// Character Selection

//If no personal jedi is selected, select them
//else if no defender is selected, select them
//else ignore click.

// const domJedi =  ({ name, healthPoints, attackPower, counterAttackPower }) => ({
// });

function moveOtherJediToFoes() {
    $(".jedi").each(function () {
        if (!$(this).hasClass("player")) {
            $(this).addClass("possibleFoe");
            $(this).appendTo("#jediFoes");
        }
    });
}

// Init Jedi
$(document).ready(function () {

    //Initialize Jedi
    jediArray.push(trainJedi({ name: "Rey", healthPoints: 100, attackPower: 15, counterAttackPower: 10, index: 0 }));
    jediArray.push(trainJedi({ name: "Mace", healthPoints: 100, attackPower: 12, counterAttackPower: 25, index: 1 }));
    jediArray.push(trainJedi({ name: "Grievous", healthPoints: 300, attackPower: 2, counterAttackPower: 5, index: 2 }));
    jediArray.push(trainJedi({ name: "Yoda", healthPoints: 80, attackPower: 7, counterAttackPower: 50, index: 3 }));

    //A long Object initialization can be cumbersome to read.  I've setup a lookup for the associated images.
    //Better keeping them in the same order or you'll be sorry!
    jediImgLookup[0] = "rey.png";
    jediImgLookup[1] = "mace.png";
    jediImgLookup[2] = "grievous.png";
    jediImgLookup[3] = "yoda.png";

    //Using a for loop rather than foreach so I can add a DataAttribute that lets us look up Jedi in array.
    for (var i = 0; i < jediArray.length; i++) {
        //Build HTML element and put them in Available Area.
        var domJedi = $("<div class='jedi' index='" + i + "'>");

        var imgJedi = $("<img class='jediImg' src='assets/images/" + jediImgLookup[i] + "' alt='" + jediArray[i].name + "'>");
        domJedi.append(imgJedi);

        var name = $("<div class='jediName' id='" + jediArray[i].name + "'>" + jediArray[i].name + "</div>");
        domJedi.append(name);

        var health = $("<div class='health'>" + jediArray[i].healthPoints + "</div>");
        domJedi.append(health);

        $("#inactiveCharacters").append(domJedi);
    }

    $(".jediImg").click(function (e) {

        var selectedIndex = e.currentTarget.parentElement.getAttribute("index");
        
        if (jediGameStateMachine.playerIndex === undefined) {
            jediGameStateMachine.playerIndex = selectedIndex;
            jediArray[selectedIndex].isPlayer = true;
            $(this).parent().addClass("player");
            moveOtherJediToFoes();
            instruction("Select someone to fight.");
            $("#possibleFoesDescription").html("Possible Foes");
        } else if (!jediGameStateMachine.getPlayer().isStillInTheGame()) {
            location.reload();
        } else if (jediGameStateMachine.foeIndex === undefined) {
            if(jediArray[selectedIndex].isStillInTheGame()) {
                jediGameStateMachine.foeIndex = selectedIndex;
                $(this).parent().addClass("activeEnemy");
                $(this).parent().appendTo("#defenderArea");
                $("#activeFoeDescription").html("Active Foe");
                instruction("Click on them to attack.");
            }
        } else if (jediGameStateMachine.foeIndex === selectedIndex) {
            //Attack
            jediGameStateMachine.getPlayer().attack(jediArray[selectedIndex]);
            jediGameStateMachine.getPlayer().evaluateSituation();
        }
    });

});


