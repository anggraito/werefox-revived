<template>
  <div class="addroom">
    <div class="row card-wrap">
      <div class="cardo col-sm-12 col-md-3" @click="addroom">
        <div class="box">
          <div class="add-wrapper">
            <img src="../assets/plus.png" />
          </div>
          <div class="card-block">
            <h4 class="card-title">Add Town</h4>
          </div>
        </div>
      </div>
      <div class="cardo col-sm-12 col-md-3" v-for="room in rooms" @click="joinroom(room['.key'])" v-if="room.start == false">
        <button type="button">
        <div class="box">
          <div class="img-wrapper">
            <img src="../assets/wolfie.png" />
          </div>
          <div class="card-block">
            <h4 class="card-title">Town Name</h4>
            <h3 class="card-title"><strong>{{room.name}}</strong></h3>
            <h4 class="card-title">Population: {{Object.keys(room.member).length}}</h4>
          </div>
        </div>
      </button>
      </div>
    </div>
  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'
  export default {
    name: 'addroom',
    firebase() {
      return {
        rooms: this.$db.ref('rooms')
      }
    },
    data() {
      return {
        mydata: []
      }
    },
    methods: {
      joinroom(idroom, name) {
        this.$db.ref('rooms').child(idroom).child('member').child(this.mydata.id).set({
          username: this.mydata.username,
          alive: true
        })
        this.$router.push({
          path: `room/${idroom}`
        })
      },
      gettoken() {
        var decode = jwt.verify(window.localStorage.getItem('token'), 'werefox')
        this.mydata = decode
      },
      addroom() {
        this.$http.get('/create-room', {
          headers: {
            token: window.localStorage.getItem('token')
          }
        })
      }
    },
    created() {
      this.gettoken()
    }
  }

</script>
