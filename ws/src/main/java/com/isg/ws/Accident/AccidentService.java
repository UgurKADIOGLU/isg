package com.isg.ws.Accident;

import com.isg.ws.Accident.DTO.AccidentDto;
import com.isg.ws.Employee.Employee;
import com.isg.ws.Employee.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccidentService {

    private final AccidentRepository accidentRepository;
    private final EmployeeRepository employeeRepository;

    public AccidentService(AccidentRepository accidentRepository, EmployeeRepository employeeRepository) {
        this.accidentRepository = accidentRepository;
        this.employeeRepository = employeeRepository;
    }

    public Optional<Accident> create(AccidentDto dto) {
        if (dto.getEmployeeId() == null) {
            return Optional.empty();
        }
        return employeeRepository.findById(dto.getEmployeeId())
                .map(employee -> accidentRepository.save(dto.toEntity(employee)));
    }

    public Optional<Accident> update(Long id, AccidentDto dto) {
        if (dto.getEmployeeId() == null) {
            return Optional.empty();
        }

        return accidentRepository.findById(id)
                .flatMap(existing -> employeeRepository.findById(dto.getEmployeeId())
                        .map(employee -> {
                            dto.updateEntity(existing, employee);
                            return accidentRepository.save(existing);
                        }));
    }

    public List<Accident> findAll() {
        return accidentRepository.findAll();
    }

    public Optional<Accident> findById(Long id) {
        return accidentRepository.findById(id);
    }

    public boolean delete(Long id) {
        if (accidentRepository.existsById(id)) {
            accidentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
