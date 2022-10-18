<!-- [add line numbers to textarea](https://www.webtips.dev/add-line-numbers-to-html-textarea) -->

<template>
  <div class="tree">
    <div class="spacer"></div>
    <span class="username">wombat</span>
    <ul>
      <li>
        <a href=""> <font-awesome-icon icon="fa-solid fa-book" /> all notes </a>

        <ul>
          <li>
            <a href="">
              <font-awesome-icon icon="fa-solid fa-sticky-note" /> ToDo</a
            >
            <!-- <span>28.09.2020</span> -->
          </li>
          <li>
            <a href="">
              <font-awesome-icon icon="fa-solid fa-sticky-note" /> Projects
            </a>
            <!-- <span>28.09.2020</span> -->
          </li>
          <li>
            <a href="">
              <font-awesome-icon icon="fa-solid fa-sticky-note" />
              Einkaufliste
            </a>
            <!-- <span>28.09.2020</span> -->
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotesTree',
  methods: {},
});
</script>

<style scoped lang="scss">
body {
  font-size: 1rem;
  background: #f5f5f5;
}

.tree {
  padding: 30px;
  margin-top: 20px;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 1.5;
  background: #232935;
  color: #f5f5f5;
  height: 100%;
  width: 100%;

  .spacer {
    height: 10px;
  }
  .username {
    padding-top: 10px;
    margin: 10px;
    font-size: 0.9rem;
  }

  span {
    font-size: 13px;
    font-style: italic;
    letter-spacing: 0.4px;
    color: #f5f5f5;
  }

  .fa-sticky-note,
  .fa-book {
    color: #007bff;
  }

  .fa-html5 {
    color: #f21f10;
  }

  ul {
    padding-left: 15px;
    list-style: none;

    li {
      position: relative;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 15px;
      margin-right: 10px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      cursor: pointer;
      overflow: hidden;

      &:before {
        position: absolute;
        top: 15px;
        left: 0;
        width: 10px;
        height: 1px;
        margin: auto;
        content: '';
        background-color: #666;
      }

      &:after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 1px;
        height: 100%;
        content: '';
        background-color: #666;
      }

      &:last-child:after {
        height: 15px;
      }
    }

    a {
      cursor: pointer;
      text-decoration: none;
      color: #f5f5f5;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
