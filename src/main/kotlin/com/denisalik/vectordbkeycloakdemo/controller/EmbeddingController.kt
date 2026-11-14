package com.denisalik.vectordbkeycloakdemo.controller

import com.denisalik.vectordbkeycloakdemo.dto.EmbeddingNewRequest
import com.denisalik.vectordbkeycloakdemo.dto.GetSimilarityMovieResponse
import com.denisalik.vectordbkeycloakdemo.dto.GetSimilarityRequest
import com.denisalik.vectordbkeycloakdemo.entity.Movie
import com.denisalik.vectordbkeycloakdemo.repository.MoviesInMemoryRepository
import com.denisalik.vectordbkeycloakdemo.service.EmbeddingService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api")
class EmbeddingController(
    private val embeddingService: EmbeddingService,
    private val repo: MoviesInMemoryRepository,
) {

    @PostMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    fun embeddingAddNew(@RequestBody embedding: EmbeddingNewRequest): ResponseEntity<Void> {
        val metadata = mapOf("title" to embedding.title, "id" to UUID.randomUUID().toString(), "overview" to embedding.text)
        embeddingService.embedAndStore(embedding.text, metadata)
        return ResponseEntity.noContent().build()
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    fun embeddingRemove(@PathVariable id: String): ResponseEntity<Void> {
        embeddingService.deleteById(id)
        return ResponseEntity.noContent().build()
    }


    @GetMapping("/")
    fun getSimilarity(@RequestBody similarity: GetSimilarityRequest) = embeddingService
        .findSimilar(similarity.text, similarity.topK, similarity.threshold)
        .map { GetSimilarityMovieResponse.fromDocument(it) }
        .let { ResponseEntity.ok(it) }

    @GetMapping("/{id}")
    fun getMovieById(@PathVariable id: String): ResponseEntity<Movie> {
        return repo
            .findById(id)
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity
                .notFound()
                .build()
    }

}