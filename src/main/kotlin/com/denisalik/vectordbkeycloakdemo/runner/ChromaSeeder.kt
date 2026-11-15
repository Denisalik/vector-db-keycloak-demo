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
    private val batchSize = 50

    override fun run(vararg args: String) {
        log.info("*".repeat(50))
        if (!embeddingService.isCollectionPopulated()) {
            log.info("Reading movies.json...")
            val data = repo.findAll()
            log.info("Adding data to ChromaDB...")
            //used batches, to evade 413 status code, there are (907+1)*50+1*36 records
            data
                .map { Document(it.toVectorString(), it.toMetadata()) }
                .chunked(batchSize)
                .forEachIndexed { index, batch ->
                    embeddingService.embedAndStore(batch)
                    log.info("Batch $index is pushed into ChromaDB with ${batch.size} records.")
                }
        } else {
            log.info("Data already exist in ChromaDB.")
        }
        log.info("*".repeat(50))
    }
}