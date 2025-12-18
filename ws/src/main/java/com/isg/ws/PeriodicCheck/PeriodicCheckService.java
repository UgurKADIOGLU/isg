package com.isg.ws.PeriodicCheck;

import com.isg.ws.PeriodicCheck.DTO.PeriodicCheckDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PeriodicCheckService {

    private final PeriodicCheckRepository periodicCheckRepository;

    public PeriodicCheckService(PeriodicCheckRepository periodicCheckRepository) {
        this.periodicCheckRepository = periodicCheckRepository;
    }

    public PeriodicCheck create(PeriodicCheckDto dto) {
        return periodicCheckRepository.save(dto.toEntity());
    }

    public Optional<PeriodicCheck> update(Long id, PeriodicCheckDto dto) {
        return periodicCheckRepository.findById(id)
                .map(existing -> {
                    dto.updateEntity(existing);
                    return periodicCheckRepository.save(existing);
                });
    }

    public List<PeriodicCheck> findAll() {
        return periodicCheckRepository.findAll();
    }

    public Optional<PeriodicCheck> findById(Long id) {
        return periodicCheckRepository.findById(id);
    }

    public boolean delete(Long id) {
        if (periodicCheckRepository.existsById(id)) {
            periodicCheckRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

