package com.isg.ws.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;


@ConfigurationProperties(prefix = "isg")
@Configuration
@Component
public class IsgProperties {
    private Email email;

    private Clint clint;

    public static record Email(
            String username,
            String password,
            String from,
            String host,
            int port
    ) {

    }

    public static record Clint(
            String host
    ) {

    }

    public Email getEmail() {
        return email;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public Clint getClint() {
        return clint;
    }

    public void setClint(Clint clint) {
        this.clint = clint;
    }
}
