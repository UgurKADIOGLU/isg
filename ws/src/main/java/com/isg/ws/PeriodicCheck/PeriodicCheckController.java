package com.isg.ws.PeriodicCheck;

import com.isg.ws.Error.ApiError;
import com.isg.ws.PeriodicCheck.DTO.PeriodicCheckDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/periodic-checks")
public class PeriodicCheckController {

    private final PeriodicCheckService periodicCheckService;

    public PeriodicCheckController(PeriodicCheckService periodicCheckService) {
        this.periodicCheckService = periodicCheckService;
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<PeriodicCheck> create(@Valid @RequestBody PeriodicCheckDto dto) {
        return ResponseEntity.ok(periodicCheckService.create(dto));
    }

    @PutMapping(value = "/{id}", consumes = "application/json")
    public ResponseEntity<PeriodicCheck> update(@PathVariable Long id, @RequestBody PeriodicCheckDto dto) {
        return periodicCheckService.update(id, dto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<PeriodicCheck>> list() {
        return ResponseEntity.ok(periodicCheckService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PeriodicCheck> get(@PathVariable Long id) {
        return periodicCheckService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (periodicCheckService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiError> handleValidationException(MethodArgumentNotValidException ex) {
        ApiError apiError = new ApiError();
        apiError.setPath("/api/documents");
        apiError.setMessage("Validation error");
        apiError.setStatus(400);
        for (var fieldError : ex.getBindingResult().getFieldErrors()) {
            apiError.getValidationErrors().put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return ResponseEntity.badRequest().body(apiError);
    }
}

