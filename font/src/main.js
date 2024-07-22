import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import SubmitHistoryPannel from './components/SubmitHistoryPannel.vue';
import FlowAreaV2 from './components/FlowAreaV2.vue';
import AboutPage from './components/AboutPage.vue';
import WelcomePage from './components/WelcomePage.vue';
import { createMemoryHistory, createRouter } from 'vue-router'

const routes= [
    { 
        path: "/",
        component: WelcomePage
    },
    { 
        path: "/upload",
        component: FlowAreaV2 
    },
    { 
        path:"/history", 
        component: SubmitHistoryPannel 
    },
    {
        path:"/about", 
        component: AboutPage
    }
  ]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

createApp(App)
    .use(router)
    .mount('#app')
