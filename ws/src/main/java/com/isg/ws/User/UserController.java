package com.isg.ws.User;

import com.isg.ws.Error.ApiError;
import com.isg.ws.shared.GenericMessage;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping()
    GenericMessage cerateUser(@Valid @RequestBody User user) {
        userService.saveUser(user);
        return new GenericMessage("Kullanıcı kaydı başarılı");
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiError> handleValidationException(MethodArgumentNotValidException ex) {
        ApiError apiError = new ApiError();
        apiError.setPath("/api/trainings");
        apiError.setMessage("Validation error");
        apiError.setStatus(400);
        for (var fieldError : ex.getBindingResult().getFieldErrors()) {
            apiError.getValidationErrors().put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return ResponseEntity.badRequest().body(apiError);
    }
}


