package com.laioffer.flag.controller;

import com.laioffer.flag.model.Authority;
import com.laioffer.flag.model.User;
import com.laioffer.flag.model.UserRole;
import com.laioffer.flag.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {
    private RegisterService registerService;

    @Autowired
    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping("/register/tenant")
    public void addTenant(@RequestBody User user) {
        registerService.add(user, UserRole.ROLE_TENANT);
    }

    @PostMapping("/register/manager")
    public void addManager(@RequestBody User user) {
        registerService.add(user, UserRole.ROLE_MANAGER);
    }

    @PostMapping("/register/provider")
    public void addProvider(@RequestBody User user) {
        registerService.add(user, UserRole.ROLE_PROVIDER);
    }
}
