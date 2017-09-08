<template>
  <div class="chatbox">
    <div class="chat_window">
      <div class="top_menu">
        <div class="title">Username</div>
      </div>
      <ul id="chatbox" class="messages">
        <li v-for="chat in chatPublic" :key="chat['.key']">
          <strong :class="{'god-chat': chat.username == 'GOD'}">{{ chat.username }}</strong>: {{chat.message}}
        </li>
      </ul>
      <div class="bottom_wrapper clearfix">
        <form @submit="emitMessage">
          <div class="message_input_wrapper">
              <input class="message_input" placeholder="Type your message here..." v-model="textField" />
          </div>
          <div class="send_message">
              <button class="transparant" type="submit">Send</button>
          </div>
        </form>
      </div>
  </div>
  <div class="message_template">
      <li class="message">
          <div class="avatar"></div>
          <div class="text_wrapper">
              <div class="text"></div>
          </div>
      </li>
  </div>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
  name: 'chatbox',
  props: ['id'],
  data () {
    return {
      textField: '',
      user: jwt.verify(window.localStorage.getItem('token'), 'werefox')
    }
  },
  firebase () {
    return {
      chatPublic: this.$db.ref('rooms').child(this.id).child('chatPublic')
    }
  },
  methods: {
    emitMessage (e) {
      e.preventDefault()
      if (this.textField.trim() !== '') {
        var objDiv = document.getElementById('chatbox')
        objDiv.scrollTop = objDiv.scrollHeight
        this.$db.ref('rooms').child(this.id).child('chatPublic').push({
          username: this.user.username,
          message: this.textField
        })
        this.textField = ''
      }
    }
  }
}
</script>

<style>
  .god-chat {
    color: red;
  }
  .boxes{
    background-color: rgba(222,222,222,0.5);
    margin-bottom: 5px;
  }
  .boxes .god-chat{
    background-color: #000;
    padding: 3px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
</style>
