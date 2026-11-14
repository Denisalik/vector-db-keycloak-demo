package com.denisalik.vectordbkeycloakdemo.runner

import com.denisalik.vectordbkeycloakdemo.repository.MoviesInMemoryRepository
import com.denisalik.vectordbkeycloakdemo.service.EmbeddingService
import org.slf4j.LoggerFactory
import org.springframework.ai.document.Document
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class ChromaSeeder(
    private val embeddingService: EmbeddingService,
    private val repo: MoviesInMemoryRepository
): CommandLineRunner {
    private val log = LoggerFactory.getLogger(ChromaSeeder::class.java)

    override fun run(vararg args: String) {
        log.info("*".repeat(50))
        if (!embeddingService.isCollectionPopulated()) {
            log.info("Reading movies.json...")
            val data = repo.findAll()
            log.info("Adding data to ChromaDB...")
            data
                .map { Document(it.toVectorString(), it.toMetadata()) }
                .let { embeddingService.embedAndStore(it) }
        } else {
            log.info("Data already exist in ChromaDB.")
        }
        log.info("*".repeat(50))
    }
}