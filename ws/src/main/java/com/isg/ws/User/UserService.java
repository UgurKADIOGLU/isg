package com.isg.ws.User;

import com.isg.ws.Email.EmailService;
import com.isg.ws.User.Exception.ActivationNotificationException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Properties;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    EmailService emailService;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional(rollbackOn = MailException.class)
    public void saveUser(User user) {
        try {
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setActivationToken(UUID.randomUUID().toString());
            user.setPassword(encodedPassword);
            userRepository.saveAndFlush(user);
            emailService.sendActivationEmail(user.getEmail(), user.getActivationToken());
        }catch (MailException ex){
            throw new ActivationNotificationException();
        }

    }


}
