package com.isg.ws.User.DTO;

import com.isg.ws.Role.Role;
import com.isg.ws.User.User;
import com.isg.ws.User.validation.UniqueEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Set;

public class UserDTO {

    @NotBlank(message = "{hoaxify.constraints.username.notblank}")
    private String username;

    //@Email
    @NotBlank
    @UniqueEmail
    private String email;

    private String password;


    private Set<Role> role;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Role> getRole() {
        return role;
    }

    public void setRole(Set<Role> role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User toEntity() {
        User user = new User();
user.setPassword(this.password);
        user.setUsername(this.username);
        user.setEmail(this.email);
        user.setRole(this.role);
        return user;
    }

    public void updateEntity(User user) {

        user.setUsername(this.username);
        user.setEmail(this.email);
        user.setRole(this.role);
    }
}
