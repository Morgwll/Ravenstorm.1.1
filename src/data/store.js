import Vue from "vue";
import Vuex from "vuex";
import raven from "./worlds/ravenstorm.json";
import metal from "./worlds/heavy-metal.json";
import games from "./games/games.json";

Vue.use(Vuex);

let selectedGame = raven;

export const store = new Vuex.Store({
  state: {
    worlds: [raven, metal],
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
    /*characterList: [
            {
                "portrait": 'https://i.kinja-img.com/gawker-media/image/upload/s--NdbChKcZ--/c_scale,f_auto,fl_progressive,q_80,w_800/18j3zwhxy85iyjpg.jpg',
                "characterType": "pc",
                "characterClass": "Guardian",
                "type": "creature", 
                "name": "Rykha",
                "index": "",
                "alias": "Hija de Kor'moon", 
                "age": 28, 
                "gender": "female", 
                "stats": 
                { 
                    "str": 18, 
                    "dex": 15, 
                    "con": 12, 
                    "sta": 10, 
                    "app": 7, 
                    "pow": 10 
                },
                "martialProwess": 4, 
                "damageBonus": 6, 
                "defenseValue": 14,
                "hitpoints": 75,
                "tempHitpoints": 75, 
                "sanity": 50,
                "tempSanity": 50,
                "charisma": 8,
                "actions": [
                    { "name" : "Attack"},
                    { "name" : "Heal"},
                    { "name" : "Haggle"},
                    { "name" : "Persuade"},
                    { "name" : "Intimidate"},
                    { "name" : "Pickpocket"},
                    { "name" : "Manipulate Mechanism"}
                ],
                "classActions": [
                    { "name" : "Pickpocket"},
                    { "name" : "Ranged"},
                    { "name" : "Brawl"},
                    { "name" : "Melee"},
                    { "name" : "Hunt" },
                    { "name" : "Swim" },
                    { "name" : "Disarm Trap" },
                ],
                "pPerception": 12,
                "weapons":
                [
                    { 
                        "name": "Long Sword", 
                        "mp": 0, 
                        "range": 5, 
                        "damage": [ 4, 7, 12 ]
                    }, { 
                        "name": "Composite Bow", 
                        "mp": 0, 
                        "range": 35, 
                        "damage": [ 4, 8, 12 ]
                    }
                ],
                "armor": [
                    { 
                        "name": "Leather Bracers",
                        "defense": 1
                    },
                    { 
                        "name": "Leather Armor",
                        "defense": 2
                    },
                    { 
                        "name": "Leather Helmet",
                        "defense": 2
                    }
                ]
            },
            {
                "portrait": 'https://cdnb.artstation.com/p/assets/images/images/005/395/785/large/anthony-l-m-barbarian-massacre-anthony-lm-ss.jpg?1490724835',
                "characterType": "pc",
                "characterClass": "Hunter",
                "type": "creature",
                "name": "Harold",
                "index": "",
                "alias": "Caraquemada", 
                "age": 26, 
                "gender": "male", 
                "stats": 
                { 
                    "str": 14, 
                    "dex": 18, 
                    "con": 14, 
                    "sta": 10, 
                    "app": 4, 
                    "pow": 12 
                },
                "martialProwess": 5,
                "damageBonus": 6, 
                "defenseValue": 15, 
                "hitpoints": 70,
                "tempHitpoints": 47, 
                "sanity": 60,
                "tempSanity": 48, 
                "charisma": 8,
                "actions": [
                    { "name" : "Attack"},
                    { "name" : "Heal"},
                    { "name" : "Haggle"},
                    { "name" : "Persuade"},
                    { "name" : "Intimidate"},
                    { "name" : "Pickpocket"},
                    { "name" : "Manipulate Mechanism"}
                ],
                "classActions": [
                    { "name" : "Pickpocket"},
                    { "name" : "Ranged"},
                    { "name" : "Brawl"},
                    { "name" : "Melee"},
                    { "name" : "Hunt" },
                    { "name" : "Swim" },
                    { "name" : "Disarm Trap" },
                ],
                "pPerception": 12,
                "weapons":
                [
                    { 
                        "name": "Club", 
                        "mp": 0, 
                        "range": 5, 
                        "damage": [ 4, 8, 10 ] 
                    }, { 
                        "name": "Composite Bow", 
                        "mp": 0, 
                        "range": 45, 
                        "damage": [ 4, 8, 12 ]
                    }
                ],
                "armor": [
                    { 
                        "name": "Leather Bracers",
                        "defense": 1
                    },
                    { 
                        "name": "Leather Armor",
                        "defense": 2
                    },
                    { 
                        "name": "Leather Helmet",
                        "defense": 2
                    }
                ]
            },
            {
                "portrait": 'https://i.etsystatic.com/7197050/d/il/c900fa/1615953936/il_340x270.1615953936_pgtl.jpg?version=0',
                "characterType": "pc",
                "characterClass": "Shaman",
                "type": "creature",
                "name": "Yorubo",
                "index": "", 
                "alias": "the Greedy", 
                "age": 26, 
                "gender": "male", 
                "stats": 
                { 
                    "str": 14, 
                    "dex": 14, 
                    "con": 14, 
                    "sta": 10, 
                    "app": 8, 
                    "pow": 16 
                }, 
                "martialProwess": 4, 
                "damageBonus": 4, 
                "defenseValue": 11, 
                "hitpoints": 70,
                "tempHitpoints": 70, 
                "sanity": 60,
                "tempSanity": 60,
                "charisma": 12,
                "actions": [
                    { "name" : "Attack"},
                    { "name" : "Heal"},
                    { "name" : "Haggle"},
                    { "name" : "Persuade"},
                    { "name" : "Intimidate"},
                    { "name" : "Pickpocket"},
                    { "name" : "Manipulate Mechanism"},
                    { "name" : "Curse"},
                    { "name" : "Bless"},
                    { "name" : "Charm"},
                    { "name" : "Detect Magic"},
                    { "name" : "Light Fire"},
                    { "name" : "Telekinesis"},
                    { "name" : "Terror"},
                    { "name" : "Illusion of Self"}
                ],
                "classActions": [
                    { "name" : "Pickpocket"},
                    { "name" : "Ranged"},
                    { "name" : "Brawl"},
                    { "name" : "Melee"},
                    { "name" : "Hunt" },
                    { "name" : "Swim" },
                    { "name" : "Disarm Trap" },
                ],
                "pPerception": 12,
                "weapons":
                [
                    { 
                        "name": "Staff", 
                        "mp": 0, 
                        "range": 10, 
                        "damage": [ 3, 6, 8 ]
                    }, { 
                        "name": "Composite Bow", 
                        "mp": 0, 
                        "range": 35, 
                        "damage": [ 4, 8, 12 ]
                    }
                ],
                "armor": [
                    { 
                        "name": "Leather Bracers",
                        "defense": 1
                    },
                    { 
                        "name": "Leather Greaves",
                        "defense": 1
                    }
                ]
            }
        ],*/
    characterList: [],
    targets: [],
    selectedGame,
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
