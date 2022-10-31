package com.laioffer.flag.controller;

import com.laioffer.flag.model.Token;
import com.laioffer.flag.model.User;
import com.laioffer.flag.model.UserRole;
import com.laioffer.flag.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    private AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/authenticate/tenant")
    public Token authenticateTenant(@RequestBody User user) {
        return authenticationService.authenticate(user, UserRole.ROLE_TENANT);
    }

    @PostMapping("/authenticate/manager")
    public Token authenticateManager(@RequestBody User user) {
        return authenticationService.authenticate(user, UserRole.ROLE_MANAGER);
    }

    @PostMapping("/authenticate/provider")
    public Token authenticateProvider(@RequestBody User user) {
        return authenticationService.authenticate(user, UserRole.ROLE_PROVIDER);
    }

}
