package com.isg.ws.User;

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

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional(rollbackOn = MailException.class)
    public void saveUser(User user) {
        try {
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setActivationToken(UUID.randomUUID().toString());
            user.setPassword(encodedPassword);
            userRepository.saveAndFlush(user);
            sendActivationEmail(user);
        }catch (MailException ex){
            throw new ActivationNotificationException();
        }

    }

    private void sendActivationEmail(User user) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("ugrkadioglu@gmail.com");
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Account Activation");
        mailMessage.setText("http://localhost:5173/activation/" + user.getActivationToken());
        getMailSender().send(mailMessage);
        // mailSender.send(mailMessage); // Uncomment this line when mailSender is configured
    }
    public JavaMailSender getMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.ethereal.email");
        mailSender.setPort(587);
        mailSender.setUsername("garnett35@ethereal.email");
        mailSender.setPassword("F9YeYP1pHcJ7NncmMy-");
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.starttls.enable", "true");
        return mailSender;
    }
}
