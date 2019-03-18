var jediArray = [];
var jediImgLookup = {};

// General Character Structure and Functions.  Note this is a factory method.  See Init below.
const trainJedi = ({ name, healthPoints, attackPower, counterAttackPower }) => ({
    //Game related
    healthPoints,
    attackPower,
    counterAttackPower,

    isStillInTheGame: function () {
        return healthPoints > 0;
    },

    fatalDamage: function () {
        //Remove Jedi from Defend Area.
    },

    sufferDamage: function (damageValue) {
        this.healthPoints -= damageValue;
    },

    defend: function (attackDamage, sourceJedi) {
        //Take Damage.
        sufferDamage(attackDamage);

        if (this.isStillInTheGame()) {
            sourceJedi.sufferDamage(this.counterAttackPower);
        }
    },

    //HTML related
    name,

});

var playerCharacter = {
    jediSelected: undefined,
    attackNumber: 1,
    isPlayer: true,

    evaluateSituation: function () {
        if (!this.jediSelected.isStillInTheGame()) {
            //Handle Defeat.
        } else if (false) { //Replace false with check to see if there no jedi in the available AND Defend Area.
            //Handle Victory.
        }
    },

    attack: function (jedi) {
        jedi.defend(this.jediSelected.attackPower * attackNumber++);

    }
}

// Events
// Attack Button
// if personal jedi is selected && defender jedi is selected, call personal Jedi.attack(defenderJedi)

// Character Selection

//If no personal jedi is selected, select them
//else if no defender is selected, select them
//else ignore click.

const domJedi =  ({ name, healthPoints, attackPower, counterAttackPower }) => ({
});

// Init Jedi
$(document).ready(function () {
    //Initialize Jedi
    jediArray.push(trainJedi({ name: "Rey", healthPoints: 100, attackPower: 15, counterAttackPower: 10 }));
    jediArray.push(trainJedi({ name: "Mace", healthPoints: 100, attackPower: 12, counterAttackPower: 25 }));
    jediArray.push(trainJedi({ name: "Grievous", healthPoints: 300, attackPower: 2, counterAttackPower: 5 }));
    jediArray.push(trainJedi({ name: "Yoda", healthPoints: 80, attackPower: 4, counterAttackPower: 50 }));

    //A long Object initialization can be cumbersome to read.  I've setup a lookup for the associated images.
    //Better keeping them in the same order or you'll be sorry!
    jediImgLookup[0] = "rey.png";
    jediImgLookup[1] = "mace.png";
    jediImgLookup[2] = "grievous.png";    
    jediImgLookup[3] = "yoda.png";

    //Using a for loop rather than foreach so I can add a DataAttribute that lets us look up Jedi in array.
    for (var i = 0; i < jediArray.length; i++) {
        //Build HTML element and put them in Available Area.

        var domJedi = $("<div class='jedi' index='"+ i +"'>");

        var imgJedi = $("<img class='jediImg' src='assets/images/" + jediImgLookup[i] + "' alt='" + jediArray[i].name +"'>");
        domJedi.append(imgJedi);
     
        var name = $("<div class='jediName' id='" + jediArray[i].name + "'>" + jediArray[i].name + "</div>");
        domJedi.append(name);

        var health = $("<div class='health'>"+jediArray[i].healthPoints+"</div>");
        domJedi.append(health);

        $("#inactiveCharacters").append(domJedi);
    }

    $(".jediImg").click(function(e) {
        console.log("Clicked " + e.currentTarget.parentElement.getAttribute("index"));
    });

});


