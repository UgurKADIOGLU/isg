// src/main/java/com/isg/ws/Accident/AccidentController.java
package com.isg.ws.Accident;

import com.isg.ws.Accident.DTO.AccidentDto;
import com.isg.ws.Employee.Employee;
import com.isg.ws.Employee.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accidents")
public class AccidentController {

    private final AccidentRepository accidentRepository;
    private final EmployeeRepository employeeRepository;

    public AccidentController(AccidentRepository accidentRepository, EmployeeRepository employeeRepository) {
        this.accidentRepository = accidentRepository;
        this.employeeRepository = employeeRepository;
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<Void> create(@RequestBody AccidentDto dto) {
        Accident a = new Accident();
        a.setTarih(dto.getTarih());
        a.setAciklama(dto.getAciklama());
        a.setFotoUrl(dto.getFotoUrl());
        a.setKokNedenAnalizi(dto.getKokNedenAnalizi());

        if (dto.getEmployeeId() != null) {
            Optional<Employee> emp = employeeRepository.findById(dto.getEmployeeId());
            if (emp.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            a.setEmployee(emp.get());
        }

        accidentRepository.save(a);
        return ResponseEntity.noContent().build(); // 204
    }

    @GetMapping
    public List<Accident> list() {
        return accidentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accident> get(@PathVariable Long id) {
        return accidentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

