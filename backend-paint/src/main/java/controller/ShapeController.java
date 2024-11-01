package controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.painter.backendpaint.DrawEngine;
import com.painter.backendpaint.IShape;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/shapes") // Prefixing all shape-related endpoints
public class ShapeController {
    private DrawEngine engine = DrawEngine.getInstance();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/draw")
    public void drawShape(@RequestBody String shapeJson) {
        processShape(shapeJson, engine::addShape);
    }

    @PostMapping("/update")
    public void updateShape(@RequestBody String shapeJson) {
        processShape(shapeJson, engine::updateShape);
    }

    @DeleteMapping("/remove")
    public IShape removeShape(@RequestParam int id) {
        return engine.removeShape(id);
    }

    @GetMapping("/undo")
    public IShape undo() {
        return engine.undo();
    }

    @GetMapping("/redo")
    public IShape redo() {
        return engine.redo();
    }

    @PostMapping("/copy")
    public IShape copy(@RequestParam int id) {
        return engine.copyShape(id);
    }


    private void processShape(String shapeJson, ShapeProcessor processor) {
        try {
            Map<?, ?> map = objectMapper.readValue(shapeJson, Map.class);
            processor.process(map);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }


    // Functional interface for processing shapes
    @FunctionalInterface
    interface ShapeProcessor {
        void process(Map<?, ?> shapeData);
    }
}
