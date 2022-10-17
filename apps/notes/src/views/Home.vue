<template>
  <div v-bind:class="[showHtml ? 'two-column' : 'one-column']" class="home">
    <TextArea @noteChanged="updateMarkdown"></TextArea>
    <div v-if="showHtml" class="htmlPanel" v-html="markdownToHtml"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TextArea from '../components/TextArea.vue';

export default defineComponent({
  name: 'Home',
  components: {
    TextArea,
  },
  data() {
    return {
      markdown: '',
      showHtml: true,
    };
  },
  methods: {
    updateMarkdown(note: string) {
      this.markdown = note;
    },
  },
  computed: {
    markdownToHtml() {
      return this.md(this.markdown);
    },
  },
});
</script>

<style scoped lang="scss">
.two-column {
  grid-template-columns: 1fr 1fr;
}

.one-column {
  grid-template-columns: 1fr;
}

.home {
  height: 90vh;
  display: grid;
  grid-template-rows: 1fr;

  .htmlPanel {
    font-family: Courier, monospace;
    font-weight: normal;
    font-size: 16px;
    padding-top: 45px;
    text-align: left;
  }
}
</style>

