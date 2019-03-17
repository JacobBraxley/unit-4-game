var allJedi = [];

// General Character Obj.
var jedi = {
    //Game related
    healthPoints: 0,
    attackPower: 0,
    counterAttackPower: 0,

    isStillInTheGame: function() {
        return healthPoints > 0;
    },

    fatalDamage: function() {
        //Remove Jedi from Defend Area.
    },

    sufferDamage: function(damageValue) {
        this.healthPoints -= damageValue;
    },

    defend: function(attackDamage, sourceJedi) {
        //Take Damage.
        sufferDamage(attackDamage);

        if(this.isStillInTheGame()) {
            sourceJedi.sufferDamage(this.counterAttackPower);
        }
    },

    //HTML related
    identifier: undefined,
    
}

var playerCharacter = {
    jediSelected: undefined,
    attackNumber: 1,
    isPlayer: true,

    evaluateSituation: function() {
        if(!this.jediSelected.isStillInTheGame()) {
            //Handle Defeat.
        } else if(false) { //Replace false with check to see if there no jedi in the available AND Defend Area.
            //Handle Victory.
        }
    },

    attack: function(jedi) {
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


// Init Jedi
$(document).ready(function() {
    //Initialize Jedi
    
})