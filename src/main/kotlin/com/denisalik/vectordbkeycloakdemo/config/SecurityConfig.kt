package com.denisalik.vectordbkeycloakdemo.config

import com.denisalik.vectordbkeycloakdemo.converter.KeycloakRealmRoleConverter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfig {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http {
            csrf { disable() }
            cors { }
            sessionManagement { sessionCreationPolicy = SessionCreationPolicy.STATELESS }
            authorizeHttpRequests {
                authorize("/actuator/health", permitAll)
                authorize(anyRequest, authenticated)
            }
            oauth2ResourceServer {
                jwt { jwtAuthenticationConverter = keycloakJwtConverter() }
            }
        }
        return http.build()
    }

    @Bean
    fun corsConfigurationSource() =
        CorsConfiguration()
            .apply {
                allowedOrigins = listOf("*")
                allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")
                allowedHeaders = listOf("*")
                allowCredentials = false
                maxAge = 3600L
            }.let {
                UrlBasedCorsConfigurationSource()
                    .apply { registerCorsConfiguration("/**", it) }
            }

    private fun keycloakJwtConverter() =
        JwtAuthenticationConverter()
            .apply { setJwtGrantedAuthoritiesConverter(KeycloakRealmRoleConverter()) }
}
