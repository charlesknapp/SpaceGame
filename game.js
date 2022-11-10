// Disable right-click
document.addEventListener('contextmenu', event => event.preventDefault());

/// Results after move
const fightWinCheck = badGuy => {
  if (badGuy.hull <= 0) {
    console.log("You blew up " + badGuy.name + " Nice job!");
    victory();
  } else {
    console.log("Nice attack! Keep shooting!");
  }
};

// Check for winnings
const WinChecking = () => {
  if (badGuys[0] === "dead") {
    console.log("%c You killed the enemies! Winner winner! ", "border-radius:7px;color:white;border:1px dashed green;");
    alert("Awesome! You won! Refresh the page to try again!");
  } else {
    console.log("%c There are still aliens left to kill... ", "border-radius:7px;border:1px solid yellow;color:Yellow;");
    
    if (badGuys[3] === "dead") {
      badGuys[0].missile(myShip);
    } else {
      badGuys[0].fight(myShip);
    }
  }
};

// Victory function
const victory = () => {
  if (badGuys[0].hull <= 0) {
    console.log("%c Awesome! You destroyed the alien ship! ", "border-radius:7px;border:1px solid LightGreen;color: lightGreen;");
    badGuys[badGuys.length] = "dead";
    badGuys.splice(0, 1);
    WinChecking();
  } else {
    console.log("%c The enemy is still alive! ", "border-radius:7px;border:1px solid yellow;color:Yellow;");
    WinChecking();
  }
};

// Defeat function
const defeat = myShip => {
  if (myShip.hull <= 0) {
    console.log("%c Game over, you are dead! - refresh the page to play again ", "border-radius:7px;color:white;border:1px dashed red;");
    alert(`Oh no! Your ship blew up! The ${myShip.name} is gone! Close this pop-up and refresh the page to try again!`);
  } else {
    console.log("%cCaptain, it's your turn now. Enter an attack below: ", "font-size:16px;");
  }
};

let enigneers = ["E", "E", "E"];
this.myMissles = ["M", "M", "M", "M", "M", "M"];

// Your Ship class
class Ship {
  constructor(name, hull, accuracy) {
    this.name = name;
    this.hull = hull || 20;
    this.accuracy = accuracy || 0.7;
    this.weapons = {lasers: 4,missles: myMissles.length};
    this.catchPhrases = ["That'll do it!","It's getting hot in here!","Consider them defeated!","One shot at a time!"];
  }

  // Catchphrase sassiness
  talkSas() {
    let rUp = this.catchPhrases[
      Math.floor(Math.random() * this.catchPhrases.length)
    ];
    console.log(`${this.name}says \"${rUp}\"`);
  }

  // Announce your health amount
  announceHealth() {
    console.log("I am" + this.name + "my shields are now " + this.hull);
  }

  //Repair hull
  repairShip() {
    if (enigneers[0] === "E") {
      enigneers[enigneers.length] = "o";
      enigneers.splice(0, 1);
      console.log(this.name + "your hull strength was improved! The engineers did all the work!");
      this.hull += 10;
      this.announceHealth();
      console.log("%c It is still your turn", "color:lightgreen;");
    } else {
      console.log("%c Your engineers are all on a coffe break! It is still your turn... ", "");
    }
  }

  // Our missile attack sequence
  missile(badGuy) {
    if (this.hull >= 1) {
      if (badGuy.name === badGuys[0].name) {
        if (Math.floor(Math.random() * Math.floor(9)) / 10 <= this.accuracy) {
          if (myMissles[0] == "M") {
            this.talkSas();
            console.log(this.name + "used missles. 10 hitpoints dealt");
            console.log(
              badGuy.name + " got hit with a missle, their health is down to");
            console.log((badGuy.hull += -10));
            myMissles[myMissles.length] = "o";
            myMissles.splice(0, 1);
            victory(badGuy);
          } else {
            console.log("%cYou're out of missiles! Switching to lasers...", "color:lightgreen;");
            console.log("%cCaptain, it's your turn. Enter an attack below: ", "font-size:16px;color:lightgreen;");
          }
        } else {
          console.log("%c Aww shucks! You missed your shot!", "color:red;");
          victory(badGuy);
        }
      } else {
        console.log("%cWhat are you shooting at?! choose another target or refresh the page to play again", "color:firebrick;");
        console.log("%cYour turn now! Enter your move below:", "color:LightGreen;");
      }
    } else {
      console.log("You died! Refresh the page to play again!"); // Hull less than 1? Are you're still trying to win?!
    }
  }

  // Our laser attack sequence
  laser(badGuy) {
    if (this.hull >= 1) {
      // Attack with lasers if you are still alive
      if (badGuy.name === badGuys[0].name) {
        if (Math.floor(Math.random() * Math.floor(9)) / 10 <= this.accuracy) {
          // Above is a random to determine if hit or not roughly 80% sucess rate
          this.talkSas();
          console.log(this.name + "used laser. " + this.weapons.lasers + " hitpoints dealt");
          console.log(badGuy.name + " got hit with your lasers! Their health is down to");
          console.log((badGuy.hull += -this.weapons.lasers));
          victory(badGuy);
        } else {
          console.log("%cGosh darn! That shot was so close! However, you missed! ", "color:Gold;");
          victory(badGuy);
        }
      } else {
        console.log("%cWhat are you shooting at?! choose another target or refresh the page to play again", "color:Silver;");
        console.log("%cYour turn now! Enter your move below:", "color:LightGreen;");
      }
    } else {
      console.log("You died! Refresh the page to play again!"); // Hull less than 1? Are you're still trying to win?!
    }
  }
}

/// Defining your ship character
let myShip = new Ship(" USS Negative Zero ");

// Alien ship constructor
class Alienship {
  constructor(name) {
    this.name = name;
    this.hull = Math.floor(Math.random() * 4) + 3; // Make random between 3 & 6
    this.firepower = Math.floor(Math.random() * 3) + 2; // Make random between 2 & 4 for their lazers
    this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10; // Make random between .6 and .8
    this.weapons = {
      lazers: Math.floor(Math.random() * 3) + 2,
      mizzle: 7
    };
    this.catchPhrases = [
      "Your pathetic weapons are no match for us!",
      "- Feel the power of our weapons! ",
      `- How does your spaceship dust taste! `,
      `- Aliens will rule the world! Just wait! `,
      `- Garp flarp zuzzy blotzin... you thought aliens only spoke English? `,
      `- Watch us destroy you, humans! `,
      `- Not bad for a human, now feel the power of our weapons!`,
      `- Let's see how you do against our futuristic technology, human!`,
      `- Kill them all!`,
      `- Butter youself up, human! You're toast! `
    ];
  }
  // Always adding a bit of sassiness
  talkSmack() {
    let rIp = this.catchPhrases[
      Math.floor(Math.random() * this.catchPhrases.length)
    ];
    console.log(this.name + " says " + rIp);
  }

  // Announce current alien health
  announceHealth() {
    console.log("our shields are now " + this.hull);
  }

  // Alien fight sequence
  fight(myShip) {
    if (this.name === badGuys[0].name) {
      if (Math.floor(Math.random() * Math.floor(9)) / 10 <= this.accuracy) {
        this.talkSmack();
        console.log(this.name + " used laser. " + this.weapons.lazers + " hitpoints dealt");
        console.log("%cTake that, human! ", "");
        console.log(`%cBeaming hull power to ship monitor...`, "color:gray;");
        console.log("Hull Power: "+ (myShip.hull -= this.firepower));
        console.log("", "");
        defeat(myShip);
      } else {
        console.log(this.name + " has terrible aim and couldn't hit us.");
        console.log("Those aliens missed their shot." + myShip.name + "took no damage. Hull power at " + myShip.hull);
        defeat(myShip);
      }
    } else {
      console.log("dead aliens can't shoot");
      //return to your move
      defeat(myShip);
    }
  }
  // Alien missile attack sequence
  missile(myShip) {
    if (this.name === badGuys[0].name) {
      if (Math.floor(Math.random() * Math.floor(9)) / 10 <= this.accuracy) {
        this.talkSmack();
        console.log(this.name + " used missiles, dealing 7 hit points to you ship..");
        console.log(`%cBeaming hull power to ship monitor...`, "color:gray;");
        console.log("Hull Power: "+ (myShip.hull -= this.firepower));
        defeat(myShip);
      } else {
        console.log(this.name + " can't hit their shots, lol!");
        console.log("Ha! those aliens shoot like stormtroopers " + myShip.name + "took no damage. Hull power  =  " + myShip.hull); 
        defeat(myShip);
      }
    } else {
      console.log("dead aliens can't shoot");
      //return to your move
      defeat(myShip);
    }
  }
}

// Storing enemy ships in array. Empty array? = win game
let badGuys = [];
badGuys.unshift((alien6 = new Alienship("Alien6")));
badGuys.unshift((alien5 = new Alienship("Alien5")));
badGuys.unshift((alien4 = new Alienship("Alien4")));
badGuys.unshift((alien3 = new Alienship("Alien3")));
badGuys.unshift((alien2 = new Alienship("Alien2")));
badGuys.unshift((alien1 = new Alienship("Alien1")));

// ============ LET THE BATTLE BEGIN ============ //
console.log("%c 🌎 THERE ARE 6 ALIEN SHIPS HEADED TO ATTACK EARTH! ",
"font-size:14px;color:Pink;padding: 10px;");
console.log("%c • Your ship is displayed below. Check it out before you get started.", "color:lightskyblue;");
console.log(myShip);
console.log("", "");
console.log("%c • Destroy the alien ships to win the game. ", "color:lightgreen;");
console.log("%c • You have unlimited (weak) lasers, and a limited number of (strong) missles you can fire ", "color:lightgreen;");
console.log("%c • You'll only make around 80% of your shots this round. ", "color:lightgreen;");
console.log("%c • The enemies will only make around 50% of their shots this round. ", "color:lightgreen;");
console.log("%c • TIP: if you are getting destroyed, you can search for a way to fix your hull ", "color:green;");
console.log("", "");
console.log("%c ⚔️ LET'S BEGIN THE BATTLE", "font-size:14px;color:Pink;padding: 10px;");
console.log(" The" + myShip.name + "was heading towards UniversalDrinks&More when... ");
console.log("%c Beep Beep Boop Boop 'WARNING. ALIENS DETECTED' Beep Beep Boop Boop... ", "");
console.log(" Cpatain, there are 6 approaching alien ships! I don't think they are friendly... ");
console.log("", "");
console.log("%c • Open your ship's scanner results below to see what you're up against ", "color:lightskyblue;");
console.log(badGuys);
console.log("", "");
console.log(" Brace yourselves! They are charging their weapons and opening fire! ");
console.log("", "");
alien1.fight(myShip);
