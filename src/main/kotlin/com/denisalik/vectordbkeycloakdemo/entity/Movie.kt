package com.denisalik.vectordbkeycloakdemo.entity


data class Movie(
    val originalTitle: String,
    val id: String,
    val overview: String,
    val voteAverageScore: Double?,
    val keywords: List<String> = listOf(),
){
    fun toVectorString(): String {
        val overviewText = overview.ifEmpty { "" }
        val keywordsText = if (keywords.isEmpty()) "" else keywords.joinToString(" ")
        return "$originalTitle $overviewText $keywordsText".trim()
    }

    fun toMetadata() = mapOf(
        "id" to id,
        "title" to originalTitle,
        "overview" to overview,
        "average score" to voteAverageScore.toString(),
        "keywords" to keywords.joinToString(", ")
    )

}
