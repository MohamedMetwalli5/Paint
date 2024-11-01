package shapes;

import java.util.ArrayList;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.painter.backendpaint.IShape;
import com.painter.backendpaint.OnePointShape;


@SuppressWarnings({"unchecked"})
@JsonTypeName("Square")
public class Square extends OnePointShape{
    public Square(){
        setType("square");
    }
    Number side;    

    public Number getSide() {
        return side;
    }

    public void setSide(Number side) {
        this.side = side;
    }

    
    public void draw(Map<?,?> map){
        setId((int)map.get("id"));
        setColor((String)map.get("color"));
        setX(((ArrayList<Number>)map.get("x")).get(0));
        setY(((ArrayList<Number>)map.get("y")).get(0));
        setSide((Number) map.get("side"));
    }
    @Override
    public IShape clone(){
        Square shape=new Square();
        shape.setColor(this.getColor());
        shape.setX(this.getX());
        shape.setY(this.getY());
        shape.setSide(this.getSide());
        return shape;
    }
    

}
