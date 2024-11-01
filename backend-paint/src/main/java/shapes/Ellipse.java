package shapes;

import java.util.ArrayList;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.painter.backendpaint.IShape;
import com.painter.backendpaint.OnePointShape;


@SuppressWarnings({"unchecked"})
@JsonTypeName("Ellipse")
public class Ellipse extends OnePointShape {
    
    public Ellipse(){
        setType("ellipse");
    }
    Number radiusX;
    Number radiusY;
    Number rotationAngle;
    
    public Number getRadiusX() {
        return radiusX;
    }

    public void setRadiusX(Number radiusX) {
        this.radiusX = radiusX;
    }

    public Number getRadiusY() {
        return radiusY;
    }

    public void setRadiusY(Number radiusY) {
        this.radiusY = radiusY;
    }

    public Number getRotationAngle() {
        return rotationAngle;
    }

    public void setRotationAngle(Number rotationAngle) {
        this.rotationAngle = rotationAngle;
    }

   
    public void draw(Map<?,?> map){
        setRadiusX((Number)map.get("radiusX"));
        setRadiusY((Number) map.get("radiusY"));
        setId((int)map.get("id"));
        setColor((String)map.get("color"));
        setX(((ArrayList<Number>) map.get("x")).get(0));
        setY(((ArrayList<Number>)map.get("y")).get(0));
        setRotationAngle((Number) map.get("rotationAngle"));
    }
    @Override
    public IShape clone(){
        Ellipse shape=new Ellipse();
        shape.setColor(this.getColor());
        shape.setX(this.getX());
        shape.setY(this.getY());
        shape.setRadiusX(this.getRadiusX());
        shape.setRadiusY(this.getRadiusY());
        shape.setRotationAngle(this.getRotationAngle());
        return shape;
    }
    
    
}
