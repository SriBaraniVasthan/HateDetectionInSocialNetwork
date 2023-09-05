package com.studentssocialnetwork.conf.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.auth0.jwt.JWT;
import com.google.gson.Gson;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.studentssocialnetwork.conf.constants.SecurityConstants;
import com.studentssocialnetwork.model.persistence.User;
import com.studentssocialnetwork.utils.AuthUtil;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private AuthenticationManager authManagerObj;

	public JWTAuthenticationFilter(AuthenticationManager authManager) {
		this.authManagerObj = authManager;
	}
// Referencing use of code inspired by similar approach for JWT implmentations.
//XOOR (2018). Implementing JWT with Spring Boot and Spring Security. [online] Medium. Available at: https://medium.com/@xoor/jwt-authentication-service-44658409e12c [Accessed 17 July 2023].
	@Override
	protected void successfulAuthentication(HttpServletRequest httpReq, HttpServletResponse httpRes, FilterChain chain,
			Authentication auth) throws IOException, ServletException {

		Collection<SimpleGrantedAuthority> authCollection = (Collection<SimpleGrantedAuthority>) auth.getAuthorities();
		String[] authVal = authCollection.stream().map(String::valueOf).toArray(String[]::new);
		String jwtToken = JWT.create()
				.withSubject(((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername())
				.withArrayClaim("roles", authVal)
				.withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
				.sign(HMAC512(SecurityConstants.SECRET.getBytes()));
		httpRes.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + jwtToken);
		PrintWriter out = httpRes.getWriter();
		httpRes.setContentType("application/json");
		httpRes.setCharacterEncoding("UTF-8");
		Map userCred = new HashMap();
		userCred.put("email", auth.getName());
		userCred.put("role", AuthUtil.getUserRole(auth.getAuthorities()));
		String student = new Gson().toJson(userCred);
		out.print(student);
		out.flush();
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest httpReq, HttpServletResponse httpRes)
			throws AuthenticationException {
		try {
			User cred = new ObjectMapper().readValue(httpReq.getInputStream(), User.class);

			return authManagerObj.authenticate(new UsernamePasswordAuthenticationToken(cred.getEmail(),
					cred.getPassword(), new ArrayList<>()));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}