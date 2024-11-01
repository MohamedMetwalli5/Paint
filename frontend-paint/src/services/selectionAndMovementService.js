import axios from 'axios';

export default {
  selecting(context, event) {
    const canvas = document.getElementById("canvas");
    const rect = event.target.getBoundingClientRect();
    const borderLeft = getComputedStyle(canvas, null).getPropertyValue("border-left-width");
    const padLeft = getComputedStyle(canvas, null).getPropertyValue("padding-left");
    const borderTop = getComputedStyle(canvas, null).getPropertyValue("border-top-width");
    const padTop = getComputedStyle(canvas, null).getPropertyValue("padding-top");

    const x = event.clientX - parseFloat(borderLeft) - parseFloat(padLeft) - rect.left;
    const y = event.clientY - parseFloat(borderTop) - parseFloat(padTop) - rect.top;

    for (let i = context.shapes.length - 1; i >= 0; i--) {
      if (context.shapes[i] && context.shapes[i].type !== "null") {
        context.chooseSelect();
        let selected = false;

        switch(context.shapes[i].type) {
          case "circle":
            if (Math.sqrt(Math.pow(x - context.shapes[i].x[0], 2) + Math.pow(y - context.shapes[i].y[0], 2)) <= context.shapes[i].radius / 2) {
              selected = true;
            }
            break;

          case "line":
            if (context.checkPointOnLine(x, y, context.shapes[i].x[0], context.shapes[i].y[0], context.shapes[i].x[1], context.shapes[i].y[1]) <= 1) {
              selected = true;
            }
            break;

          case "square":
            if (x >= context.shapes[i].x[0] && x <= context.shapes[i].x[0] + context.shapes[i].side &&
                y >= context.shapes[i].y[0] && y <= context.shapes[i].y[0] + context.shapes[i].side) {
              selected = true;
            }
            break;

          case "rectangle":
            if (x >= context.shapes[i].x[0] && x <= context.shapes[i].x[0] + context.shapes[i].width &&
                y >= context.shapes[i].y[0] && y <= context.shapes[i].y[0] + context.shapes[i].height) {
              selected = true;
            }
            break;

          case "triangle":
            if (context.PointInTriangle(x, y, context.shapes[i].x[0], context.shapes[i].y[0],
                context.shapes[i].x[1], context.shapes[i].y[1], context.shapes[i].x[2], context.shapes[i].y[2])) {
              selected = true;
            }
            break;

          case "ellipse":
            if (context.checkpoint(context.shapes[i].x[0], context.shapes[i].y[0], x, y,
                context.shapes[i].radiusX / 2, context.shapes[i].radiusY / 2, context.shapes[i].rotationAngle) <= 1) {
              selected = true;
            }
            break;
        }

        if (selected) {
          context.clearCanvas();
          context.m = i;
          context.redrawCanvas(context.m);
          context.shape = context.shapes[i];
          context.workingShape = context.shapes[i];
          context.dotted = true;
          
          switch(context.shapes[i].type) {
            case "circle":
              context.Circle();
              break;
            case "line":
              context.Line();
              break;
            case "square":
              context.Square();
              break;
            case "rectangle":
              context.Rectangle();
              break;
            case "triangle":
              context.Triangle();
              break;
            case "ellipse":
              context.Ellipse();
              break;
          }
          
          break;
        }
      }
    }
    
    context.chooseDraw();
  },

  moving(context, event) {
    if (context.workingShape) {
      context.chooseMove();
      
      if (context.workingShape.type === "line" || context.workingShape.type === "triangle") {
        const x = parseFloat(context.workingShape.x[0]);
        const y = parseFloat(context.workingShape.y[0]);
        context.GetCoors(event);
        const xDiff = context.workingShape.x[0] - x;
        const yDiff = context.workingShape.y[0] - y;
        
        for (let i = 1; i < context.workingShape.x.length; i++) {
          context.workingShape.x[i] += xDiff;
          context.workingShape.y[i] += yDiff;
        }
      } else {
        context.GetCoors(event);
      }

      context.clearCanvas();
      context.redrawCanvas(context.m);
      context.shape = context.workingShape;
      
      axios.post("http://localhost:8081/update", context.shape)
        .then(response => console.log(response.data))
        .catch(e => console.log(e));

      switch(context.workingShape.type) {
        case "circle":
          context.Circle();
          break;
        case "line":
          context.Line();
          break;
        case "square":
          context.Square();
          break;
        case "rectangle":
          context.Rectangle();
          break;
        case "triangle":
          context.Triangle();
          break;
        case "ellipse":
          context.Ellipse();
          break;
      }
      
      context.chooseDraw();
      context.workingShape = null;
    }
  },

  copying(context, event) {
    if (context.workingShape) {
      context.chooseCopy();
      
      axios.get("http://localhost:8081/copy", { params: { id: context.m } })
        .then(response => {
          context.shape = response.data;
          
          if (context.shape.type !== "line" && context.shape.type !== "triangle") {
            context.shape.x = [context.shape.x];
            context.shape.y = [context.shape.y];
          }

          if (context.shape.type === "line" || context.shape.type === "triangle") {
            const x = parseFloat(context.shape.x[0]);
            const y = parseFloat(context.shape.y[0]);
            context.GetCoors(event);
            const xDiff = context.shape.x[0] - x;
            const yDiff = context.shape.y[0] - y;
            
            for (let i = 1; i < context.shape.x.length; i++) {
              context.shape.x[i] += xDiff;
              context.shape.y[i] += yDiff;
            }
          } else {
            context.GetCoors(event);
          }

          switch(context.shape.type) {
            case "circle":
              context.Circle();
              break;
            case "line":
              context.Line();
              break;
            case "square":
              context.Square();
              break;
            case "rectangle":
              context.Rectangle();
              break;
            case "triangle":
              context.Triangle();
              break;
            case "ellipse":
              context.Ellipse();
              break;
          }

          context.clearCanvas();
          context.redrawCanvas();
          context.chooseDraw();
          context.workingShape = null;
        })
        .catch(e => console.log(e));
    }
  }
};