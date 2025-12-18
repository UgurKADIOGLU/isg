package com.isg.ws.Accident;

import com.isg.ws.Accident.DTO.AccidentDto;
import com.isg.ws.Error.ApiError;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accidents")
public class AccidentController {

    private final AccidentService accidentService;

    public AccidentController(AccidentService accidentService) {
        this.accidentService = accidentService;
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<Accident> create(@Valid @RequestBody AccidentDto dto) {
        return accidentService.create(dto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping(value = "/{id}", consumes = "application/json")
    public ResponseEntity<Accident> update(@PathVariable Long id, @RequestBody AccidentDto dto) {
        return accidentService.update(id, dto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Accident>> list() {
        return ResponseEntity.ok(accidentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accident> get(@PathVariable Long id) {
        return accidentService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (accidentService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiError> handleValidationException(MethodArgumentNotValidException ex) {
        ApiError apiError = new ApiError();
        apiError.setPath("/api/accidents");
        apiError.setMessage("Validation error");
        apiError.setStatus(400);
        for (var fieldError : ex.getBindingResult().getFieldErrors()) {
            apiError.getValidationErrors().put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return ResponseEntity.badRequest().body(apiError);
    }
}

