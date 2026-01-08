package com.isg.ws.User.Exception;

import com.isg.ws.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class ActivationNotificationException extends RuntimeException{
    public ActivationNotificationException() {
        super(Messages.getMesssageForLocale("activation.notification.exception", LocaleContextHolder.getLocale()));
    }
}
