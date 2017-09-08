<template>
  <div class="dayroom">
    <div class="row room-wrap">
      <h2>{{room.name}}</h2>
      <button type="button" @click="callServerForBrowserCloseEvent">Leave</button>
      <ul class="swipe-wrap">
        <li>
          <a data-toggle="modal" data-target="#myModal" type="button" class="vote"><span>Vote</span><i class="glyphicon glyphicon-volume-up"></i></a>
        </li>
        <li>
          <a href="#" type="button" class="out"><span>Exit</span><i class="glyphicon glyphicon-remove"></i></a>
        </li>
      </ul>
      <!-- Modal -->
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Vote</h4>
              <small>Choose who's the werefox there as you think? </small>
            </div>
            <div class="modal-body">
              <form action="">
                <input type="radio" name="gender" value="userid"> username<br>
                <button type="submit" class="btn btn-warning start sub">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal -->
      <div class="row ">
        <div class="title-page col-sm-9 com-md-9">
          <h2>Room Chatting</h2>
        </div>
        <div class="role-page alert-warning col-sm-3 col-md-3">
          <img class="left-role" src="../assets/villager1.jpg" />
          <p class="right-role">Role: Wolfie/Villager</p>
        </div>
      </div>
      <div class="chat-room col-sm-12 col-md-9">
        <chatbox :id="id" />
      </div>
      <div class="right-sidebar col-sm-12 col-md-3">
        <div class="alert alert-info">You vote: <strong>username</strong></div>
        <h4>User List</h4>
        <ul class="media-list">
          <li class="media" v-for="user in room.member">
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
        <button class="btn btn-warning start">START</button>
      </div>
    </div>
  </div>
</template>
<script>
  window.onbeforeunload = function() {
    return "Are you sure you want to close the window?";
  }
  import chatbox from '@/components/Chatbox'
  import jwt from 'jsonwebtoken'
  export default {
    name: 'dayroom',
    props: ['id'],
    components: {
      chatbox
    },
    firebase () {
      return {
        room: {
          source: this.$db.ref('rooms').child(this.id),
          asObject: true
        }
      }
    },
    data () {
      return {
        datauser: []
      }
    },
    methods: {
      gettoken () {
        var decode = jwt.verify(window.localStorage.getItem('token'), 'werefox')
        this.datauser = decode
      },
      callServerForBrowserCloseEvent() {
        var ref = this.$db.ref('rooms').child(this.id).child('member').child(this.datauser.id)
        // console.log(ref);
        ref.remove()
      }
    },
    created () {
      this.gettoken()
    }
  }

</script>
