<template>
  <div id="dialog-box">
    <div id="dialog-content">
      <textarea id="inputarea"></textarea>
      <button @click="input()">Enter</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "dialog-box",
  methods: {
    input: function () {
      var textarea = document.getElementById("inputarea");
      // handling errors
      if (isNaN(textarea.value)) {
        alert("Please, Enter only numbers");
      } else if (textarea.value <= 0) {
        alert("Please, Enter only positive numbers");
      } else {
        this.$emit("dialog-input", textarea.value);
        textarea.value = "";
      }
    },
  },
};
</script>
<style  scoped>
#dialog-box {
  display: none;
  position: fixed;
  z-index: 1;
  border: 1px solid black;
  background-color: #e1fc6b;
  border-radius: 10px;
  width: 100px;
}
#dialog-content {
  flex-direction: column;
  justify-content: space-around;
  background-color: #e1fc6b;
  border: 1px solid black;
  padding: 20px;
  border-radius: 10px;
  display: inline-block;
}
#inputarea {
  margin-bottom: 10px;
  max-height: 30px;
  min-height: 30px;
  min-width: 50px;
  max-width: 50px;
  border-radius: 5px;
  display: inline-block;
}

button{
  background-color: rgb(95, 106, 255);
  border-radius: 20px;  
}
</style>