<template>
  <div class="mainWrapper">
    <h1>{{ content.title}}</h1>
    <p>{{ content.lastDescription }}</p>
    <div class="storyMenu leftMenu sideMenu">
      <div id="leftMenu" class="sideMenu leftMenu">
        <div class="leftMenuTab menuTab storyMenuTab" @click="storyMenu()">
          <i class="fas fa-feather-alt"></i>
        </div>
        <div class="leftMenuTab menuTab beingsMenuTab" @click="beingsMenu()">
          <i class="fas fa-skull"></i>
        </div>
        <div class="leftMenuTab menuTab weaponryMenuTab" @click="weaponryMenu()">
          <i class="fas fa-shield-alt"></i>
        </div>
        <div class="leftMenuTab menuTab inventoryMenuTab" @click="inventoryMenu()">
          <i class="fas fa-coins"></i>
        </div>
        <div class="leftMenuTab menuTab portentsMenuTab" @click="portentsMenu()">
          <i class="fas fa-hat-wizard"></i>
        </div>
        <div class="leftMenuTab menuTab pantheonMenuTab" @click="pantheonMenu()">
          <i class="fas fa-ankh"></i>
        </div>
        <div class="leftMenuTab menuTab locationsMenuTab" @click="locationsMenu()">
          <i class="fas fa-globe-europe"></i>
        </div>
        <ul v-if="menus === this.$store.state.worlds[chosenWorld].environment.plots">
          <li draggable @dragend="addMainElement()" @click="addMainElement()">
            <img
              src="https://www.gannett-cdn.com/media/2017/09/21/USATODAY/USATODAY/636415913442262218-GettyImages-481013807.jpg?width=1080&quality=50"
            >Main Plot
          </li>
          <li
            draggable
            @dragend="addElement(element)"
            @click="addElement(element)"
            v-for="(element, index) in menus"
            :key="index"
          >
            <img :src="portraitChooser(element)">
            {{ element.characterClass }}
          </li>
        </ul>
        <ul v-else>
          <li
            draggable
            @dragend="showElement(element)"
            @click="showElement(element)"
            v-for="(element, index) in menus"
            :key="index"
          >
            <img :src="portraitChooser(element)">
            {{ element.characterClass }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="shown !== ''" class="loadedDisplayPanel">
      <h2>{{ shown.characterClass }}</h2>
      <div class="loadedDisplayContainer">
        <img :src="portraitChooser(shown)">
        <div class="description" v-html="shown.description"></div>
      </div>
    </div>
    <div v-else-if="shown === ''" class="loadedDisplayPanel">
      <ul>
        <li
          v-for="(storyElement, index) of $store.state.storyElements"
          :key="index"
          class="storyBlock"
        >
          <div class="storyRemoval" @click="removeStory(storyElement)">
            <i class="fa fa-times"></i>
          </div>
          <div v-html="storyElement" class="story"></div>
        </li>
      </ul>
    </div>
    <div class="buttonContainer">
      <router-link tag="button" to="/encounter">Go to Encounter</router-link>
    </div>
  </div>
</template>
<script>
import locations from "../../data/locations.json";
import plots from "../../data/plots.json";
import mixins from "../../mixins.js";
export default {
  data() {
    let chosenWorld = 0;
    const storyEls = this.$store.state.worlds[chosenWorld].environment.plots;
    const beings = this.$store.state.worlds[chosenWorld].npcs.concat(
      this.$store.state.worlds[chosenWorld].creatures
    );
    const npcs = this.$store.state.worlds[chosenWorld].npcs;
    const creatures = this.$store.state.worlds[chosenWorld].creatures;
    const weaponry = this.$store.state.worlds[chosenWorld].environment.weaponry;
    const inventory = this.$store.state.worlds[chosenWorld].environment
      .inventory;
    const portents = this.$store.state.worlds[chosenWorld].environment.portents;
    const locations = this.$store.state.worlds[chosenWorld].environment
      .locations;
    const pantheon = this.$store.state.worlds[chosenWorld].environment.pantheon;
    let menus = this.$store.state.worlds[chosenWorld].environment.plots;
    let shown = "";
    let story = "";
    let territory = "";
    const content = {
      title: this.$store.state.selectedGame.name,
      lastDescription: this.$store.state.selectedGame.synopsis
    };
    return {
      menus,
      storyEls,
      beings,
      weaponry,
      inventory,
      pantheon,
      shown,
      content,
      portents,
      story,
      locations,
      chosenWorld,
      globalTime: {
        months: {
          january: "January",
          february: "February",
          march: "March",
          april: "April",
          may: "May",
          june: "June",
          august: "August",
          september: "September",
          october: "October",
          november: "November",
          december: "December"
        },
        days: {
          monday: "Monday",
          tuesday: "Tuesday",
          wednesday: "Wednesday",
          thursday: "Thursday",
          friday: "Friday",
          saturday: "Saturday",
          sunday: "Sunday"
        }
      }
    };
  },
  methods: {
    hideLeftMenu() {
      let leftMenu = document.getElementById("leftMenu");
      leftMenu.classList.toggle("hiddenLeftMenu");
    },
    storyMenu() {
      this.menus = this.storyEls;
      this.shown = "";
      this.hideLeftMenu();
    },
    beingsMenu() {
      this.menus = this.beings;
      this.hideLeftMenu();
    },
    weaponryMenu() {
      this.menus = this.weaponry;
      this.hideLeftMenu();
    },
    inventoryMenu() {
      this.menus = this.inventory;
      this.hideLeftMenu();
    },
    portentsMenu() {
      this.menus = this.portents;
      this.hideLeftMenu();
    },
    pantheonMenu() {
      this.menus = this.pantheon;
      this.hideLeftMenu();
    },
    locationsMenu() {
      this.menus = this.locations;
      this.hideLeftMenu();
    },
    addElement(element) {
      this.minorPlotGenerator(element);
      this.$store.state.storyElements.push(this.story);
    },
    addMainElement() {
      this.mainPlotGenerator();
      this.$store.state.storyElements.push(this.story);
    },
    showElement(element) {
      this.shown = element;
    },
    chooseOption(options) {
      const optionsNumber = Math.floor(
        Math.random() * Object.keys(options).length
      );
      const choosy = Object.values(options);
      for (let item in choosy) {
        return choosy[optionsNumber];
      }
    },
    booleanGen() {
      const extNum = Math.floor(Math.random() * 2);
      return extNum;
    },
    chooseNPC() {
      const num = this.booleanGen();
      const name = this.generateName(num);
      const npcAlignment = this.chooseOption(plots.NPC.alignment);
      const npcBackground = this.chooseOption(plots.NPC.background);
      const npcLeitmotiv = this.chooseOption(plots.NPC.leitmotiv);
      return (
        name +
        " (who is " +
        npcAlignment +
        "), " +
        npcBackground +
        " and " +
        npcLeitmotiv
      );
    },
    timeFrame() {
      const timeframe = this.chooseOption(plots.timeframe);
      const yesNo = this.booleanGen();
      if (yesNo == 0) {
        return timeframe + ". ";
      } else {
        return "";
      }
    },
    externalPlot(option) {
      const choosy = Object.values(plots.externalPlot);
      for (let item in choosy) {
        const externalPlot = this.chooseOption(choosy[option]);
        const yesNo = this.booleanGen();
        if (yesNo == 0) {
          return " Also, " + externalPlot + " is affecting the region.";
        } else {
          return "";
        }
      }
    },
    plotTwist() {
      const plotTwist = this.chooseOption(plots.plotTwist);
      const yesNo = this.booleanGen();
      if (yesNo == 0) {
        return "...but unbeknownst to the heroes, " + plotTwist;
      } else {
        return "";
      }
    },
    religiousPlot() {
      const religiousPlot = this.chooseOption(plots.religionPlot);
      const yesNo = this.booleanGen();
      if (yesNo == 0) {
        return "Also, " + religiousPlot;
      } else {
        return "";
      }
    },
    getMonth(number) {
      const months = Object.values(this.globalTime.months);
      const month = months[number];
      return month;
    },
    getDay(number) {
      const days = Object.values(this.globalTime.days);
      const day = days[number];
      return day;
    },
    getSeason(month) {
      if (month == 2 || month == 3 || month == 4) {
        return "Spring";
      } else if (month == 5 || month == 6 || month == 7) {
        return "Summer";
      } else if (month == 8 || month == 9 || month == 10) {
        return "Autumn";
      } else {
        return "Winter";
      }
    },
    mainPlotGenerator() {
      const extNum = this.booleanGen();
      const monthNum = Math.floor(Math.random() * 12);
      const dayNum = Math.floor(Math.random() * 7);
      const yearNum = "Y" + (3250 + Math.floor(Math.random() * 15));
      const day = this.getDay(dayNum);
      const month = this.getMonth(monthNum);
      const season = this.getSeason(monthNum);
      const npc = this.chooseNPC();
      const time = this.timeFrame();
      const extPlot = this.externalPlot(extNum);
      const plotTwist = this.plotTwist();
      const religiousPlot = this.religiousPlot();
      this.story =
        "<img src='https://www.gannett-cdn.com/media/2017/09/21/USATODAY/USATODAY/636415913442262218-GettyImages-481013807.jpg?width=1080&quality=50' /><div class='description'><h3>Main Plot</h3><p>It is the " +
        season +
        " of " +
        yearNum +
        ". The date, " +
        day +
        " the " +
        (dayNum + 1) +
        " of " +
        month +
        ". </p><p>" +
        npc +
        ". " +
        time +
        extPlot +
        religiousPlot +
        "<p>" +
        plotTwist +
        "</p></div>";
    },
    minorPlotGenerator(env) {
      const title = env.characterClass;
      const portrait = env.portrait;
      const extNum = this.booleanGen();
      const territory = env.territory;
      const npc = this.chooseNPC();
      const time = this.timeFrame();
      const extPlot = this.externalPlot(extNum);
      const plotTwist = this.plotTwist();
      const religiousPlot = this.religiousPlot();
      this.story =
        "<img src='" +
        portrait +
        "' /><div class='description'><h3>" +
        title +
        "</h3><p>The characters arrive to the " +
        territory +
        " of " +
        this.generateName() +
        "</p><p>" +
        npc +
        ". " +
        time +
        extPlot +
        religiousPlot +
        "<p>" +
        plotTwist +
        "</p></div>";
    },
    removeStory(story) {
      let indexInd = this.$store.state.storyElements.indexOf(story);
      this.$store.state.storyElements.splice(indexInd, 1);
    }
  }
};
</script>
