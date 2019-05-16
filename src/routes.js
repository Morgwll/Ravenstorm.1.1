import Home from './components/Home.vue';
import Portfolio from './components/Game.vue';
import Contact from './components/Contact.vue';
import Combat from './components/environment/Combat.vue';
import Social from './components/environment/Social.vue';
import CCreation from './components/CCreation.vue';
import Loaded from './components/environment/Loaded.vue';
import Encounter from './components/environment/Encounter.vue';
import About from './components/About.vue';

export const routes = [
    { path: '', component: Home },
    { path: '/game', component: Portfolio },
    { path: '/contact', component: Contact },
    { path: '/combat', component: Combat },
    { path: '/social', component: Social },
    { path: '/character-creation', component: CCreation },
    { path: '/loaded', component: Loaded },
    { path: '/encounter', component: Encounter },
    { path: '/about', component: About }
]