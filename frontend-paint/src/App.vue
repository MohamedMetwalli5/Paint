<template>
  <div id="app">
    <!-- Shape Controls -->
    <shapes
      id="shapes"
      @draw-shape="DrawShape"
      @selected="chooseSelect"
      @moved="chooseMove"
      @copied="chooseCopy"
      @Deleted="deleting"
      @undo-shape="Undo"
      @redo-shape="Redo"
      @Colored="Color"
      @resized="resizing"
    />

    <!-- Main Canvas -->
    <canvas
      id="canvas"
      height="1000px"
      width="1000px"
      @click="excuteChosen"
    ></canvas>

    <!-- Dialog Components -->
    <DialogBox id="dialog-box" @dialog-input="DialogInput" />
    <WHDialog id="w-h-dialog" @w-h-input="WHDialogInput" />
    <EllipseDialog id="ellipse-dialog" @ellipse-input="EllipseDialogInput" />
    <SideFooter />
  </div>
</template>

<script>
import shapes from "../src/components/shapes";
import DialogBox from "../src/components/Dialog";
import WHDialog from "../src/components/WHDialog";
import EllipseDialog from "../src/components/EllipseDialog";
import SideFooter from "../src/components/SideFooter.vue";
import modeService from "./services/modeSelectionService";
import shapeOperationsService from "../src/services/shapeOperationsService";
import selectionAndMovementService from "../src/services/selectionAndMovementService";
import shapeDrawingService from './services/shapeDrawingService';
import dialogInputService from './services/dialogInputService';

const axios = require("axios").default;

export default {
  name: "App",

  components: {
    shapes,
    DialogBox,
    WHDialog,
    EllipseDialog,
    SideFooter,
  },

  // Lifecycle Hooks
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background:#FEEF92')
  },
  
  beforeDestroy() {
    document.querySelector('body').setAttribute('style', '')
  },

  data() {
    return {
      shape: null,
      workingShape: null,
      shapes: [], 
      counter: 0,
      m: 0, // Index of workingShape in shapes array

      // State management
      draw: true,
      select: false,
      move: false,
      copy: false,
      delet: false,
      dotted: false,
      redraw: false,
      resize: false,
      color: "",
    };
  },

  methods: {
    // Mode Selection Methods
    chooseDraw() {
      modeService.chooseDraw(this);
    },

    chooseSelect() {
      modeService.chooseSelect(this);
    },

    chooseMove() {
      modeService.chooseMove(this);
    },

    chooseCopy() {
      modeService.chooseCopy(this);
    },

    // Core Drawing Methods
    DrawShape(shape) {
      this.draw = true;
      this.select = false;
      this.move = false;
      this.copy = false;
      this.delet = false;
      this.dotted = false;
      this.resize = false;
      this.redrawCanvas();
      this.shape = shape;
    },

    excuteChosen(event) {
      if (this.draw === true) {
        this.Draw(event);
      } else if (this.select === true) {
        this.selecting(event);
      } else if (this.move === true) {
        this.moving(event);
      } else if (this.copy === true) {
        this.copying(event);
      }
    },

    Draw(event) {
      if (this.shape != null) {
        const dialog = document.getElementById("dialog-box");
        const whdialog = document.getElementById("w-h-dialog");
        const ellipsedialog = document.getElementById("ellipse-dialog");

        this.GetCoors(event);

        switch(this.shape.type) {
          case "circle":
            dialog.style.display = "block";
            dialog.style.left = event.clientX + "px";
            dialog.style.top = event.clientY + "px";
            whdialog.style.display = "none";
            ellipsedialog.style.display = "none";
            break;

          case "line":
            this.Line();
            break;

          case "rectangle":
            whdialog.style.display = "block";
            whdialog.style.left = event.clientX + "px";
            whdialog.style.top = event.clientY + "px";
            dialog.style.display = "none";
            ellipsedialog.style.display = "none";
            break;

          case "square":
            dialog.style.display = "block";
            dialog.style.left = event.clientX + "px";
            dialog.style.top = event.clientY + "px";
            whdialog.style.display = "none";
            ellipsedialog.style.display = "none";
            break;

          case "triangle":
            this.Triangle();
            break;

          case "ellipse":
            ellipsedialog.style.display = "block";
            ellipsedialog.style.left = event.clientX + "px";
            ellipsedialog.style.top = event.clientY + "px";
            dialog.style.display = "none";
            whdialog.style.display = "none";
            break;
        }
      }
    },

    // Shape Drawing Methods
    Circle() {
      shapeDrawingService.Circle(this);
    },

    Line() {
      shapeDrawingService.Line(this);
    },

    Rectangle() {
      shapeDrawingService.Rectangle(this);
    },

    Square() {
      shapeDrawingService.Square(this);
    },

    Triangle() {
      shapeDrawingService.Triangle(this);
    },

    Ellipse() {
      shapeDrawingService.Ellipse(this);
    },

    // Utility Methods
    GetCoors(event) {
      const canvas = document.getElementById("canvas");
      const rect = event.target.getBoundingClientRect();
      const borderLeft = getComputedStyle(canvas, null).getPropertyValue("border-left-width");
      const padLeft = getComputedStyle(canvas, null).getPropertyValue("padding-left");
      const borderTop = getComputedStyle(canvas, null).getPropertyValue("border-top-width");
      const padTop = getComputedStyle(canvas, null).getPropertyValue("padding-top");

      const x = event.clientX - parseFloat(borderLeft) - parseFloat(padLeft) - rect.left;
      const y = event.clientY - parseFloat(borderTop) - parseFloat(padTop) - rect.top;

      if (this.draw === true) {
        this.shape.x.push(x);
        this.shape.y.push(y);
      } else if (this.move === true) {
        this.workingShape.x[0] = x;
        this.workingShape.y[0] = y;
      } else if (this.copy === true) {
        this.shape.x[0] = x;
        this.shape.y[0] = y;
      }
    },


    // Dialog input handlers
    DialogInput(input) {
      dialogInputService.DialogInput(this, input);
    },

    WHDialogInput(width, height) {
      dialogInputService.WHDialogInput(this, width, height);
    },

    EllipseDialogInput(radiusX, radiusY, rotationAngle) {
      dialogInputService.EllipseDialogInput(this, radiusX, radiusY, rotationAngle);
    },

    // Shape operations    
    Color(c) {
      shapeOperationsService.Color(this, c);
    },

    coloring() {
      shapeOperationsService.coloring(this);
    },

    resizeCS() {
      shapeOperationsService.resizeCS(this);
    },

    resizing() {
      shapeOperationsService.resizing(this);
    },

    Undo() {
      shapeOperationsService.Undo(this);
    },

    Redo() {
      shapeOperationsService.Redo(this);
    },

    deleting() {
      shapeOperationsService.deleting(this);
    },


    // Selection and movement operations
    selecting(event) {
      selectionAndMovementService.selecting(this, event);
    },

    moving(event) {
      selectionAndMovementService.moving(this, event);
    },

    copying(event) {
      selectionAndMovementService.copying(this, event);
    },

    // Canvas Operations
    clearCanvas() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },

    redrawCanvas(j) {
      this.clearCanvas();
      for (let i = 0; i < this.shapes.length; i++) {
        if (i !== j && this.shapes[i] && this.shapes[i].type !== "null") {
          this.shape = this.shapes[i];
          this.redraw = true;
          
          switch(this.shapes[i].type) {
            case "circle":
              this.Circle();
              break;
            case "line":
              this.Line();
              break;
            case "rectangle":
              this.Rectangle();
              break;
            case "square":
              this.Square();
              break;
            case "triangle":
              this.Triangle();
              break;
            case "ellipse":
              this.Ellipse();
              break;
          }
          
          this.redraw = false;
        }
      }
    },


    // Geometry Helper Methods
    sign(p1x, p1y, p2x, p2y, p3x, p3y) {
      return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);
    },

    PointInTriangle(ptx, pty, v1x, v1y, v2x, v2y, v3x, v3y) {
      const d1 = this.sign(ptx, pty, v1x, v1y, v2x, v2y);
      const d2 = this.sign(ptx, pty, v2x, v2y, v3x, v3y);
      const d3 = this.sign(ptx, pty, v3x, v3y, v1x, v1y);
      const has_neg = d1 < 0 || d2 < 0 || d3 < 0;
      const has_pos = d1 > 0 || d2 > 0 || d3 > 0;
      return !(has_neg && has_pos);
    },

    checkpoint(h, k, x, y, a, b, alpha) {
      return (Math.pow((x - h) * Math.cos(alpha) + (y - k) * Math.sin(alpha), 2) / Math.pow(a, 2)) +
             (Math.pow((x - h) * Math.sin(alpha) - (y - k) * Math.cos(alpha), 2) / Math.pow(b, 2));
    },

    checkPointOnLine(ptx, pty, v1x, v1y, v2x, v2y) {
      const m = (v2y - v1y) / (v2x - v1x);
      const angle = Math.atan(m);
      const a = Math.sqrt(Math.pow(v1x - v2x, 2) + Math.pow(v1y - v2y, 2)) / 2;
      const b = 20;
      const h = (v1x + v2x) / 2;
      const k = (v1y + v2y) / 2;
      return this.checkpoint(h, k, ptx, pty, a, b, angle);
    },
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
}

#canvas {
  border: 1px solid black;
  margin: auto;
  margin-left: 20px;
  border-radius: 15px;
}

#shapes {
  border: 1px solid black;
  display: flex;
  left: 0px;
  flex-direction: column;
}

.display {
  color: #a3a3a3;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: clip;
}
</style>