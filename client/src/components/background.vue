<template>
  <div class="bg">
    <div id="sky"></div>
    <div id="sun_yellow"></div>
    <div id="clouds"></div>
    <div id="ground"></div>
    <div id="night"></div>
    <div id="stars"></div>
    <div id="sstar"></div>
    <div id="moon"></div>
    <room :id="id" class="above"/>
  </div>
</template>

<script>
import room from '@/components/room'
export default {
  name: 'bg',
  props: ['id'],
  components: {
    room
  }
}
</script>

<style>
  .above {
    z-index: 100
  }
</style>
