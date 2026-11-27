package com.denisalik.vectordbkeycloakdemo.controller

import com.denisalik.vectordbkeycloakdemo.dto.MeResponse
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthController {
    @GetMapping("/me")
    fun me(
        @AuthenticationPrincipal jwt: Jwt,
        auth: Authentication,
    ) = MeResponse(
        userId = jwt.subject ?: throw IllegalStateException("JWT missing required subject"),
        username = jwt.getClaim("preferred_username") ?: throw IllegalStateException("JWT missing required preferred_username claim"),
        email = jwt.getClaim("email"),
        authorities = auth.authorities.mapNotNull { it.authority },
    ).let { ResponseEntity.ok(it) }
}
