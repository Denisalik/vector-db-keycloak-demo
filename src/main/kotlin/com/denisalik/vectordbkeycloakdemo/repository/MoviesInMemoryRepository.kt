package com.denisalik.vectordbkeycloakdemo.repository

import com.denisalik.vectordbkeycloakdemo.entity.Movie
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.stereotype.Component
import tools.jackson.databind.ObjectMapper
import tools.jackson.module.kotlin.readValue

@Component
class MoviesInMemoryRepository(
    private val objectMapper: ObjectMapper,
    @Value("classpath:movies.json")
    private val moviesResource: Resource,
) {
    private val moviesMap = readFile()

    private fun readFile() = objectMapper.readValue<Map<String, Movie>>(moviesResource.inputStream)

    fun findAll() = moviesMap.values

    fun count() = moviesMap.size

    fun findById(id: String) = moviesMap[id]
}
