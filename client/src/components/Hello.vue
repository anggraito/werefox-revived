<template>
  <div class="container">
    <div class="panel">
      <ul class="panel__menu" id="menu">
        <hr/>
        <li id="signIn" @click="showSignIn" ref="loginBtn"> <a href="#">Login</a></li>
        <li id="signUp" @click="showSignUp"><a href="#">Sign up</a></li>
      </ul>
      <div class="panel__wrap">
        <div class="panel__box active" id="signInBox">
          <label>Username
            <input class="name-input" type="text" v-model="loginUsername"/>
          </label>
          <label>Password
            <input type="password" v-model="loginPassword"/>
          </label>
          <input @click="login" type="submit"/>
        </div>
        <div class="panel__box" id="signUpBox">
          <label>Username
            <input class="name-input" type="text" v-model="signupUsername"/>
          </label>
          <label>Password
            <input type="password" v-model="signupPassword"/>
          </label>
          <input @click="signup" type="submit"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginUsername: '',
      loginPassword: '',

      signupUsername: '',
      signupPassword: ''
    }
  },
  methods: {
    showSignUp (e) {
      e.preventDefault()
      this.removeSelection()
      this.panelBoxes[1].classList.add('active')
      this.menu.classList.add('second-box')
    },
    showSignIn (e) {
      e.preventDefault()
      this.removeSelection()
      this.panelBoxes[0].classList.add('active')
      this.menu.classList.remove('second-box')
    },
    removeSelection () {
      for (var i = 0, len = this.panelBoxes.length; i < len; i++) {
        this.panelBoxes[i].classList.remove('active')
      }
    },

    // auth
    login () {
      this.$http.post('/signin', {
        username: this.loginUsername,
        password: this.loginPassword
      })
      .then(({data}) => {
        localStorage.setItem('token', data)
        this.loginUsername = ''
        this.loginPassword = ''
        this.$router.push({path: '/dashboard'})
      })
      .catch(err => console.log(err))
    },

    signup () {
      this.$http.post('/', {
        username: this.signupUsername,
        password: this.signupPassword
      })
      .then(({data}) => {
        console.log(data)
        this.signupUsername = ''
        this.signupPassword = ''
        this.$refs.loginBtn.click()
      })
      .catch(err => console.log(err))
    }
  },
  computed: {
    menu () {
      return document.getElementById('menu')
    },
    panelBoxes () {
      return document.querySelectorAll('.panel__box')
    }
  },
  created () {
    if (localStorage.getItem('token') !== null) {
      this.$router.push({path: '/dashboard'})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
.view__more {
  position: relative;;
  left: 0;
  top: 0;
  padding: 20px 40px;
  background: black;
  color: #fff;
  -webkit-transition: all .3s;
  transition: all .3s;
}
.view__more:hover {
  background: #717eae;
}
body {
  background: black;
  font-family: 'Lato', sans-serif;
}
a {
  text-decoration: none;
  color: inherit;
}
.panel {
  width: 600px;
  margin: auto;
}
.panel__menu {
  width: 100%;
  float: left;
  margin: 20px 0 30px;
  position: relative;
}
.panel__menu.second-box hr {
  -webkit-transform: translateX(325%);
          transform: translateX(325%);
}
.panel__menu hr {
  position: absolute;
  top: 100%;
  width: 20%;
  -webkit-transform: translateX(75%);
          transform: translateX(75%);
  border: none;
  background: #C8DFED;
  height: 1px;
  margin: 0;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.panel__menu li {
  width: 50%;
  text-align: center;
  float: left;
  cursor: pointer;
}
.panel__menu li a {
  color: black;
  display: inline-block;
  padding: 17px 30px;
  text-transform: uppercase;
}
.panel__wrap {
  width: 100%;
  float: left;
  position: relative;
}
.panel__wrap .panel__box label {
  opacity: 0;
}
.panel__wrap .panel__box:first-child {
  left: 0;
  -webkit-transform: translateX(30%) scale(0.8);
          transform: translateX(30%) scale(0.8);
  -webkit-animation: box-1--out 0.5s;
          animation: box-1--out 0.5s;
  -webkit-transform-origin: center right;
          transform-origin: center right;
}
.panel__wrap .panel__box:first-child.active {
  -webkit-transform: translateX(35%);
          transform: translateX(35%);
  -webkit-animation: box-1 0.5s;
          animation: box-1 0.5s;
}
.panel__wrap .panel__box:last-child {
  right: 0;
  -webkit-transform: translateX(-30%) scale(0.8);
          transform: translateX(-30%) scale(0.8);
  -webkit-animation: box-2--out 0.5s;
          animation: box-2--out 0.5s;
  -webkit-transform-origin: center left;
          transform-origin: center left;
}
.panel__wrap .panel__box:last-child input[type="submit"] {
  background: none;
  border: 1px solid #A5E434;
  color: #A5E434;
}
.panel__wrap .panel__box:last-child.active {
  -webkit-animation: box-2 0.5s;
          animation: box-2 0.5s;
  -webkit-transform: translateX(-35%);
          transform: translateX(-35%);
}
.panel__box {
  width: 50%;
  float: left;
  z-index: 1;
  background: pink;
  position: absolute;
  padding: 20px;
  background: #C8DFED;
  border-radius: 4px;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.panel__box.active {
  background: #fff;
  z-index: 2;
}
.panel__box.active label, .panel__box.active input {
  opacity: 1;
}
.panel__box label {
  float: left;
  width: 100%;
  margin-bottom: 20px;
  color: #a1b4b4;
}
.panel__box input {
  outline: none;
  opacity: 0;
}
.panel__box .name-input, .panel__box input[type="password"] {
  margin-top: 10px;
  width: 100%;
  float: left;
  background: #EEF9FE;
  border: 1px solid #CDDBEF;
  border-radius: 3px;
  padding: 7px 10px;
}
.panel__box input[type="submit"] {
  float: right;
  cursor: pointer;
  border: none;
  padding: 11px 40px;
  background: black;
  border-radius: 30px;
  color: #fff;
}
@-webkit-keyframes box-1 {
  0% {
    -webkit-transform: translateX(30%) scale(0.8);
            transform: translateX(30%) scale(0.8);
    z-index: 1;
  }
  49% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 1;
  }
  50% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 2;
    label, input {
      opacity: 0;
    }
  }
  100% {
    -webkit-transform: translateX(35%) scale(1);
            transform: translateX(35%) scale(1);
    z-index: 2;
    label, input {
      opacity: 1;
    }
  }
}
@keyframes box-1 {
  0% {
    -webkit-transform: translateX(30%) scale(0.8);
            transform: translateX(30%) scale(0.8);
    z-index: 1;
  }
  49% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 1;
  }
  50% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 2;
    label, input {
      opacity: 0;
    }
  }
  100% {
    -webkit-transform: translateX(35%) scale(1);
            transform: translateX(35%) scale(1);
    z-index: 2;
    label, input {
      opacity: 1;
    }
  }
}
@-webkit-keyframes box-1--out {
  0% {
    -webkit-transform: translateX(35%) scale(1);
            transform: translateX(35%) scale(1);
    z-index: 2;
    label {
      opacity: 1;
    }
  }
  49% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 2;
  }
  50% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 1;
    label, input {
      opacity: 1;
    }
  }
  100% {
    -webkit-transform: translateX(30%) scale(0.8);
            transform: translateX(30%) scale(0.8);
    z-index: 1;
    label, input {
      opacity: 0;
    }
  }
}
@keyframes box-1--out {
  0% {
    -webkit-transform: translateX(35%) scale(1);
            transform: translateX(35%) scale(1);
    z-index: 2;
    label {
      opacity: 1;
    }
  }
  49% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 2;
  }
  50% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 1;
    label, input {
      opacity: 1;
    }
  }
  100% {
    -webkit-transform: translateX(30%) scale(0.8);
            transform: translateX(30%) scale(0.8);
    z-index: 1;
    label, input {
      opacity: 0;
    }
  }
}
@-webkit-keyframes box-2 {
  0% {
    -webkit-transform: translateX(-30%) scale(0.8);
            transform: translateX(-30%) scale(0.8);
    z-index: 1;
  }
  49% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 1;
  }
  50% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 2;
    label, input {
      opacity: 0;
    }
  }
  100% {
    -webkit-transform: translateX(-35%) scale(1);
            transform: translateX(-35%) scale(1);
    z-index: 2;
    label, input {
      opacity: 1;
    }
  }
}
@keyframes box-2 {
  0% {
    -webkit-transform: translateX(-30%) scale(0.8);
            transform: translateX(-30%) scale(0.8);
    z-index: 1;
  }
  49% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 1;
  }
  50% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 2;
    label, input {
      opacity: 0;
    }
  }
  100% {
    -webkit-transform: translateX(-35%) scale(1);
            transform: translateX(-35%) scale(1);
    z-index: 2;
    label, input {
      opacity: 1;
    }
  }
}
@-webkit-keyframes box-2--out {
  0% {
    -webkit-transform: translateX(-35%) scale(1);
            transform: translateX(-35%) scale(1);
    z-index: 2;
  }
  49% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 2;
  }
  50% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 1;
    label, input {
      opacity: 1;
    }
  }
  100% {
    -webkit-transform: translateX(-30%) scale(0.8);
            transform: translateX(-30%) scale(0.8);
    z-index: 1;
    label, input {
      opacity: 0;
    }
  }
}
@keyframes box-2--out {
  0% {
    -webkit-transform: translateX(-35%) scale(1);
            transform: translateX(-35%) scale(1);
    z-index: 2;
  }
  49% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 2;
  }
  50% {
    -webkit-transform: translateX(0) scale(0.9);
            transform: translateX(0) scale(0.9);
    z-index: 1;
    label, input {
      opacity: 1;
    }
  }
  100% {
    -webkit-transform: translateX(-30%) scale(0.8);
            transform: translateX(-30%) scale(0.8);
    z-index: 1;
    label, input {
      opacity: 0;
    }
  }
}
</style>
