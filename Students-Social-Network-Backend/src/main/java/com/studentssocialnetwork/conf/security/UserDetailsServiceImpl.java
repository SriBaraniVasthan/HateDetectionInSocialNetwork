package com.studentssocialnetwork.conf.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.studentssocialnetwork.model.persistence.User;
import com.studentssocialnetwork.model.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {

		User userObj = userRepository.findUserByEmailIgnoreCase(name)
				.orElseThrow(() -> new UsernameNotFoundException(name));
		return new org.springframework.security.core.userdetails.User(userObj.getEmail(), userObj.getPassword(),
				userObj.isEnabled(), true, true, userObj.isAccountNonLocked(), userObj.getAuthorities());
	}
}