<template>
  <div class="container">
    <h1>Admin</h1>
    <!-- Side button -->
    <div>
      <button :class="`btn ${isOmar ? 'active blue' : 'btn-flat'}`" @click="updateSide('omar')">Omar</button>
      <button :class="`btn ${isOmar ? 'btn-flat' : 'active blue'}`" @click="updateSide('amirah')">Amirah</button>
    </div>
    <!-- tabs button -->
    <div>
      <br>
      <button :class="`btn ${currentTab == 'tentative' ? 'active blue' : 'btn-flat'}`" @click="updateTab('Tentative')">Tentative</button>
      <button :class="`btn ${currentTab == 'url-generator' ? 'active blue' : 'btn-flat'}`" @click="updateTab('UrlGenerator')">URL Generator</button>
      <button :class="`btn ${currentTab == 'makluman' ? 'active blue' : 'btn-flat'}`" @click="updateTab('Makluman')">Makluman</button>
      <button :class="`btn ${currentTab == 'gengs' ? 'active blue' : 'btn-flat'}`" @click="updateTab('Gengs')">Gengs</button>
      <button :class="`btn ${currentTab == 'teka-teki' ? 'active blue' : 'btn-flat'}`" @click="updateTab('TekaTeki')">Teka Teki</button>
    </div>
    <keep-alive>
      <component :is='currentTab' :side='side' :isOmar='isOmar'></component>
    </keep-alive>
    
  </div>
</template>

<script>
const fb = require('@/firebaseConfig.js')
import Tentative from '@/components/Admin_Tentative'
import UrlGenerator from '@/components/Admin_UrlGenerator'
import Makluman from '@/components/Admin_Makluman'
import Gengs from '@/components/Admin_Gengs'
import TekaTeki from '@/components/Admin_TekaTeki'

export default {
  name: 'Admin',
  components: {
    'tentative': Tentative,
    'url-generator': UrlGenerator,
    'makluman': Makluman,
    'gengs': Gengs,
    'teka-teki': TekaTeki,
  },
  methods: {
    updateSide(side){
      this.isOmar = side === 'omar'
      this.side = side === 'omar' ? 'omar' : 'amirah'
    },
    updateTab(tab) {
      this.currentTab = this.tabs[tab];
    }
  },
  data() {
    return {
      side: 'omar',
      isOmar: true,
      tabs: {
        Tentative: 'tentative',
        UrlGenerator: 'url-generator',
        Makluman: 'makluman',
        Gengs: 'gengs',
        TekaTeki: 'teka-teki'
      },
      currentTab: 'tentative'
    }
  },
}
</script>

<style lang='scss'>
@import '@/main.scss';
.myFlex {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.myFlex-item {
  flex: 1 0 50%;
}
</style>
