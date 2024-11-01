// src/services/modeService.js

export default {
    chooseDraw(context) {
      context.draw = true;
      context.select = false;
      context.move = false;
      context.copy = false;
      context.delet = false;
      context.dotted = false;
      context.resize = false;
    },
  
    chooseSelect(context) {
      context.draw = false;
      context.select = true;
      context.move = false;
      context.copy = false;
      context.delet = false;
      context.dotted = false;
      context.resize = false;
    },
  
    chooseMove(context) {
      context.draw = false;
      context.select = false;
      context.move = true;
      context.copy = false;
      context.delet = false;
      context.dotted = false;
      context.resize = false;
    },
  
    chooseCopy(context) {
      context.draw = false;
      context.select = false;
      context.move = false;
      context.copy = true;
      context.delet = false;
      context.dotted = false;
      context.resize = false;
    }
  };