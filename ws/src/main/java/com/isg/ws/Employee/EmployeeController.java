package com.isg.ws.Employee;

import com.isg.ws.Employee.DTO.EmployeeDto;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Employee> create(@RequestBody EmployeeDto dto) {
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
}

