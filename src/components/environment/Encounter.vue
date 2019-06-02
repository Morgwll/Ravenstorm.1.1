<template>
  <div class="mainWrapper">
    <h3>Encounter:</h3>
    <ul class="encounterList" id="encounterList">
      <li
        class="encounterElement"
        v-for="(character, index) in targets"
        :key="index"
        draggable="true"
      >
        <div class="eElementRemoval" @click="removeFromRoster(character)">
          <i class="fa fa-times"></i>
        </div>
        <encounter-Element
          :character="character"
          :targets="targets"
          :statNames="statNames"
          :targetDefense="targetDefense"
        ></encounter-Element>
      </li>
    </ul>
    <div class="menus">
      <h4>Drag and drop to the screen to add to Roster</h4>
      <div id="rightMenu" class="sideMenu rightMenu">
        <div class="rightMenuTab menuTab npcMenuTab" @click="npcMenu()">
          <i class="fas fa-user-plus"></i>
        </div>
        <div class="rightMenuTab menuTab monsterMenuTab" @click="monsterMenu()">
          <i class="fas fa-dragon"></i>
        </div>
        <div class="rightMenuTab menuTab sceneryMenuTab" @click="sceneryMenu()">
          <i class="fas fa-dungeon"></i>
        </div>
        <ul v-if="creatures">
          <li
            draggable
            @dragend="addTarget(target)"
            @click="addTarget(target)"
            v-for="(target, index) in encounter"
            :key="index"
          >
            <img :src="portraitChooser(target)">
            <p>{{ target.characterClass }}</p>
          </li>
        </ul>
        <ul v-else>
          <li
            draggable
            @dragend="addTarget(target)"
            @click="addTarget(target)"
            v-for="(target, index) in scenery"
            :key="index"
          >
            <img :src="target.portrait">
            <p>{{ target.name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="buttonContainer">
      <button @click="randomizeOrder(targets)">Randomize initiative</button>
      <router-link tag="button" to="/loaded">Back to Loaded</router-link>
      <button @click="saveCharacters(targets)">Save Characters</button>
    </div>
    <div class="modalOverlay" id="modalOverlay">
      <div class="rollModal">
        <h4>Roll result:</h4>
        <div class="d20">
          <h3>{{ $store.state.rollResult }}</h3>
        </div>
        <h4>{{ $store.state.resultMessage }}</h4>
        <div class="closeModal" @click="closeModal()">
          <i class="fa fa-times"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "../../mixins.js";
import encounterElement from "./EncElement.vue";
import axios from "axios";

export default {
  components: {
    encounterElement
  },
  data() {
    return {
      characters: this.$store.state.characterList,
      statNames: this.$store.state.char.stats,
      targets: this.$store.state.targets,
      scenery: this.$store.state.selectedGame.npcs,
      creatures: true,
      encounter: this.$store.state.selectedGame.npcs,
      targetDefense: null,
      resultMessage: ""
    };
  },
  methods: {
    addTarget(target) {
      this.charIndex++;
      let newCharacter = {
        characterType: target.characterType,
        type: target.type,
        name: target.name,
        kind: target.kind,
        characterClass: target.characterClass,
        portrait: target.portrait,
        index: this.charIndex,
        alias: target.alias,
        age: target.age,
        gender: target.gender,
        stats: target.stats,
        martialProwess: target.martialProwess,
        damageBonus: target.damageBonus,
        actions: target.actions,
        classActions: target.classActions,
        defenseValue: target.defenseValue,
        hitpoints: target.hitpoints,
        tempHitpoints: target.tempHitpoints,
        pPerception: target.pPerception,
        sanity: target.sanity,
        tempSanity: target.tempSanity,
        charisma: target.charisma,
        weapons: target.weapons,
        saveStat: target.saveStat,
        saveDiff: target.saveDiff,
        damage: target.damage
      };
      if (newCharacter.name === "") {
        newCharacter.name = this.generateName(9);
      }
      if (target.gender === "") {
        newCharacter.gender = this.genderizer();
        if (newCharacter.gender === "male") {
          newCharacter.portrait = target.portrait.male;
        } else {
          newCharacter.portrait = target.portrait.female;
          newCharacter.name = newCharacter.name + "a";
        }
      }
      this.targets.push(newCharacter);
    },
    randomizeOrder() {
      let roster = document.getElementById("encounterList");
      for (let children in roster) {
        roster.appendChild(roster.children[(Math.random() * children) | 0]);
      }
    },
    closeModal() {
      document.getElementById("modalOverlay").style.display = "none";
    },
    npcMenu() {
      this.hideRightMenu();
      this.creatures = true;
      this.encounter = this.$store.state.worlds[
        this.$store.state.chosenWorld
      ].npcs;
    },
    monsterMenu() {
      this.hideRightMenu();
      this.creatures = true;
      this.encounter = this.$store.state.worlds[
        this.$store.state.chosenWorld
      ].creatures;
    },
    sceneryMenu() {
      this.hideRightMenu();
      this.creatures = false;
      this.encounter = this.$store.state.worlds[
        this.$store.state.chosenWorld
      ].scenery;
      this.scenery = this.encounter;
    },
    genderizer() {
      let boolean = Math.random() >= 0.5;
      if (boolean == true) {
        return "male";
      } else {
        return "female";
      }
    },
    removeFromRoster(target) {
      let indexInd = this.targets.indexOf(target);
      this.targets.splice(indexInd, 1);
    },
    hideRightMenu() {
      let rightMenu = document.getElementById("rightMenu");
      rightMenu.classList.toggle("hiddenRightMenu");
    },
    saveCharacters(targetList) {
      let characters = [];
      for (let character of targetList) {
        if (character.characterType === "pc") {
          characters.push(character);
        }
      }
      /*axios
        .get("https://fantasy-storyteller-b92e8.firebaseio.com/")
        .then(response => (this.$store.state.games = response));
      if (this.$store.state.userLogin === true) {
        this.$store.state.characterList[this.$store.state.chosenGame] = [];
        this.$store.state.characterList[this.$store.state.chosenGame].push(
          characters
        );
        console.log(
          "characters in List after push",
          this.$store.state.characterList[0]
        );
        console.log("https://fantasy-storyteller-b92e8.firebaseio.com/");
      }*/
      axios
        .get("https://fantasy-storyteller-b92e8.firebaseio.com/", {
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          proxy: {
            host: "104.236.174.88",
            port: 3128
          }
        })
        .then(function(response) {
          console.log("response is : " + response.data);
        })
        .catch(function(error) {
          if (error.response) {
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log(error.message);
          }
          console.log(error.config);
        });
    }
  },
  mounted() {
    for (let character of this.$store.state.characterList[0]) {
      this.addTarget(character);
    }
  }
};
</script>