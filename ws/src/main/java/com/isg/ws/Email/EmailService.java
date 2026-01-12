package com.isg.ws.Email;

import com.isg.ws.User.User;
import com.isg.ws.configuration.IsgProperties;
import com.isg.ws.shared.Messages;
import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.mail.SimpleMailMessage;

import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailService {
    @Autowired
    IsgProperties props;

    JavaMailSenderImpl mailSender;

    @PostConstruct
    public void initialize() {
        this.mailSender = new JavaMailSenderImpl();
        mailSender.setHost(props.getEmail().host());
        mailSender.setPort(props.getEmail().port());
        mailSender.setUsername(props.getEmail().username());
        mailSender.setPassword(props.getEmail().password());
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.starttls.enable", "true");

    }

    String activationEmailTemplate = """
            <html>
            <body>
            <h3>"${title}"</h3>
            <a href="${url}">${clickhere}</a>
            </body>
            </html>
            """;

    public void sendActivationEmail(String email, String activationToken) {
        var activationLink = props.getClint().host() + "/api/1.0/users/token/" + activationToken;

        var title = Messages.getMesssageForLocale("activation.email.title", LocaleContextHolder.getLocale());
        var clickhere = Messages.getMesssageForLocale("activation.email.clickhere", LocaleContextHolder.getLocale());
        var mailBody = activationEmailTemplate.replace("${url}", activationLink).replace("${title}", title).replace("${clickhere}", clickhere);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mailMessage = new MimeMessageHelper(mimeMessage,"UTF-8");

        try {
            mailMessage.setFrom(props.getEmail().from());
            mailMessage.setTo(email);
            mailMessage.setSubject(title);
            mailMessage.setText(mailBody, true);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        this.mailSender.send(mimeMessage);

        // mailSender.send(mailMessage); // Uncomment this line when mailSender is configured
    }

}
