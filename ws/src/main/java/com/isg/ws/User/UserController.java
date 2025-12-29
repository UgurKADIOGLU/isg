package com.isg.ws.User;

import com.isg.ws.Error.ApiError;
import com.isg.ws.Exception.NotUniqueEmailException;
import com.isg.ws.User.DTO.UserDTO;
import com.isg.ws.shared.GenericMessage;
import com.isg.ws.shared.Messages;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping()
    GenericMessage cerateUser(@Valid @RequestBody UserDTO userDTO) {
        userService.saveUser(userDTO.toEntity());
        String message = Messages.getMesssageForLocale("hoaxify.user.create.success", LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiError> handleValidationException(MethodArgumentNotValidException ex) {
        ApiError apiError = new ApiError();
        apiError.setPath("/api/users");
        apiError.setMessage(ex.getMessage());
        apiError.setStatus(400);
        for (var fieldError : ex.getBindingResult().getFieldErrors()) {
            apiError.getValidationErrors().put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return ResponseEntity.badRequest().body(apiError);
    }
    @ExceptionHandler(NotUniqueEmailException.class)
    ResponseEntity<ApiError> handleNotUniqueEmailException(NotUniqueEmailException ex) {
        ApiError apiError = new ApiError();
        apiError.setPath("/api/users");
        apiError.setMessage(ex.getMessage());
        apiError.setStatus(400);
        apiError.setValidationErrors(ex.getValidationErrors());
        return ResponseEntity.badRequest().body(apiError);
    }


}


