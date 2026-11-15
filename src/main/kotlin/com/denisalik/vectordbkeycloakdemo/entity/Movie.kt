package com.denisalik.vectordbkeycloakdemo.entity


data class Movie(
    val originalTitle: String,
    val id: String,
    val overview: String,
    val voteAverageScore: Double?,
    val keywords: List<String> = listOf(),
){
    fun toVectorString(): String {
        val strings = mutableListOf("Title: $originalTitle")
        if (keywords.isNotEmpty()) strings.add(keywords.joinToString(", ", "Keywords: "))
        if (overview.trim().isNotEmpty()) strings.add("Body: ${overview.trim()}")
        return strings.joinToString("\n")
    }

    fun toMetadata() = mapOf(
        "id" to id,
        "title" to originalTitle,
        "overview" to overview,
        "average score" to voteAverageScore.toString(),
        "keywords" to keywords.joinToString(", ")
    )

}
