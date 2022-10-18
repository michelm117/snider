<!-- How to add line numbering
  [add line numbers to textarea](https://www.webtips.dev/add-line-numbers-to-html-textarea) 
-->


<template>
  <div class="container">
    <div class="html-panel" v-html="markdownToHtml()"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { marked } from 'marked';

export default defineComponent({
  name: 'HtmlPanel',
  props: {
    markdownText: String,
  },
  methods: {
    markdownToHtml() {
      if (!this.markdownText) {
        return '';
      }
      return marked(this.markdownText);
    },
  },
});
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.container {
  height: 100%;
  width: 100%;
  max-width: 100vw;
  min-width: 20vw;
}

.html-panel {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 21px;
  background: #232935;
  color: #fbfbfb;
  padding: 5px 10px;
  height: 100%;
  width: 100%;
  max-width: 100vw;
  min-width: 50vw;
  overflow-wrap: break-word;
}
</style>
