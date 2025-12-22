package com.isg.ws.Employee;

import com.isg.ws.Employee.DTO.EmployeeDto;
import com.isg.ws.Error.ApiError;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<Employee> create(@Valid @RequestBody EmployeeDto dto) {
        return ResponseEntity.ok(employeeService.create(dto));
    }

    @PutMapping(value = "/{id}", consumes = "application/json")
    public ResponseEntity<Employee> update(@PathVariable Long id, @RequestBody EmployeeDto dto) {
        return employeeService.update(id, dto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Employee>> list() {
        return ResponseEntity.ok(employeeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> get(@PathVariable Long id) {
        return employeeService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (employeeService.delete(id)) {
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

