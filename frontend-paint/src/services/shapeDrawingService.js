import axios from 'axios';

export default {
  Circle(context) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    ctx.beginPath();
    ctx.arc(context.shape.x[0], context.shape.y[0], context.shape.radius, 0, Math.PI * 2);
    
    if (context.dotted) {
      ctx.setLineDash([5, 5]);
      context.dotted = false;
    }
    
    ctx.stroke();
    ctx.fillStyle = context.shape.color;
    ctx.fill();
    ctx.setLineDash([]);

    if (context.redraw !== true && context.resizing !== true && (context.draw === true || context.copy === true)) {
      context.shape.id = context.counter++;
      context.shapes.push(context.shape);
      context.redraw = false;
      
      axios.post("http://localhost:8081/draw", context.shape)
        .then(response => console.log(response.data))
        .catch(e => console.log(e));
    }
    
    context.shape = null;
  },

  Line(context) {
    if (context.shape.x.length === 2) {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      
      ctx.beginPath();
      ctx.moveTo(context.shape.x[0], context.shape.y[0]);
      ctx.lineTo(context.shape.x[1], context.shape.y[1]);
      
      if (context.dotted) {
        ctx.setLineDash([5, 5]);
        context.dotted = false;
      }
      
      ctx.stroke();
      ctx.setLineDash([]);

      if (context.redraw !== true && (context.draw === true || context.copy === true)) {
        context.shape.id = context.counter++;
        context.shapes.push(context.shape);
        context.redraw = false;
        
        axios.post("http://localhost:8081/draw", context.shape)
          .then(response => console.log(response.data))
          .catch(e => console.log(e));
      }
      
      context.shape = null;
    }
  },

  Rectangle(context) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    ctx.beginPath();
    ctx.rect(context.shape.x[0], context.shape.y[0], context.shape.width, context.shape.height);
    
    if (context.dotted) {
      ctx.setLineDash([5, 5]);
      context.dotted = false;
    }
    
    ctx.stroke();
    ctx.fillStyle = context.shape.color;
    ctx.fill();
    ctx.setLineDash([]);

    if (context.redraw !== true && (context.draw === true || context.copy === true)) {
      context.shape.id = context.counter++;
      context.shapes.push(context.shape);
      context.redraw = false;
      
      axios.post("http://localhost:8081/draw", context.shape)
        .then(response => console.log(response.data))
        .catch(e => console.log(e));
    }
    
    context.shape = null;
  },

  Square(context) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    ctx.beginPath();
    ctx.rect(context.shape.x[0], context.shape.y[0], context.shape.side, context.shape.side);
    
    if (context.dotted) {
      ctx.setLineDash([5, 5]);
      context.dotted = false;
    }
    
    ctx.stroke();
    ctx.fillStyle = context.shape.color;
    ctx.fill();
    ctx.setLineDash([]);

    if (context.redraw !== true && (context.draw === true || context.copy === true)) {
      context.shape.id = context.counter++;
      context.shapes.push(context.shape);
      context.redraw = false;
      
      axios.post("http://localhost:8081/draw", context.shape)
        .then(response => console.log(response.data))
        .catch(e => console.log(e));
    }
    
    context.shape = null;
  },

  Triangle(context) {
    if (context.shape.x.length === 3) {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      
      ctx.beginPath();
      ctx.moveTo(context.shape.x[0], context.shape.y[0]);
      ctx.lineTo(context.shape.x[1], context.shape.y[1]);
      ctx.lineTo(context.shape.x[2], context.shape.y[2]);
      ctx.lineTo(context.shape.x[0], context.shape.y[0]);
      
      if (context.dotted) {
        ctx.setLineDash([5, 5]);
        context.dotted = false;
      }
      
      ctx.stroke();
      ctx.fillStyle = context.shape.color;
      ctx.fill();
      ctx.setLineDash([]);

      if (context.redraw !== true && (context.draw === true || context.copy === true)) {
        context.shape.id = context.counter++;
        context.shapes.push(context.shape);
        context.redraw = false;
        
        axios.post("http://localhost:8081/draw", context.shape)
          .then(response => console.log(response.data))
          .catch(e => console.log(e));
      }
      
      context.shape = null;
    }
  },

  Ellipse(context) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    ctx.beginPath();
    ctx.ellipse(
      context.shape.x[0],
      context.shape.y[0],
      context.shape.radiusX,
      context.shape.radiusY,
      context.shape.rotationAngle,
      0,
      2 * Math.PI
    );
    
    if (context.dotted) {
      ctx.setLineDash([5, 5]);
      context.dotted = false;
    }
    
    ctx.stroke();
    ctx.fillStyle = context.shape.color;
    ctx.fill();
    ctx.setLineDash([]);

    if (context.redraw !== true && (context.draw === true || context.copy === true)) {
      context.shape.id = context.counter++;
      context.shapes.push(context.shape);
      context.redraw = false;
      
      axios.post("http://localhost:8081/draw", context.shape)
        .then(response => console.log(response.data))
        .catch(e => console.log(e));
    }
    
    context.shape = null;
  }
};