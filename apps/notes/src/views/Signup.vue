<template>
  <div class="container">
    <form>
      <a href="">Sign Up</a>
      <input v-model="email" class="first-input" type="email" placeholder="Email">
      <p v-if="emailHasErr" class="error-msg">Email is required.</p>

      <input v-model="username" type="text" placeholder="Username">
      <p v-if="usernameHasErr" class="error-msg">Username is required.</p>

      <input v-model="password" type="password" placeholder="Password">
      <p v-if="passdHasErr" class="error-msg">Password is required.</p>

      <input v-model="confirmPassword" type="password" placeholder="Confirm Password">
      <p v-if="confPasswdHasErr" class="error-msg">Password does not match.</p>

      <button @click="submit" class="signup">Sign Up</button>
      <button class="login" @click="moveToLogin">Log In</button>
    </form>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      emailHasErr: false,
      usernameHasErr: false,
      passdHasErr: false,
      confPasswdHasErr: false,
    };
  },
  methods: {
    submit() {
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
    moveToLogin() {
      this.$router.push("/login");
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
    width: min-content;

    a,
    a:visited {
      font-size: 36px;
      color: #fff;
      text-decoration: none;
      font-weight: bold;
      display: block;
    }

    input {
      margin-top: 20px;
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

    .error-msg {
      color: rgb(200, 0, 0);
      text-align: left;
      font-size: 14px;
      margin: 5px 0 0 0;
      padding: 0;
    }

    button {
      margin-top: 60px;
      height: 40px;
      width: 140px;
      outline: none;
      cursor: pointer;
    }

    .signup {
      background: #fff;
      border: none;
      border-radius: 2px;
      color: #696a86;
    }

    .login {
      background: transparent;
      border: 2px solid #fff;
      border-radius: 2px;
      color: #fff;
      margin-left: 30px;
    }
  }
}
</style>