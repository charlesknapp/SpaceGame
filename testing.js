// Checking for winnings
const battleWinCheck = enemy => {
    if (enemy.hull <= 0) {
        console.log("You blew up " + enemy.name + " Finish them!");
        victory();
        }
        else {
          console.log("keep shooting! KILL THEM!");
        }
    };
    
    // Who wins?
    const winner = () => {
        if (enemy[0] === "dead") {
            console.log("Congrats you saved the kids! We can sleep at night now!",);
            alert("You Won !!!! Click the link on the page to refresh and play again");
        }
        else {
          console.log("The Aliens are still out there!",);
          console.log("An Alien is coming!!",);
          
          if (enemy[3] === "dead") {
            enemy[0].attack(hero);
        }
        else {
            enemy[0].fight(hero); 
        }
    }
};

const victory = () => {
    if (enemy[0].hull <= 0) {
        console.log("You got one! Great shot soldier");
        enemy[enemy.length] = "dead";
        enemy.splice(0, 1);
        winner();
        }
        else {
            console.log(" Great shot. The Aliens are still coming!!");
            winner();
        }
    };
    
    const defeat = hero => {
        if (hero.hull <= 0) {
            console.log(" You died! The aliens took our kids - refresh the page to play again",);
          alert(` Oh No your ship blew up ! The ${hero.name} is floating away in space`);
        }
        else {
            console.log("Your turn now captian enter your move below .. ");
        }
    };
    
      class Uss {
        constructor(name, hull, accuracy) {
          this.name = name;
          this.hull = hull || 20;
          this.accuracy = accuracy || 0.7;
          this.weapons = {
            lasers: 5,
            missles: myMissles.length
        }
    };
    
    announceHealth() {
        console.log("I am" + this.name + "my shields are now " + this.hull);
    }
    attack(enemy) {
        if (this.hull >= 1) {
            //////attack with missles if you are still alive
            if (enemy.name == enemy[0].name) {
                //// attack the right bad guy
                if (Math.floor(Math.random() * Math.floor(9)) / 10 <= this.accuracy) {
                    //// above random to determine if hit or not roughly 80% sucess rate
                    if (myMissles[0] == "M") {
                        ////// can only use certian amount of missles
                        console.log(this.name + " used  missles 10 hitpoints dealt");
                        console.log(enemy.name + " got hit with a missle, their health is down to");
                        console.log((enemy.hull += -10));
                        myMissles[myMissles.length] = "o";
                        myMissles.splice(0, 1);
                        victory(enemy); ///// check if you destroted the ship or not and they or the next one returns fire
                    }
                else {
                    console.log("you are out of missles switch to lasers");
                  ///// does not count as turn - could be typo
                  console.log("it is still your turn now captian enter your move below. ");
                }
            }
            else {
                console.log("You missed");
                victory(enemy);
              }
            }
            else {
                console.log(" What are you shooting at ? dead aliens or the wrong target - choose another target or refresh the page to play again");
                console.log("Your turn now captian enter your move below. "); 
            }
        }
        else {
            console.log("you are dead refresh the game to play again");
          }
        }

        // Laser function
        laser(enemy) {
            if (this.hull >= 1) {
                //////attack with lasers if you are still alive ... /// ... following logic similiar to missle but no array to access for shot count since lasers are unlimited currently....
                if (enemy.name === enemy[0].name) {
                    if (Math.floor(Math.random() * Math.floor(9)) / 10 <= this.accuracy) {
                        /// above random to determine if hit or not roughly 80% sucess rate
                        console.log(this.name + " used laser " + this.weapons.lasers + " hitpoints dealt");
                        console.log(enemy.name + " got hit with your - S - lasers, their health is down to");
                        console.log((enemy.hull += -this.weapons.lasers));
                        victory(enemy);
                    }
                    else {
                        console.log("that shot was close but unfortunately you missed ");
                        victory(enemy);
                    }
                }
                else {
                    console.log("You are shooting dead aliens - choose another target or refresh the page to play again");
                    console.log("it is still your turn now captian enter your move below.");
                }
            }
            else {
                console.log("you are dead reset the game refresh the page to play again");
            }
        }
    };


    class Alien {
        constructor(name) {
            this.name = name;
            this.hull = Math.floor(Math.random() * 4) + 3; //// make random between 3 & 6
            this.firepower = Math.floor(Math.random() * 3) + 2; /// make random between 2 & 4 for their lazers with a z ... /////////
            this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10; ///// make random between .6 and .8 /////
            this.weapons = {lazers: Math.floor(Math.random() * 3) + 2,mizzle: 7};
        }
        announceHealth() {
            console.log("We are the " + this.name + " our shields are now " + this.hull);
        }
        fight(hero) {
            if (this.name === enemy[0].name) {
                if (Math.floor(Math.random() * Math.floor(9)) / 10 <= this.accuracy) {
                    console.log(
                        this.name + " used lazer " + this.weapons.lazers + " hitpoints dealt");
                        console.log("take that huumooonns!");
                        console.log("We got hit by alien lazers!!! our hull power is down!! ");
                        console.log((hero.hull -= this.firepower));
                        defeat(hero); /// but did you die? also returns it to your move
                    }
            else {
                console.log(this.name + " can not hit the side of a barn. Lucky us!");
                console.log("good those alien scumbags missed us " + hero.name + "took no damage. Hull power at " + hero.hull);
                defeat(hero); 
            }
        }
        else {
            console.log("dead aliens can't shoot"); 
            defeat(hero);
        }
    };
    
    attack(hero) {
        if (this.name === enemy[0].name) {
            if (Math.floor(Math.random() * Math.floor(9)) / 10 <= this.accuracy) {
                this.talkSmack();
                console.log(this.name + " used  mizzlez with a z dealing 7 hit points to you ship..");
                console.log(hero.name + " got hit with an alien Z * mizzle, their health is down to");
                console.log((hero.hull += -7));
                defeat(hero);
            }
            else {
                console.log(this.name + "  can not hit the side of a barn"); 
                console.log("Ha! those aliens shoot like blind kids " + hero.name + "took no damage. Hull power  =  " + hero.hull); 
                defeat(hero);
            }
        }
        else {
            console.log("dead aliens can't shoot");
            defeat(hero);
        }
    }
};

let enigneers = ["E", "E", "E"];
this.myMissles = ["M", "M", "M", "M", "M", "M"];
let hero = new Uss(" USS HelloWorld ");
let enemy = [];
enemy.unshift((Alien7 = new Alien("AL #7")));
enemy.unshift((Alien6 = new Alien("AL #6")));
enemy.unshift((Alien5 = new Alien("AL #5")));
enemy.unshift((Alien4 = new Alien("AL #4")));
enemy.unshift((Alien3 = new Alien("AL #3")));
enemy.unshift((Alien2 = new Alien("AL #2")));
enemy.unshift((Alien1 = new Alien("AL #1")));

// LET THE BATTLE BEGIN //

console.log(" %c........ Welcome to the Space Battle! You are captian of the USS HelloWorld - and there are 7 evil alien ships headed to destroy Earth! ........ ", "font-size: 15px; background:black; border: 2px solid red; color:white;");
console.log("......You must blow them all up to win the game..... ");
console.log("......You have unlimited lasers (weak) to fire but a limited number of missles (strong) you can fire..... ");
console.log("......The future has problems though someone spilled orange juice on the targeting computer you will make around 80% of you shots..... ");
console.log("......The future has some bright spots also your amazing pilot will dodge some attacks and the aliens targeting computer will only make around 50% of their shots..... ");
console.log("......your ship is below check it out before you get started cilck the arrow...... ");
console.log(hero);
console.log("......your ship" + hero.name + "has just left the moons orbit on its way to Kiber 7 for a ping pong tournament when...... ");
console.log("%c......Beep Beep Beep Boop 'warning aliens detected ' Beep Beep Beep Boop......","background: lightyellow; color:red; font-size:12px;");
console.log("......There are 6 alien ships on our scanners Captian and I don't think they are friendly...... ");
console.log("......You can see the scanner results below by clicking on the little arrow beside the (6) [alien, alien, ....] on the above line or a few lines up depending on your screen size it's right under the yellow beep warning...... ");
console.log(enemy);
console.log("......Brace yourselves they are charging weapons and they are opening fire...... ");
Alien1.fight(hero); /// they shot first - how rude