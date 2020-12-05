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
    <p>
      {{ customMessage }}
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
      customMessage: '',
      gengs: {
        tahfiz: '',
        dymk: ''
      },
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
      let documents = await fb.agendas.doc('F5XNcpXkHQTIKHWHcLXW').onSnapshot((document) => {
        this.gengs = document.data().gengs;
        this.customMessage = this.gengs[this.geng]
      });
    },
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