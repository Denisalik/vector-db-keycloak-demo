package com.denisalik.vectordbkeycloakdemo.dto

data class MeResponse(
    val userId: String,
    val username: String,
    val email: String?,
    val authorities: List<String>,
)
