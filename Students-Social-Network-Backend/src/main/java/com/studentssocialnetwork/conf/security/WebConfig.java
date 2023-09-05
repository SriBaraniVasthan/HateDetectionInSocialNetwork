package com.studentssocialnetwork.conf.security;

import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("development")
public class WebConfig implements WebMvcConfigurer {

}
