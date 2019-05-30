<template>
  <div class="mainWrapper">
    <h1>Game</h1>
    <ul>
      <li @click="revealNew()">New Game</li>
      <li @click="revealLoad()">Load Game</li>
    </ul>
    <div class="hidden" id="newGameSection">
      <h4>New Game</h4>Select what setting would you like to start your game in
      <select>
        <option v-for="(world, index) in settingInfo" :key="index">{{ world.name }}</option>
      </select>
      <div>
        <h5>Enter New Campaign Title</h5>
        <input type="text">
      </div>
      <div class="buttonContainer">
        <button>Setup New Campaign</button>
      </div>
    </div>
    <div class="hidden" id="loadGameSection">
      <h4>Load Game</h4>Available games
      <select v-model="chosenGame.name">
        <option v-for="(game, index) in gamesInfo" :key="index" :value="game.name">{{ game.name }}</option>
      </select>
      load: {{ chosenGame.name }}
      <div class="buttonContainer">
        <router-link
          tag="button"
          v-for="(menu, index) in nav"
          :key="index"
          :to="menu.route"
        >{{ menu.name }}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    let settingInfo = this.$store.state.worlds;
    let gamesInfo = this.$store.state.games;

    function selectGame(meh) {}
    return {
      settingInfo,
      gamesInfo,
      nav: [
        { name: "Add Characters", route: "/character-creation" },
        { name: "Load Game", route: "/loaded" }
      ],
      chosenGame: {
        name: null
      }
    };
  },
  methods: {
    selectGame(meh) {
      let selected = document.getElementById("gameSelector").value;
      console.log(meh);
      console.log(selected);
    },
    revealNew() {
      document.getElementById("newGameSection").style.display = "block";
      document.getElementById("loadGameSection").style.display = "none";
    },
    revealLoad() {
      document.getElementById("newGameSection").style.display = "none";
      document.getElementById("loadGameSection").style.display = "block";
    }
  }
};
</script>
<style lang="scss">
.hidden {
  display: none;
}
</style>