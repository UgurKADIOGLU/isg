package com.isg.ws.User;

import com.isg.ws.shared.GenericMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/user")
    GenericMessage cerateUser(@RequestBody User user) {
        userService.saveUser(user);
        return new GenericMessage("Kullanıcı kaydı başarılı");
    }
}


