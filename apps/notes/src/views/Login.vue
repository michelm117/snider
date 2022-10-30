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
      <p v-if="hasErr" class="error-msg">{{ error }}</p>
      <br />
      <button class="login-btn">Log In</button>
      <button @click="moveToSignup" class="signup-btn">Sign Up</button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import AuthService from '../services/auth.service';
import TokenService from '../services/token.service';

export default defineComponent({
  data() {
    return {
      email: 'marc@michel.lu',
      password: 'marcmarcmarc',
      hasErr: false,
      error: 'Password or Username wrong.',
    };
  },
  methods: {
    async submit(e: any) {
      e.preventDefault();

      // await axios
      //   .post('http://localhost:3333/api/auth/login', {
      //     password: 'marcmarcmarc',
      //     email: 'marc@michel.lu',
      //   })
      //   .then((res: any) => {
      //     console.log(res);
      //   })
      //   .catch((err: any) => {
      //     console.error(err);
      //   });

      await AuthService.login(this.email, this.password)
        .then((res: any) => {
          const payload = res.data;
          if (!payload.accessToken) {
            throw new Error('No access token is response found');
          }

          TokenService.setToken(payload.accessToken);
          this.$router.push('/');
        })
        .catch((err: any) => {
          if (axios.isAxiosError(err)) {
            const res = err?.response;
            if (res) {
              if (res.status === 401) {
                this.hasErr = true;
                this.error = 'Password or Username wrong.';
                console.error(res.statusText);
              }
            }
          }
          console.error(err);
        });
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

    .error-msg {
      color: rgb(158, 0, 0);
      margin: 0;
      margin-top: 12px;
      padding: 0;
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