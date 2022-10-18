<!-- [add line numbers to textarea](https://www.webtips.dev/add-line-numbers-to-html-textarea) -->

<template>
  <div class="editor">
    <div class="line-numbers">
      <span v-for="i in lineNbr" :key="i"></span>
    </div>
    <div
      contenteditable
      class="textarea"
      @input="onInput"
      @keydown.tab.prevent="insertTab($event)"
      ref="root"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MarkdownEditor',
  data() {
    return {
      tabLength: 2,
      lineNbr: 1,
      textNote: '',
    };
  },
  methods: {
    getCaretCoordinates() {
      let x = 0;
      let y = 0;
      const isSupported = typeof window.getSelection !== 'undefined';
      if (!isSupported) {
        alert('Browser not supported');
        return { x, y };
      }
      const selection = window.getSelection();
      if (selection && selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(true);
        const rect = range.getClientRects()[0];

        if (rect) {
          x = rect.left;
          y = rect.top / 21;
        }
      }
      return { x, y };
    },
    getCaretIndex(element: any) {
      let position = 0;
      const isSupported = typeof window.getSelection !== 'undefined';
      if (isSupported) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount !== 0) {
          const range = selection.getRangeAt(0);
          const preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(element);
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          position = preCaretRange.toString().length;
        }
      }
      return position;
    },
    onInput(e: any) {
      this.textNote = e.target.innerText;
      this.$emit('noteUpdated', this.textNote);

      this.countLineNbr(this.textNote);
    },
    countLineNbr(text: string) {
      text = text.replace(/\n/g, '<br>');
      text = text.replace(/<br><br>/g, '<br>');

      const lastBreak = text.slice(text.length - 4);

      if (lastBreak !== '<br>') {
        text += '<br>';
      }

      this.lineNbr = text.split('<br>').length;
      return this.lineNbr;
    },
    insertTab(event: any) {
      if (!event) {
        return;
      }
      // let textarea: any = this.$refs.ta;
      // const start = textarea.selectionStart;
      // const end = textarea.selectionEnd;

      // textarea.value =
      //   textarea.value.substring(0, start) +
      //   ' '.repeat(this.tabLength) +
      //   textarea.value.substring(end);
    },
  },

  afterMount() {
    this.countLineNbr(this.textNote);
  },
});
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');
.editor {
  display: inline-flex;
  gap: 10px;
  font-family: 'Inconsolata', monospace;
  font-size: 16px;
  line-height: 21px;
  background: #282a3a;
  padding: 20px 10px;

  width: 100%;
  max-width: 100vw;
  min-width: 20vw;

  overflow-wrap: break-word;
}

.textarea {
  width: 100%;
  max-width: 100vw;
  min-width: 20vw;
  line-height: 21px;
  overflow-y: hidden;
  padding: 0;
  margin: 0;
  text-align: left;
  border: 0;
  background: #282a3a;
  color: #fff;

  outline: none;
  resize: none;
  overflow-wrap: break-word;
}

.line-numbers {
  width: 20px;
  text-align: right;
}

.line-numbers span {
  counter-increment: linenumber;
}

.line-numbers span::before {
  content: counter(linenumber);
  display: block;
  color: #ffd700;
}
</style>
