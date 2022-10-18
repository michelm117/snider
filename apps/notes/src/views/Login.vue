<template>
  <div class="container">
    <form @submit.prevent="submit">
      <a href="">Log In</a>
      <input
        class="first-input"
        type="email"
        placeholder="email"
        v-model="email"
      />
      <br />
      <input type="password" placeholder="Password" v-model="password" />
      <p v-if="hasErr" class="error-msg">Password or Username wrong.</p>
      <br />
      <button class="login-btn">Log In</button>
      <button @click="moveToSignup" class="signup-btn">Sign Up</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserService from '../services/user.service';

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
      hasErr: false,
    };
  },
  methods: {
    submit(e: any) {
      UserService.login(this.email, this.password)
        .then((res: any) => {
          console.log(res);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      e.preventDefault();

      // this.email = submitEvent.target.elements.email.value;
      // this.password = submitEvent.target.elements.password.value;
      // const auth = getAuth();
      // signInWithEmailAndPassword(auth, this.email, this.password)
      //   .then(() => {
      //     this.$router.push("/dashboard");
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     console.log(errorCode);
      //     console.log(errorMessage);
      //     let alert_1 = document.querySelector("#alert_1");
      //     alert_1.classList.remove("d-none");
      //     alert_1.innerHTML = errorMessage;
      //     console.log(alert_1);
      //   });
    },
    moveToSignup() {
      this.$router.push('/signup');
    },
  },
});
</script>

<style scoped lang="scss">
.container {
  background: linear-gradient(56deg, #40e49a, #5f75aa);
  display: flex;
  justify-content: center;
  height: 100%;

  form {
    margin-top: 6%;
    margin-left: 20px;
    color: #fff;
    display: block;
    transition: all 0.5s ease-in-out;
    transition-delay: 0.3s;

    a,
    a:visited {
      font-size: 36px;
      color: #fff;
      text-decoration: none;
      font-weight: bold;
      display: block;
    }

    input {
      margin-top: 30px;
      height: 40px;
      width: 300px;
      border-radius: 2px;
      border: none;
      background-color: #444;
      opacity: 0.6;
      outline: none;
      color: #fff;
      padding-left: 10px;
    }

    .first-input {
      margin-top: 60px;
    }

    button {
      margin-top: 60px;
      height: 40px;
      width: 140px;
      outline: none;
      cursor: pointer;
    }

    .login-btn {
      background: #fff;
      border: none;
      border-radius: 2px;
      color: #696a86;
    }

    .signup-btn {
      background: transparent;
      border: 2px solid #fff;
      border-radius: 2px;
      color: #fff;
      margin-left: 30px;
    }
  }
}
</style>