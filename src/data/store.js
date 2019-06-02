import Vue from "vue";
import Vuex from "vuex";
import raven from "./worlds/ravenstorm.json";
import metal from "./worlds/heavy-metal.json";
import games from "./games/games.json";

Vue.use(Vuex);

//let games = [];

export const store = new Vuex.Store({
  state: {
    userLogin: true,
    worlds: [raven, metal],
    chosenWorld: 0,
    chosenGame: 0,
    char: {
      statNumbers: 54,
      index: null,
      name: "",
      alias: "",
      age: "",
      gender: "",
      stats: {
        str: {
          name: "STR",
          value: 3
        },
        con: {
          name: "CON",
          value: 3
        },
        dex: {
          name: "DEX",
          value: 3
        },
        sta: {
          name: "STA",
          value: 3
        },
        app: {
          name: "APP",
          value: 3
        },
        pow: {
          name: "POW",
          value: 3
        }
      }
    },
    games,
    rollResult: null,
    activeScore: null,
    passiveScore: null,
    selectedAction: "-- Select Action --",
    selectedTarget: {},
    resultMessage: "",
    storyElements: [],
    characterList: [],
    targets: [],
    selectedGame: [],
    mainPageBanner: {
      image:
        "https://socialpsychol.files.wordpress.com/2014/03/frank-frazetta_poster_banner.jpg?w=590&h=270",
      h1: "Grim Windmill",
      h3:
        "The application that helps Storytellers run Tabletop Roleplaying Games on the go, just by using this app on their mobile or tablet."
    },
    mainPageText:
      "<h4>So what exactly is Grim Windmill?</h4><p>It is a multi-setting platform in which to run an adventure quickly and without experience, rules learning or even a single minute of preparation. The combat is taken care of, the encounters, the social events... all you have to do is click or drag and drop the elements of the story that you want to add to the adventure and everything else is automated.</p><p>The idea is to minimize the amount of paperwork a Storyteller has to prepare, the clunky combat mechanics that some encounters can lead to, the game-breaking magic that could disproportionally tip the balance of an encounter, it being social, exploration or combat.</p><p>The rules system behind Grim Windmill is an amalgamation of 5e D&D, Kult, call of Cthulhu, vampire the masquerade and Stormbringer. There are no mental stats, leaving the intelligence and wisdom to the player, and giving the character anything the player cannot contribute with, mostly physical traits like Appearance and Strenth, Power being the only stat that is not reflected in a physical way.</p><p>It is also a very convenient, out of the box system to carry in your bag or pocket if you are intending to run a LARP game</p><h4>What Grim Windmill is not</h4><p>This platform is NOT trying to compete with D&D, Vampire the Masquerade and such. It is not a full-fledged, rulebook worthy system. Even <a href='https://www.goodreads.com/book/show/23568787-fanhunter-el-juego-de-rol-epicodecadente' target='blank'>Fanhunter</a>* would be more complex. It is only serving as a jumping board for those who have very little time to prepare, or are too insecure to take on the mantle of a DM or a Keeper.</p><p>It will not satisfy your needs to create a character that is heavily personalised and stats-jacked. It will not be of use to metagamers, since all the rules are run by the engine. It will not handhold the narrative so the Storyteller will end up being comfortable but inflexible on her/his decisions.</p><p class='ref'>*Fanhunter was a Spanish tabletop RPG from the nineties, based on a satirical cartoonish monthly strip by Cels Piñol. It was based on a dystopian future where tabletop games, comic books, roleplaying games, warhammer, trading card games and videogames were forbidden by an authoritarian monastical figure: Pope Alejo Cuervo I. The resistance (ie. the player characters) was formed by badass Geeks and bootleg versions of the Marvel universe superheroes.</p>"
  },
  getters: {
    selectGame: state => {
      const game = "meh";
      return game;
    }
  },
  setters: {
    selectGame: state => {}
  }
});
