import Home from "./components/Home.vue";
import Game from "./components/Game.vue";
import Contact from "./components/Contact.vue";
import CCreation from "./components/CCreation.vue";
import PrivacyPolicy from "./components/PrivacyPolicy.vue";
import Tutorial from "./components/Tutorial.vue";
import Advice from "./components/Advice.vue";
import Loaded from "./components/environment/Loaded.vue";
import Encounter from "./components/environment/Encounter.vue";
import About from "./components/About.vue";

export const routes = [
  { path: "", component: Home },
  { path: "/game", component: Game },
  { path: "/contact", component: Contact },
  { path: "/tutorial", component: Tutorial },
  { path: "/advice", component: Advice },
  { path: "/character-creation", component: CCreation },
  { path: "/privacy-policy", component: PrivacyPolicy },
  { path: "/loaded", component: Loaded },
  { path: "/encounter", component: Encounter },
  { path: "/about", component: About }
];
