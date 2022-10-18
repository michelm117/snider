<template>
  <div class="container">
    <NotesTree class="notes-tree"></NotesTree>

    <div class="toolbar">
      <button>
        <font-awesome-icon icon="fa-solid fa-undo" />
      </button>
      <button>
        <font-awesome-icon icon="fa-solid fa-redo" />
      </button>
      <button>
        <font-awesome-icon icon="fa-solid fa-bold" />
      </button>
      <button>
        <font-awesome-icon icon="fa-solid fa-italic" />
      </button>
      <button>
        <font-awesome-icon icon="fa-solid fa-heading" />
      </button>
      <button>
        <font-awesome-icon icon="fa-solid fa-list-ol" />
      </button>
      <button>
        <font-awesome-icon icon="fa-solid fa-list-ul" />
      </button>
      <button>
        <font-awesome-icon icon="fa-solid fa-save" />
      </button>
      <button @click="changeMode">
        <font-awesome-icon
          v-if="mode === Mode.Edit"
          icon="fa-solid fa-pencil"
        />
        <font-awesome-icon
          v-if="mode === Mode.Read"
          icon="fa-brands fa-readme"
        />
        <font-awesome-icon
          v-if="mode === Mode.Split"
          icon="fa-solid fa-table-columns"
        />
      </button>
    </div>

    <MarkdownEditor
      v-if="mode === Mode.Edit || mode === Mode.Split"
      :class="{
        'full-screen': mode === Mode.Edit,
        texteditor: mode === Mode.Split,
      }"
      @noteUpdated="onTextChange"
      class="texteditor"
    >
    </MarkdownEditor>
    <!-- <Panel></Panel> -->
    <HtmlPanel
      v-if="mode === Mode.Read || mode === Mode.Split"
      v-bind:markdownText="markdown"
      :class="{ 'full-screen': mode === Mode.Read }"
    ></HtmlPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MarkdownEditor from '../components/MarkdownEditor.vue';
import HtmlPanel from '../components/HtmlPanel.vue';
import NotesTree from '../components/NotesTree.vue';

enum Mode {
  Read,
  Edit,
  Split,
}

export default defineComponent({
  name: 'Home',
  components: {
    MarkdownEditor,
    HtmlPanel,
    NotesTree,
  },
  data() {
    return {
      markdown: '',
      cachedMarkdown: '',
      mode: Mode.Split,
      Mode: Mode,
    };
  },
  methods: {
    onTextChange(markdown: string) {
      this.markdown = markdown;
      this.cachedMarkdown = this.markdown;
      return this.markdown;
    },
    changeMode() {
      switch (this.mode) {
        case Mode.Edit:
          this.mode = Mode.Read;
          break;
        case Mode.Read:
          this.mode = Mode.Split;
          break;
        default:
          this.mode = Mode.Edit;
          break;
      }
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 200px 1fr 1fr;
  background-color: #232935;
}
.notes-tree {
  height: 100%;
  padding: 0;
  margin: 0;
  grid-row: 1 / 3;
  grid-column: 1;
}

.toolbar {
  width: 100%;
  padding: 10px;
  grid-row: 1;
  grid-column: 2 / 4;
  background-color: #232935;
  color: #fcfcfc;
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    padding: 5px;
    color: #fcfcfc;
    background-color: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;

    &:nth-last-child(2) {
      margin-left: auto;
    }

    &:nth-last-child(1) {
      margin-right: 20px;
    }
  }
}

.texteditor-split {
  height: 100%;
  grid-row: 2 / 3;
  grid-column: 2;
}

.full-screen {
  grid-row: 2 / 3;
  grid-column: 2 / 4;
  margin: 0 20%;
  width: 50vw;
}

.html-panel-split {
  height: 100%;
  padding: 0;
  margin: 0;
  grid-row: 2 / 3;
  grid-column: 3;
}
</style>

