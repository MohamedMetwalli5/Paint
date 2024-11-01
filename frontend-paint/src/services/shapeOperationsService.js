import axios from 'axios';

export default {
    Color(context, c) {
      context.currentColor = c;
      context.coloring();
    },
  
    coloring(context) {
      console.log("Entering coloring method");
      if (context.workingShape) {
        console.log("Working shape found:", context.workingShape);
        context.chooseMove();
        context.workingShape.color = context.currentColor;
        context.clearCanvas();
        context.redrawCanvas(context.m);
        context.shape = context.workingShape;
  
        axios.post("http://localhost:8081/update", context.shape)
          .then(response => console.log("Update response:", response.data))
          .catch(e => console.log("Error updating shape:", e));
  
        switch (context.workingShape.type) {
          case "circle":
            console.log("Drawing circle");
            context.Circle();
            break;
          case "square":
            console.log("Drawing square");
            context.Square();
            break;
          case "rectangle":
            console.log("Drawing rectangle");
            context.Rectangle();
            break;
          case "triangle":
            console.log("Drawing triangle");
            context.Triangle();
            break;
          case "ellipse":
            console.log("Drawing ellipse");
            context.Ellipse();
            break;
        }
  
        context.chooseDraw();
        context.workingShape = null;
      } else {
        console.log("No working shape found");
      }
    },
  
    resizeCS(context) {
      context.clearCanvas();
      context.redrawCanvas(context.m);
      context.shape = context.shapes[context.m];
  
      axios.post("http://localhost:8081/update", context.shape)
        .then(response => console.log(response.data))
        .catch(e => console.log(e));
  
      switch (context.shape.type) {
        case "circle":
          context.Circle();
          break;
        case "square":
          context.Square();
          break;
        case "rectangle":
          context.Rectangle();
          break;
        case "ellipse":
          context.Ellipse();
          break;
      }
  
      context.chooseDraw();
      context.workingShape = null;
      context.resize = false;
    },
  
    resizing(context) {
      if (context.workingShape) {
        const canvas = document.getElementById("canvas");
        const rect = canvas.getBoundingClientRect();
        context.shape = context.workingShape;
        context.resize = true;
  
        const dialog = document.getElementById("dialog-box");
        const whdialog = document.getElementById("w-h-dialog");
        const ellipsedialog = document.getElementById("ellipse-dialog");
  
        switch (context.workingShape.type) {
          case "circle":
          case "square":
            dialog.style.display = "block";
            dialog.style.left = rect.left + 450 + "px";
            dialog.style.top = rect.top + 200 + "px";
            whdialog.style.display = "none";
            ellipsedialog.style.display = "none";
            break;
  
          case "rectangle":
            whdialog.style.display = "block";
            whdialog.style.left = rect.left + 450 + "px";
            whdialog.style.top = rect.top + 200 + "px";
            dialog.style.display = "none";
            ellipsedialog.style.display = "none";
            break;
  
          case "ellipse":
            ellipsedialog.style.display = "block";
            ellipsedialog.style.left = rect.left + 450 + "px";
            ellipsedialog.style.top = rect.top + 200 + "px";
            dialog.style.display = "none";
            whdialog.style.display = "none";
            break;
        }
      }
    },

    Undo(context) {
        axios.get("http://localhost:8081/undo")
        .then(response => {
            context.shape = response.data;
            if (context.shape && context.shape !== "") {
            if (context.shape.type !== "line" && context.shape.type !== "triangle") {
                context.shape.x = [context.shape.x];
                context.shape.y = [context.shape.y];
            }
            context.shapes[context.shape.id] = context.shape;
            }
            context.clearCanvas();
            context.redrawCanvas();
        })
        .catch(e => {
            console.log("This is the undo error");
            console.log(e);
        });
    },

    Redo(context) {
        axios.get("http://localhost:8081/redo")
        .then(response => {
            context.shape = response.data;
            console.log(response.data);
            if (context.shape.type != null) {
            if (context.shape.type !== "line" && context.shape.type !== "triangle") {
                context.shape.x = [context.shape.x];
                context.shape.y = [context.shape.y];
            }
            context.shapes[context.shape.id] = context.shape;
            }
            context.clearCanvas();
            context.redrawCanvas();
        })
        .catch(e => {
            console.log("This is the redo error");
            console.log(e);
        });
    },

    deleting(context) {
        axios.get("http://localhost:8081/remove", {
        params: { id: context.m }
        })
        .then(response => {
            console.log(response);
            context.shapes[context.m] = response.data;
            context.clearCanvas();
            context.redrawCanvas();
            context.chooseDraw();
            context.workingShape = null;
        })
        .catch(e => console.log(e));
    }

  };