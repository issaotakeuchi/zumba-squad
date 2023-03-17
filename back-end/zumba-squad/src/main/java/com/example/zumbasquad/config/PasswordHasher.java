package com.example.zumbasquad.config;

import org.springframework.context.annotation.Configuration;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Configuration
public class PasswordHasher {
    public static String hashPassword(String password) throws NoSuchAlgorithmException{
        MessageDigest md = MessageDigest.getInstance("SHA-256");

        byte[] hash = md.digest(password.getBytes());

        StringBuilder sb = new StringBuilder();
        for (byte b: hash){
            sb.append(String.format("%02x, b"));
        }
        return sb.toString();
    }
}
