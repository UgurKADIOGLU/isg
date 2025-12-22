package com.isg.ws.Document;

import com.isg.ws.Document.DTO.DocumentDto;
import com.isg.ws.Error.ApiError;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<Document> create(@Valid @RequestBody DocumentDto dto) {
        return documentService.create(dto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }


    @PutMapping(value = "/{id}", consumes = "application/json")
    public ResponseEntity<Document> update(@PathVariable Long id, @Valid @RequestBody DocumentDto dto) {
        return documentService.update(id, dto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Document>> list() {
        return ResponseEntity.ok(documentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Document> get(@PathVariable Long id) {
        return documentService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (documentService.delete(id)) {
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
