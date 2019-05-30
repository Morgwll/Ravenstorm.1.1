<template>
  <div class="mainWrapper">
    <h2>Character Creation</h2>
    <h3>This is to create the character</h3>

    <h4>Name:</h4>
    <input id="name" type="text">
    <h4>Alias:</h4>
    <input id="alias" type="text">
    <h4>Age:</h4>
    <input id="age" type="number">
    <h4>Gender:</h4>
    <select id="gender">
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
    <h4>
      Add Portrait link
      <span>(optional)</span>
    </h4>
    <input id="portrait" type="text">
    <h4>Stats:</h4>
    <div>Stat Points Available: {{ this.$store.state.char.statNumbers }}</div>
    <ul>
      <li v-for="(stat, index) in this.$store.state.char.stats" :key="index">
        {{ stat.name }} -
        <input :value="stat.value" class="statBlock">
        <button @click="addStat(stat.value, index)">+</button>
        <button @click="removeStat(stat.value, index)">-</button>
        - Save: {{ Math.floor(stat.value / 2 - 5) }}
      </li>
    </ul>
    <div>
      Martial Prowess: +
      <div
        id="marProw"
      >{{ Math.floor((this.$store.state.char.stats.sta.value + level + this.$store.state.char.stats.dex.value) / 5) }}</div>
    </div>
    <div>
      Damage Bonus: +
      <div
        id="damBonus"
      >{{ Math.floor((this.$store.state.char.stats.str.value + this.$store.state.char.stats.dex.value) / 5) }}</div>
    </div>
    <div>
      Defense Value:
      <div
        id="defValue"
      >{{ Math.floor((this.$store.state.char.stats.str.value + this.$store.state.char.stats.dex.value + this.$store.state.char.stats.sta.value) / 3 + level) }}</div>
    </div>
    <div>
      HitPoints:
      <div id="hitpoints">{{ this.$store.state.char.stats.con.value * 5 }}</div>
    </div>
    <div>
      Sanity:
      <div id="sanity">{{ this.$store.state.char.stats.pow.value * 5 }}</div>
    </div>
    <div>
      Charisma:
      <div
        id="charisma"
      >{{ Math.floor(( this.$store.state.char.stats.pow.value + this.$store.state.char.stats.app.value ) / 2 ) - 10 }}</div>
    </div>
    <button @click="addCharacter()">Save Character</button>
    <div class="buttonContainer"></div>
    <router-link
      v-for="(item, index) in nav"
      :key="index"
      tag="button"
      :to="item.route"
    >{{ item.name }}</router-link>
  </div>
</template>
<script>
import mixins from "../mixins.js";

export default {
  data() {
    return {
      nav: [
        { name: "Back to Campaign Setup", route: "/game" },
        { name: "Load Game", route: "/loaded" }
      ],
      level: 1
    };
  },
  methods: {
    addCharacter(char) {
      //location.reload()
      alert("character added");
      let character = {
        portrait: document.getElementById("portrait").value,
        name: document.getElementById("name").value,
        alias: document.getElementById("alias").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        stats: {
          str: document.getElementsByClassName("statBlock")[0].value,
          dex: document.getElementsByClassName("statBlock")[1].value,
          con: document.getElementsByClassName("statBlock")[2].value,
          sta: document.getElementsByClassName("statBlock")[3].value,
          app: document.getElementsByClassName("statBlock")[4].value,
          pow: document.getElementsByClassName("statBlock")[5].value
        },
        martialProwess: document.getElementById("marProw").innerHTML,
        damageBonus: document.getElementById("damBonus").innerHTML,
        defenseValue: document.getElementById("defValue").innerHTML,
        hitpoints: document.getElementById("hitpoints").innerHTML,
        tempHitpoints: document.getElementById("hitpoints").innerHTML,
        sanity: document.getElementById("sanity").innerHTML,
        charisma: document.getElementById("charisma").innerHTML,
        actions: [
          { name: "Attack" },
          { name: "Heal" },
          { name: "Haggle" },
          { name: "Persuade" },
          { name: "Intimidate" },
          { name: "Pickpocket" }
        ]
      };
      if (character.stats.pow > 15) {
        character.actions[6] = { name: "Curse" };
        character.actions[7] = { name: "Bless" };
        character.actions[8] = { name: "Charm" };
        character.actions[9] = { name: "Detect Magic" };
        character.actions[10] = { name: "Light Fire" };
        character.actions[11] = { name: "Telekinesis" };
        character.actions[12] = { name: "Terror" };
        character.actions[13] = { name: "Illusion of Self" };
        console.log(character.actions);
      }
      this.$store.state.characterList.push(character);
    }
  }
};
</script>