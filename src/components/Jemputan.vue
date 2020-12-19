<template>
<section id="jemputan" class="center-align">
  <img class="background" src="@/assets/bg.svg">
  <div class="inner">
    <span class="title">Undangan Majlis Perkahwinan</span>
    <hr style="width: 15rem;margin-bottom: 2rem;">
    <span>Yang Mulia,</span>
    <span>{{nama}}</span>
    <span>{{kampong}}</span>
  </div>

  <div v-if="geng != ''" id="customMessage" class="row center-align special-message">
    <h6>Special Message</h6>
    <p v-html="gengName">
    </p>
    <p v-html="customMessage">
    </p>
  </div>

  <div class="hajat">
    <div class="jawi">
      <span>بِسْمِ اٌللَّهِ اٌلرَّحْمٰنِ اٌلرَحِيمِ</span>
      <span>يا قاضى الحاجاة</span>
    </div>
    <ul>
      <li v-for="name in names" :key="name">{{ name }}</li>
    </ul>
  </div>
</section>
</template>

<script>
const fb = require('@/firebaseConfig.js')
export default {
  name: "Jemputan",
  props: ['nama', 'kampong', 'side', 'geng'],
  data() {
    return {
      nameList: {
        omar: [
          'Dr Haji Ibrahim Bin Haji Abdul Rahman',
          'Hajah Siti Fatimah Binti Haji Mohd. Salleh',
          'Mohd Aslam Bin Dr Hj Ibrahim & Isteri',
          'Mohd Zaki Bin Dr Hj Ibrahim & Isteri',
          'Mohd Yaasir Bin Dr Hj Ibrahim & Isteri'
        ],
        amirah: [
          'YM Ayahanda Awg Maidin Bin Lampoh',
          'YM Ibunda Dyg Hamizah Binti Abdullah',
          'YM Awg Md Janai Bin Lampor & Dyg Rakiah Binti Mahren',
          'YM Awg Muhammad Amirul Bin Maidin'
        ]
      },
      gengName: ''
      ,
      customMessage: '',
      gengs: {
        omar: [
          {}
        ],
        amirah: [{}
        ]
      }
    }
  },
  async created(){
    await this.getDataFromFB()
  },
  computed: {
    names() {
      return this.nameList[this.side === 'omar' ? 'omar' : 'amirah']
    }
  },
  methods: {
    async getDataFromFB() {
      let documents = await fb.omaramirah.doc('gengs').onSnapshot((document) => {
        this.gengs = document.data().gengs;
        this.updateCustomMessage();
      });
    },
    updateCustomMessage(){
      let myGang = this.gengs[this.side].filter(g => g.id === this.geng)
      if (myGang.length > 0) {
        this.customMessage = myGang[0].msg
        this.gengName = myGang[0].name
      }
    }
  }
}
</script>

<style lang='scss'>
@import '@/main.scss';
#jemputan{
  margin: 2rem auto;
  position: relative;

  .background{
		position: absolute;
		top: -5rem;
		left: 19rem;
		z-index: -1;
		width: 30rem;
		transform: rotate(180deg);
    opacity: .4;
	}
  span{
    display: block;
    &.title {
      font-weight: 700;
      font-size: 20px;
    }
  }
  .jawi {
    font-family: $qadhiFont;
    font-size: 18px;
    margin: 3rem auto;
  }
  li{
    margin: 1rem auto;
  }
  .special-message{
    margin: 1rem;
    padding: 1.5rem;
    border: 1px solid #d3d3d3;
  }
}
</style>