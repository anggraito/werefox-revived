<template>
  <div class="dayroom">
    <div class="row room-wrap">
      <h2>{{room.name}}</h2>
      <button type="button" @click="callServerForBrowserCloseEvent">Leave</button>
      <div class="chat-room col-sm-12 col-md-9">
        <chatbox :id="id" />
      </div>
      <div class="right-sidebar col-sm-12 col-md-3">
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
