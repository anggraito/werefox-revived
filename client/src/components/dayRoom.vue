<template>
  <div class="dayroom">
    <div class="row room-wrap">
      <h2>{{ room.name }}</h2>
      <ul class="swipe-wrap">
        <li>
          <a data-toggle="modal" data-target="#myModal" type="button" class="vote"><span>Vote</span><i class="glyphicon glyphicon-volume-up"></i></a>
        </li>
        <li @click="callServerForBrowserCloseEvent">
          <a class="out"><span></span><i class="glyphicon glyphicon-remove"></i> Exit</a>
        </li>
      </ul>
      <div class="title-page col-sm-12 com-md-9" v-if="room.start == false">
        <h2>Room Chatting</h2>
      </div>
      <div class="title-page col-sm-12 com-md-9" v-if="room.start == true">
        <h2>{{room.phase}} {{room.day}}</h2>
      </div>
      <div class="role-page col-sm-12 com-md-3" v-if="userfire.role">
        <img src="../assets/wolf1.jpg" v-if="userfire.role == 'werefox'">
        <img src="../assets/villager1.jpg" v-if="userfire.role == 'villager'">
        <p>Role: {{userfire.role}} </p>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Vote</h4>
              <small>Who do you think is the Werefox ? </small>
            </div>
            <div class="modal-body">
              <form action="">
                <span  v-for="user in room.member" :key="user['.key']">
                <input type="radio" name="gender" value="userid">{{user.username}}<br>
                </span>
                <button type="submit" class="btn btn-warning start sub">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal -->

      <div class="chat-room col-sm-12 col-md-9">
        <chatbox :id="id" />
      </div>
      <div class="right-sidebar col-sm-12 col-md-3">
        <div class="alert alert-info">You vote: <strong>username</strong></div>
        <h4>User List</h4>
        <ul class="media-list">
          <li class="media" v-for="user in room.member" :key="user['.key']">
            <div class="media-left">
              <a href="#" style="background-style: #fdb418">
                <img class="media-object" src="../assets/thumbnail.png" alt="">
              </a>
            </div>
            <div class="media-body">
              <h4 class="media-heading">{{user.username}}</h4>
            </div>
          </li>
        </ul>
        <button class="btn btn-warning start"  @click="startgame">START</button>
      </div>
    </div>
  </div>
</template>
<script>
  import chatbox from '@/components/Chatbox'
  import jwt from 'jsonwebtoken'
  export default {
    name: 'dayroom',
    props: ['id'],
    components: {
      chatbox
    },
    firebase() {
      return {
        room: {
          source: this.$db.ref('rooms').child(this.id),
          asObject: true
        },
        userfire: {
          source: this.$db.ref('rooms').child(this.id).child('member').child(this.datauser.id),
          asObject: true
        }
      }
    },
    computed: {
      datauser () {
        var decoded = jwt.verify(window.localStorage.getItem('token'), 'werefox')
        return decoded
      }
    },
    methods: {
      callServerForBrowserCloseEvent() {
        if (Object.keys(this.room.member).length < 1) {
          var roomref = this.$db.ref('rooms').child(this.id)
          roomref.set(null)
        } else {
          var ref = this.$db.ref('rooms').child(this.id).child('member').child(this.datauser.id)
          ref.remove()
          this.$db.ref('rooms').child(this.id).child('chatPublic').push({
            username: 'GOD',
            message: `${this.datauser.username} has left`
          })
        }
        this.$router.push({
          path: `../dashboard`
        })
      },
      joined() {
        this.$db.ref('rooms').child(this.id).child('chatPublic').push({
          username: 'GOD',
          message: `${this.datauser.username} has Joined`
        })
      },
      startgame() {
        this.$http.post('/start-room', {
          roomKey: this.id
        }, {
          headers: {
            token: window.localStorage.getItem('token')
          }
        })

      }
    },
    created() {
      this.joined()
    }
  }

</script>
