package shapes;

import java.util.ArrayList;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.painter.backendpaint.IShape;
import com.painter.backendpaint.OnePointShape;


@SuppressWarnings("unchecked")
@JsonTypeName("Circle")
public class Circle extends OnePointShape {
    
    public Circle(){
        setType("circle");
    }
    Number radius;
    
    
    public Number getRadius() {
        return radius;
    }

    public void setRadius(Number radius) {
        this.radius = radius;
    }
    public void draw(Map<?,?> map){
        setRadius((Number)map.get("radius"));
        setId((int)map.get("id"));
        setColor((String)map.get("color"));
        setX(((ArrayList<Number>) map.get("x")).get(0));
        setY(((ArrayList<Number>)map.get("y")).get(0));
    }
    @Override
    public IShape clone()  {
        Circle shape=new Circle();
        shape.setRadius(this.getRadius());
        shape.setColor(this.getColor());
        shape.setX(this.getX());
        shape.setY(this.getY());
        return shape;
    }
    
}
