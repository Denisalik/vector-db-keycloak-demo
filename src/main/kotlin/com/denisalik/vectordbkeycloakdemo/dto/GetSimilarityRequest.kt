package com.denisalik.vectordbkeycloakdemo.dto

data class GetSimilarityRequest(
    val text: String,
    val topK: Int?,
    val threshold: Double?,
)
