<template>
  <div class="agenda">
    <div :class="`time-container ${getStatus}`">
      <span class="time-text">
        <span class="text">{{ agenda.time }}</span>
        <span class="text">{{ agenda.period }}</span>
      </span>
    </div>
    <span :class="`agenda-text ${getStatus}`">{{ agenda.agenda }}</span>
  </div>
</template>

<script>
export default {
  name: "Agenda",
  props: ['agenda'],
  computed: {
    getStatus() {
      if(this.agenda.status === 'done') return 'highlight-done'
      if(this.agenda.status === 'currently') return 'highlight-currently'
      if(this.agenda.status === 'todo') return ''
    }
  }
}
</script>

<style lang='scss'>
$side:80px;
$line:3px;
.agenda{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 3rem auto;
  position: relative;
}
.time-container {
  border: $line solid lightgrey;
  border-radius: 50%;
  width: $side;
  height: $side;
  position: relative;
  margin: 0;

  &::before {
    content: '';
    position: absolute;
    height: $line;
    width: 3rem;
    background-color: lightgrey;
    top: 50%;
    right: -42px;
  }

  &.highlight-done{
    border-color: lightgrey;
    color: lightgrey;
    &::before {
      background-color: lightgray;
    }
  }

  &.highlight-currently {
    background-color: #ffece6;
    border-color:  #f9c3b3;
    color: #858585;
    &::before {
      background-color: #f9c3b3;
    }
  }
}
.time-text {
  margin: 0;
  width: 100%;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);

  span.text {
    display: inline-block;
    width: 100%;
  }
}
.agenda-text {
  margin-left: 60px;
  border-radius: .5rem;
  padding: .3rem;

  &.highlight-done {
    color: lightgrey;
  }

  &.highlight-currently {
    background-color: #f9c3b3;
    // color: #858585;
    color: white;
  }
}
</style>