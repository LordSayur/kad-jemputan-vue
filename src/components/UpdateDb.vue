<template>
  <div class="confirm-message">
    <div v-show="states.isShow">
      <span>Are you sure?</span>
      <div style="margin: 1rem auto">
        <button :class="`btn btn-small blue`" @click="upload()">Yes</button>
        <button :class="`btn btn-small red`" @click="CancelUpdate" style="margin-left: 1rem;">No</button>
      </div>
    </div>
    <div>
      <p v-show="states.isUpdateCancelled" class="red-text">Update Cancelled!</p>
      <p v-show="states.isUpdating" class="blue-text">Updating...</p>
      <p v-show="states.isUpdated" class="green-text">Updated!</p>
    </div>
  </div>
</template>

<script>
const fb = require('@/firebaseConfig.js')
export default {
  name: 'UpdateDb',
  props: {
    docName: {
      type: String,
    },
    payload: {
      type: Object
    }
  },
  data() {
    return {
      states: {
        isShow: true,
        isUpdateCancelled: false,
        isUpdating: false,
        isUpdated: false,
        buttonDisabled: false
      }
    }
  },
  methods: {
    updateDb() {
        this.states.isShow = true
        this.states.isUpdateCancelled = false
      },
    async upload() {
      this.states.isShow = false;
      this.states.isUpdating = true;
      this.states.buttonDisabled = true;

      await fb.omaramirah.doc(this.docName).set(this.payload)
      
      this.states.isUpdating = false;
      this.states.buttonDisabled = false;
      this.states.isUpdated = true
      setTimeout(() => {
        this.$emit('updateDone')
      }, 3000);
    },
    CancelUpdate() {
      this.states.isUpdateCancelled = true
      this.states.isShow = false
      setTimeout(() => {
        this.$emit('updateDone')
      }, 3000);
    },
  },
}
</script>

<style lang='scss'>
.confirm-message {
  margin: 1rem;
  padding: 1rem;
  width: 11rem;
  border: 1px solid lightskyblue;
  border-radius: 1rem;
}
</style>