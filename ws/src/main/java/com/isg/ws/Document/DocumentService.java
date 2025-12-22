package com.isg.ws.Document;

import com.isg.ws.Document.DTO.DocumentDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public Optional<Document> create(DocumentDto dto) {
        try {
            Document saved = documentRepository.save(dto.toEntity());
            return Optional.of(saved);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Document> update(Long id, DocumentDto dto) {
        return documentRepository.findById(id)
                .map(existing -> {
                    dto.updateEntity(existing);
                    return documentRepository.save(existing);
                });
    }

    public List<Document> findAll() {
        return documentRepository.findAll();
    }

    public Optional<Document> findById(Long id) {
        return documentRepository.findById(id);
    }

    public boolean delete(Long id) {
        if (documentRepository.existsById(id)) {
            documentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

