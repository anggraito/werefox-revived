<template>
  <div class="room">
    <div class="container-fluid">
      <dayroom :id="id" />
    </div>
  </div>
</template>

<script>
import dayroom from '@/components/dayRoom'
export default {
  name: 'room',
  props: ['id'],
  components: {
    dayroom
  }
}
</script>

<style>
.container-fluid{
  background-color: #fff;
}
</style>