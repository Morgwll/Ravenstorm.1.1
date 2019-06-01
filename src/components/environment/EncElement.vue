    
<template>
  <div>
    <ul class="encounterStats" v-if="character.type === 'creature'">
      <li>
        <div v-if="character.portrait !== ''">
          <img :src="character.portrait">
        </div>
        <div v-else>
          <img src="https://awodev.com/images/default-forum-user.png">
        </div>
      </li>
      <li>Class: {{ character.characterClass }}</li>
      <li>
        Name: {{ character.name }}
        <span v-if="character.alias !== ''">"{{ character.alias }}"</span>
      </li>
      <li>Gender: {{ character.gender }}</li>
      <li class="statBox">
        <ul class="statNames">
          <li v-for="(charName, indx) in statNames" :key="indx">{{ charName.name }}</li>
        </ul>
        <ul class="statValues">
          <li v-for="(char, i) in character.stats" :key="i">{{ char }}</li>
        </ul>
      </li>
      <li class="flexor">
        <div class="martialStats">
          War Prowess:
          <span>{{ character.martialProwess }}</span>
        </div>
        <div class="martialStats">
          Damage Bonus:
          <span>{{ character.damageBonus }}</span>
        </div>
        <div class="martialStats">
          Defense/armor:
          <span>{{ character.defenseValue }}</span>
        </div>
      </li>
      <li class="flexCond">
        <div class="flexor statBar">
          HP:
          <div class="hitpointsBar" :style="{ width: (character.hitpoints * 2) + 'px'}">
            <div class="tempHitpoints" :style="{ width: (character.tempHitpoints * 2) + 'px'}"></div>
            <div class="tempHtpText">{{ character.tempHitpoints }}</div>
          </div>
          <div class="incDec" @click="character.tempHitpoints--">Dmg</div>
          <div class="incDec" @click="character.tempHitpoints++">Heal</div>
        </div>
        <div class="flexor statBar">
          Sanity:
          <div class="hitpointsBar" :style="{ width: (character.sanity * 2) + 'px'}">
            <div class="tempSanity" :style="{ width: (character.tempSanity * 2) + 'px'}"></div>
            <div class="tempHtpText">{{ character.tempSanity }}</div>
          </div>
          <div class="incDec" @click="character.tempSainity--">Dmg</div>
          <div class="incDec" @click="character.tempSanity++">Heal</div>
        </div>
      </li>

      <li>Charisma: {{ character.charisma }}</li>
    </ul>
    <ul class="encounterStats" v-else>
      <li>
        <div v-if="character.portrait !== ''">
          <img :src="character.portrait">
        </div>
        <div v-else>
          <img src="https://awodev.com/images/default-forum-user.png">
        </div>
      </li>
      <li>Scene Encounter Type: {{ character.name }}</li>
      <li class="statBox">
        <ul class="statNames">
          <li v-for="(charName, indx) in statNames" :key="indx">{{ charName.name }}</li>
        </ul>
        <ul class="statValues">
          <li v-for="(char, i) in character.stats" :key="i">{{ char }}</li>
        </ul>
      </li>
    </ul>
    <div id="targetChoice" class="targetChoice">
      Target:
      <select v-model="selectTarget" @change="chooseTarget(selectTarget)">
        <option default disabled selected>-- Select Target --</option>
        <option v-for="(target, index) in targets" :key="index">{{ target.name }}</option>
      </select>
    </div>
    <div id="actionChoice" class="actionChoice" v-if="character.type === 'creature'">
      Actions:
      <select
        v-model="selectAction"
        id="actionChoiceSelect"
        @change="chooseAction(targets.indexOf(character))"
      >
        <option default disabled selected>-- Select Action --</option>
        <option v-for="(action, index) in character.actions" :key="index">{{ action.name }}</option>
      </select>
    </div>
    <div id="actionChoice" class="actionChoice" v-if="character.characterType === 'pc'">
      Class Actions:
      <select
        v-model="selectClassAction"
        id="actionChoiceSelect"
        @change="classAction(targets.indexOf(character))"
      >
        <option default disabled selected>-- Select Class Action --</option>
        <option v-for="(action, index) in character.classActions" :key="index">{{ action.name }}</option>
      </select>
    </div>
    <div id="weaponChoice" class="weaponChoice" v-if="character.type === 'creature'">
      Weapon:
      <select v-model="selectWeapon" @change="chooseWeapon(selectWeapon)">
        <option default disabled selected>-- Select Weapon --</option>
        <option v-for="(weapon, i) of character.weapons" :key="i">{{ weapon.name }}</option>
      </select>
    </div>
    <div class="rollButtonContainer">
      <button
        @click="universalCheck(attackValue, defenseValue)"
        v-if="character.type === 'creature'"
        class="rollButton"
      >Roll</button>
      <button
        @click="sceneryRun(selectedTarget[0].stats, character.saveDiff, character.saveStat, character.damage)"
        v-else
        class="rollButton"
      >Roll</button>
    </div>
  </div>
</template>
<script>
import mixins from "../../mixins.js";
export default {
  props: ["character", "targets", "statNames", "scenery"],
  data() {
    return {
      selectAction: "-- Select Action --",
      selectClassAction: "-- Select Class Action --",
      selectTarget: "-- Select Target --",
      selectWeapon: "-- Select Weapon --",
      selectedAction: "",
      selectedClassAction: "",
      selectedTarget: {},
      selectedWeapon: {},
      charIndex: 0,
      resultMessage: "",
      damage: null,
      damageBrackets: [],
      attackValue: null,
      defenseValue: null
    };
  },
  methods: {
    universalCheck(active, passive) {
      let roll = this.rollDice(20);
      let attackSuccess = false;
      this.$store.state.rollResult = roll;
      document.getElementById("modalOverlay").style.display = "block";
      if (roll === 20) {
        attackSuccess = true;
        this.$store.state.resultMessage = "Natural 20!!";
        if (this.selectAction === "Attack") {
          if (this.selectedWeapon[0].range <= 10) {
            this.selectedTarget[0].tempHitpoints =
              this.selectedTarget[0].tempHitpoints -
              this.damageBrackets[2] * 2 -
              this.character.damageBonus;
          }
          this.selectedTarget[0].tempHitpoints =
            this.selectedTarget[0].tempHitpoints - this.damageBrackets[2] * 2;
        } else if (this.selectAction === "Heal") {
          this.selectedTarget[0].tempHitpoints =
            this.selectedTarget[0].tempHitpoints + 20;
        } else if (this.selectAction === "Terror") {
          this.selectedTarget[0].tempSanity =
            this.selectedTarget[0].tempSanity - 20;
        }
      } else if (active + roll >= passive) {
        attackSuccess = true;
        let difference = active + roll - passive;
        if (this.selectAction === "Attack") {
          if (difference > 3) {
            if (this.selectedWeapon[0].range <= 10) {
              this.selectedTarget[0].tempHitpoints =
                this.selectedTarget[0].tempHitpoints -
                this.damageBrackets[1] -
                this.character.damageBonus;
            } else {
              this.selectedTarget[0].tempHitpoints =
                this.selectedTarget[0].tempHitpoints - this.damageBrackets[1];
            }
          } else if (difference > 6) {
            if (this.selectedWeapon[0].range <= 10) {
              this.selectedTarget[0].tempHitpoints =
                this.selectedTarget[0].tempHitpoints -
                this.damageBrackets[2] -
                this.character.damageBonus;
            } else {
              this.selectedTarget[0].tempHitpoints =
                this.selectedTarget[0].tempHitpoints - this.damageBrackets[2];
            }
          } else {
            if (this.selectedWeapon[0].range <= 10) {
              this.selectedTarget[0].tempHitpoints =
                this.selectedTarget[0].tempHitpoints -
                this.damageBrackets[0] -
                this.character.damageBonus;
            } else {
              this.selectedTarget[0].tempHitpoints =
                this.selectedTarget[0].tempHitpoints - this.damageBrackets[0];
            }
          }
        }
        if (this.selectAction === "Heal") {
          if (difference > 3) {
            this.selectedTarget[0].tempHitpoints =
              this.selectedTarget[0].tempHitpoints + 8;
          } else if (difference > 6) {
            this.selectedTarget[0].tempHitpoints =
              this.selectedTarget[0].tempHitpoints + 12;
          } else {
            this.selectedTarget[0].tempHitpoints =
              this.selectedTarget[0].tempHitpoints + 5;
          }
        }
        if (this.selectAction === "Terror") {
          this.selectedTarget[0].tempSanity =
            this.selectedTarget[0].tempSanity - 20;
        }
        this.$store.state.resultMessage = "it's a success!";
      } else if (roll == 1) {
        attackSuccess = false;
        this.$store.state.resultMessage = "Oh, no... a One!";
      } else {
        attackSuccess = false;
        this.$store.state.resultMessage = "it's a miss...";
      }
    },
    chooseAction(index) {
      if (this.selectAction == "Attack") {
        console.log("chosen attack for an action");
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "block";
        this.attackValue = this.character.martialProwess;
        this.defenseValue = this.selectedTarget[0].defenseValue;
      } else if (this.selectAction == "Curse") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = this.character.charisma;
        this.defenseValue = 16 - (this.selectedTarget[0].stats.pow - 10) / 2;
      } else if (this.selectAction == "Bless") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = (this.character.stats.pow - 10) / 2;
        this.defenseValue = 16 - (this.selectedTarget[0].stats.pow - 10) / 2;
      } else if (this.selectAction == "Heal") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = (this.character.stats.dex - 10) / 2;
        this.defenseValue = 16 - (this.selectedTarget[0].stats.con - 10) / 2;
      } else if (this.selectAction == "Haggle") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = this.character.charisma;
        this.defenseValue = 16 - (this.selectedTarget[0].stats.pow - 10) / 2;
      } else if (this.selectAction == "Persuade") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = this.character.charisma;
        this.defenseValue = 16 - (this.selectedTarget[0].stats.pow - 10) / 2;
      } else if (this.selectAction == "Intimidate") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = this.character.charisma;
        this.defenseValue = 16 - (this.selectedTarget[0].stats.pow - 10) / 2;
      } else if (this.selectAction == "Pickpocket") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = (this.character.stats.dex - 10) / 2;
        this.defenseValue = this.selectedTarget[0].pPerception;
      } else if (this.selectAction == "Manipulate Mechanism") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = (this.character.stats.dex - 10) / 2;
        this.defenseValue = this.selectedTarget[0].pPerception;
      } else if (this.selectAction == "Charm") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = (this.character.stats.pow - 10) / 2;
        this.defenseValue = this.selectedTarget[0].charisma;
      } else if (this.selectAction == "Detect Magic") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = (this.character.stats.pow - 10) / 2;
        this.defenseValue = 15;
      } else if (this.selectAction == "Light Fire") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = (this.character.stats.pow - 10) / 2;
        this.defenseValue = this.selectedTarget[0].pPerception;
      } else if (this.selectAction == "Telekinesis") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = (this.character.stats.pow - 10) / 2;
        this.defenseValue = 10;
      } else if (this.selectAction == "Terror") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = (this.character.stats.pow - 10) / 2;
        this.defenseValue = this.selectedTarget[0].stats.pow;
      } else if (this.selectAction == "Illusion of Self") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = (this.character.charisma - 10) / 2;
        this.defenseValue = this.selectedTarget[0].pPerception;
      } else if (this.selectAction == "Climb") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = (this.character.stats.dex - 10) / 2;
        this.defenseValue = 11;
      } else if (this.selectAction == "Balance") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = (this.character.stats.dex - 10) / 2;
        this.defenseValue = 11;
      } else if (this.selectAction == "Jump") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue =
          (this.character.stats.dex - 10) / 2 +
          (this.character.stats.str - 10) / 2 / 2;
        this.defenseValue = 13;
      } else if (this.selectAction == "Perception") {
        document.getElementsByClassName("weaponChoice")[index].style.display =
          "none";
        this.attackValue = (this.character.stats.dex - 10) / 2;
        this.defenseValue = 11;
      }
    },
    classAction(target) {
      console.log(
        "the target" + target,
        "the selected class action " + this.selectedClassAction
      );
    },
    sceneryRun(active, passive, stat, damage) {
      let roll = this.rollDice(20);
      let attackSuccess = false;
      this.$store.state.rollResult = roll;
      let forStat = Object.values(active);
      let bonus = (forStat[stat] - 10) / 2;
      document.getElementById("modalOverlay").style.display = "block";
      if (roll === 20) {
        attackSuccess = true;
        let difference = bonus + roll - passive;
        this.$store.state.resultMessage = "Natural 20!!";
      } else if (4 + roll >= passive) {
        attackSuccess = true;
        let difference = bonus + roll - passive;
        this.$store.state.resultMessage = "It's a Success!";
        this.selectedTarget[0].tempHitpoints =
          this.selectedTarget[0].tempHitpoints - damage[0];
      } else if (roll == 1) {
        attackSuccess = false;
        this.selectedTarget[0].tempHitpoints =
          this.selectedTarget[0].tempHitpoints - damage[1] * 2;
        this.$store.state.resultMessage = "Oh, no... a One!";
      } else {
        attackSuccess = false;
        this.selectedTarget[0].tempHitpoints =
          this.selectedTarget[0].tempHitpoints - damage[1];
        this.$store.state.resultMessage = "it's a miss...";
      }
    },
    chooseTarget(subject) {
      this.selectedTarget = this.targets.filter(item => {
        return item.name === subject;
      });
    },
    chooseWeapon(weapon) {
      this.selectedWeapon = this.character.weapons.filter(item => {
        return item.name === weapon;
      });
      this.damageBrackets = this.selectedWeapon[0].damage;
    }
  }
};
</script>