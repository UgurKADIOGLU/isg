package com.isg.ws.Employee;

import com.isg.ws.Employee.DTO.EmployeeDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee create(EmployeeDto dto) {
        return employeeRepository.save(dto.toEntity());
    }

    public Optional<Employee> update(Long id, EmployeeDto dto) {
        return employeeRepository.findById(id)
                .map(existing -> {
                    dto.updateEntity(existing);
                    return employeeRepository.save(existing);
                });
    }

    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> findById(Long id) {
        return employeeRepository.findById(id);
    }

    public boolean delete(Long id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

