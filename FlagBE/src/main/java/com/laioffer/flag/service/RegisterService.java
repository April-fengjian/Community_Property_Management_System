package com.laioffer.flag.service;

import com.laioffer.flag.exception.UserAlreadyExistException;
import com.laioffer.flag.model.Authority;
import com.laioffer.flag.model.Unit;
import com.laioffer.flag.model.UserRole;
import com.laioffer.flag.model.User;
import com.laioffer.flag.repository.AuthorityRepository;
import com.laioffer.flag.repository.UnitRepository;
import com.laioffer.flag.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegisterService {
    private UserRepository userRepository;
    private AuthorityRepository authorityRepository;
    private PasswordEncoder passwordEncoder;

    private UnitRepository unitRepository;

    @Autowired
    public RegisterService(UserRepository userRepository, AuthorityRepository authorityRepository, PasswordEncoder passwordEncoder, UnitRepository unitRepository) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.passwordEncoder = passwordEncoder;
        this.unitRepository = unitRepository;
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void add(User user, UserRole role) {
        if (userRepository.existsById(user.getUsername())) {
            throw new UserAlreadyExistException("User already exists.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(true);
//        Long unitId = (long)5020;
//        if (unitRepository.findById(unitId).orElse(null) == null) {
//            unitRepository.save(new Unit.Builder().setId(unitId).build());
//        }
//        user.setUnit(unitRepository.findById(unitId).orElse(null));
        userRepository.save(user);
        authorityRepository.save(new Authority(user.getUsername(), role.name()));
    }
}
