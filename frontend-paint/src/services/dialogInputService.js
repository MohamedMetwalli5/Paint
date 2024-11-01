export default {
    DialogInput(context, input) {
      if (context.shape.type === "circle") {
        context.shape.radius = parseFloat(input) * 38;
      } else if (context.shape.type === "square") {
        context.shape.side = parseFloat(input) * 38;
      }
      
      document.getElementById("dialog-box").style.display = "none";
      
      if (context.resize) {
        context.resizeCS();
      } else {
        context.shape.type === "circle" ? context.Circle() : context.Square();
      }
    },
  
    WHDialogInput(context, width, height) {
      context.shape.width = parseFloat(width) * 38;
      context.shape.height = parseFloat(height) * 38;
      
      document.getElementById("w-h-dialog").style.display = "none";
      
      if (context.resize) {
        context.resizeCS();
      } else {
        context.Rectangle();
      }
    },
  
    EllipseDialogInput(context, radiusX, radiusY, rotationAngle) {
      context.shape.radiusX = radiusX * 38;
      context.shape.radiusY = radiusY * 38;
      context.shape.rotationAngle = (rotationAngle * Math.PI) / 180;
      document.getElementById("ellipse-dialog").style.display = "none";
      if (context.resize) {
        context.resizeCS();
      } else {
        context.Ellipse();
      }
    }
  };
