package shapes;

import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.painter.backendpaint.IShape;
import com.painter.backendpaint.MultiplePointsShape;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Map;

@SuppressWarnings({"unchecked","unused"})
@JsonTypeName("Line")
public class Line extends MultiplePointsShape {
   public Line(){
       setType("line");
   }
    public void draw(Map<?,?> map){
        setId((int)map.get("id"));
        setColor((String)map.get("color"));
        setX((((ArrayList<Number>)map.get("x")).toArray(new Number[2])));
        setY((((ArrayList<Number>)map.get("y")).toArray(new Number[2])));

    }
    @Override
        public IShape clone(){
            Line shape=new Line();
            shape.setX(this.getX());
            shape.setY(this.getY());
            shape.setColor(this.getColor());
            return shape;
    }
    

}