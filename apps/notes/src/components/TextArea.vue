<template>
  <div id="wrapper">
    <form id="paper">
      <textarea placeholder="Enter something funny." id="text" name="text" rows="1" @input="resize($event)"
        v-model="strNote"></textarea>
      <br>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextArea',
  data() {
    return {
      numberOfLines: 100,
      strNote: ''
    }
  },
  methods: {
    resize(e: any) {
      e.target.style.height = "auto"
      e.target.style.height = `${e.target.scrollHeight}px`
    }
  },
  watch: {
    strNote(val) {
      this.$emit("noteChanged", val)
    }
  }
});
</script>

<style scoped lang="scss">
* {
  outline: none;
  border: none;
  margin: 0px;
  padding: 0px;
  font-family: Courier, monospace;
}

body {
  background: #333 url(https://static.tumblr.com/maopbtg/a5emgtoju/inflicted.png) repeat;

  #wrapper {
    width: 700px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: 24px;
    margin-bottom: 100px;


    #paper {

      #text {
        width: 100%;
        min-height: 50vh;
        overflow: hidden;
        background-color: #FFF;
        color: #222;
        font-family: Courier, monospace;
        font-weight: normal;
        font-size: 16px;
        resize: none;
        line-height: 40px;
        padding-left: 100px;
        padding-right: 100px;
        padding-top: 45px;
        padding-bottom: 34px;
        background-image: url(https://static.tumblr.com/maopbtg/E9Bmgtoht/lines.png), url(https://static.tumblr.com/maopbtg/nBUmgtogx/paper.png);
        background-repeat: repeat-y, repeat;
        -webkit-border-radius: 12px;
        border-radius: 12px;
        -webkit-box-shadow: 0px 2px 4px rgb(75, 75, 75);
        box-shadow: 0px 2px 4px rgb(75, 75, 75);
        border-top: 1px solid #FFF;
        border-bottom: 1px solid #FFF;
        box-sizing: border-box;
      }
    }
  }
}
</style>
