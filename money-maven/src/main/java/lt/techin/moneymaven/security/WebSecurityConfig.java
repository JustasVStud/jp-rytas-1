package lt.techin.moneymaven.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lt.techin.moneymaven.security.jwt.AuthEntryPointJwt;
import lt.techin.moneymaven.security.jwt.AuthTokenFilter;
import lt.techin.moneymaven.security.services.UserDetailsServiceImpl;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {
	@Autowired
	UserDetailsServiceImpl userDetailsService;
	
	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;
	
	@Bean
	public AuthTokenFilter autheticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
	
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		
		return authProvider;
	}
	
	@Bean
	public AuthenticationManager autheticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}
	
	@Bean PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.cors().and().csrf().disable()
        .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
        .authorizeHttpRequests().requestMatchers("/api/auth/**").permitAll()
        .requestMatchers("/api/test/**").permitAll()
        .anyRequest().authenticated();
    
    	http.authenticationProvider(authenticationProvider());

    	http.addFilterBefore(autheticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    
    return http.build();
	}
}
