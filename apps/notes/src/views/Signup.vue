<template>
  <div class="container">
    <form @submit.prevent="submit">
      <a href="">Sign Up</a>
      <input
        v-model="email"
        class="first-input"
        type="email"
        placeholder="Email"
      />
      <p v-if="emailHasErr" class="error-msg">Email is required.</p>
      <p v-if="emailAlreadyInUse" class="error-msg">Email already in use.</p>

      <input v-model="username" type="text" placeholder="Username" />
      <p v-if="usernameHasErr" class="error-msg">Username is required.</p>

      <input v-model="password" type="password" placeholder="Password" />
      <p v-if="passwdHasErr" class="error-msg">Password is required.</p>

      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
      <p v-if="confPasswdHasErr" class="error-msg">Password does not match.</p>

      <button @click="submit" class="signup">Sign Up</button>
      <button class="login" @click="moveToLogin">Log In</button>
      <br />
      <p v-if="serverErr" class="error-msg">{{ serverErr }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { AxiosError } from 'axios';
import { defineComponent } from 'vue';
import UserService from '../services/user.service';

export default defineComponent({
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      emailHasErr: false,
      usernameHasErr: false,
      passwdHasErr: false,
      confPasswdHasErr: false,
      emailAlreadyInUse: false,
      serverErr: '',
    };
  },
  methods: {
    async submit(e: any) {
      e.preventDefault();

      if (this.hasInputError()) {
        return;
      }

      await UserService.register(this.email, this.username, this.password)
        .then((res) => {
          if (res.data.status === 409) {
            this.emailAlreadyInUse = true;
            return;
          }

          this.$router.push('/login');
        })
        .catch((err: any) => {
          console.error(err);

          if (err instanceof AxiosError) {
            if (err.response?.data.message) {
              console.log(err.response?.data.message);
              this.serverErr = err.response?.data.message.join(', ');
            }
          }
        });
    },
    moveToLogin() {
      this.$router.push('/login');
    },
    hasInputError() {
      if (!this.confirmPassword) {
        this.passwdHasErr = true;
      }
      if (!this.username) {
        this.usernameHasErr = true;
      }
      if (!this.confirmPassword) {
        this.passwdHasErr = true;
      }
      if (!this.email) {
        this.emailHasErr = true;
      }
      if (this.password !== this.confirmPassword) {
        this.confPasswdHasErr = true;
      }

      if (
        this.emailHasErr ||
        this.passwdHasErr ||
        this.usernameHasErr ||
        this.confPasswdHasErr
      ) {
        return true;
      }

      this.emailHasErr = false;
      this.emailAlreadyInUse = false;
      this.passwdHasErr = false;
      this.usernameHasErr = false;
      this.confPasswdHasErr = false;

      return false;
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