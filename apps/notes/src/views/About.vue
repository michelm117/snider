<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{user}}
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'About',
  components: {
  },
  data() {
    return {
      user: undefined,
    };
  },
  created() {
    // Simple GET request using fetch
    fetch("https://randomuser.me/api/")
      .then(response => response.json())
      .then(data => (this.user = data));
  }
});
</script>

<style scoped lang="scss">

</style>

