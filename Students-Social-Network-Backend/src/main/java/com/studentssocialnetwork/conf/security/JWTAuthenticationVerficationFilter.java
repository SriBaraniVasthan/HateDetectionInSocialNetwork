package com.studentssocialnetwork.conf.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.studentssocialnetwork.conf.constants.SecurityConstants;
import java.io.IOException;
import java.util.List;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

@Component
public class JWTAuthenticationVerficationFilter extends BasicAuthenticationFilter {

	public JWTAuthenticationVerficationFilter(AuthenticationManager authManager) {
		super(authManager);
	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest httpReq) {
		String jwtToken = httpReq.getHeader(SecurityConstants.HEADER_STRING);
		if (jwtToken != null) {
			DecodedJWT decodedJwtToken = JWT.require(HMAC512(SecurityConstants.SECRET.getBytes())).build()
					.verify(jwtToken.replace(SecurityConstants.TOKEN_PREFIX, ""));
			String userSigned = decodedJwtToken.getSubject();
			List<SimpleGrantedAuthority> auths = decodedJwtToken.getClaims().get("roles")
					.asList(SimpleGrantedAuthority.class);
			if (userSigned != null) {
				return new UsernamePasswordAuthenticationToken(userSigned, null, auths);
			}
			return null;
		}
		return null;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest httpReq, HttpServletResponse httpRes, FilterChain filter)
			throws IOException, ServletException {
		String reqHeader = httpReq.getHeader(SecurityConstants.HEADER_STRING);

		if (reqHeader == null || !reqHeader.startsWith(SecurityConstants.TOKEN_PREFIX)) {
			filter.doFilter(httpReq, httpRes);
			return;
		}

		UsernamePasswordAuthenticationToken auth = getAuthentication(httpReq);

		SecurityContextHolder.getContext().setAuthentication(auth);
		filter.doFilter(httpReq, httpRes);
	}
}
