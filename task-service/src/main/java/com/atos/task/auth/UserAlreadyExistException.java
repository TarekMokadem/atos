package com.atos.task.auth;

public class UserAlreadyExistException extends RuntimeException  {
    public UserAlreadyExistException(String message) {
        super(message);
    }
}
