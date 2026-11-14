package com.denisalik.vectordbkeycloakdemo.dto

import org.springframework.ai.document.Document

data class GetSimilarityMovieResponse(
    val metadata: Map<String, Any>,
    val score: Double?,
    val text: String?,
) {
    companion object {
        fun fromDocument(doc: Document) = GetSimilarityMovieResponse(doc.metadata, doc.score, doc.text)
    }
}
