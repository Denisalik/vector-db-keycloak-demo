package com.denisalik.vectordbkeycloakdemo.service

import org.springframework.ai.chroma.vectorstore.ChromaApi
import org.springframework.ai.chroma.vectorstore.common.ChromaApiConstants
import org.springframework.ai.document.Document
import org.springframework.ai.vectorstore.SearchRequest
import org.springframework.ai.vectorstore.VectorStore
import org.springframework.ai.vectorstore.filter.FilterExpressionBuilder
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class EmbeddingService(
    private val vectorStore: VectorStore,
    private val chromaApi: ChromaApi,
    @Value($$"${spring.ai.vectorstore.chroma.collection-name}")
    private val collection: String,
) {
    private val tenant = ChromaApiConstants.DEFAULT_TENANT_NAME
    private val database = ChromaApiConstants.DEFAULT_DATABASE_NAME
    private val collectionId =
        chromaApi
            .getCollection(tenant, database, collection)
            ?.id
            ?: throw Exception("Collection $collection not found")

    /**
     * Accept text, automatically generate embedding via Ollama, and store in ChromaDB
     */
    fun embedAndStore(
        text: String,
        metadata: Map<String, String>,
    ) = embedAndStore(Document(text, metadata))

    fun embedAndStore(document: Document) = embedAndStore(listOf(document))

    fun embedAndStore(documents: List<Document>) = vectorStore.add(documents)

    fun deleteById(id: String) {
        val filter = FilterExpressionBuilder()
        val criteria = filter.eq("id", id).build()
        vectorStore.delete(criteria)
    }

    /**
     * Accept query text, return similar documents
     */
    fun findSimilar(
        text: String,
        topK: Int?,
        threshold: Double?,
    ) = SearchRequest
        .builder()
        .query(text)
        .topK(topK ?: 5)
        .similarityThreshold(threshold ?: 0.5)
        .build()
        .let { vectorStore.similaritySearch(it) }

    fun isCollectionPopulated() = collectionCount() > 0L

    fun collectionCount() = chromaApi.countEmbeddings(tenant, database, collectionId) ?: 0L
}
