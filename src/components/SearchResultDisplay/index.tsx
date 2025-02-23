"use client"
import React from "react";

interface SearchResultProps {
    searchResults: SearchResult,
    isLoading: boolean,
    error: string | null,
}

export const SearchResult = (props: SearchResultProps) => {
    const {
        searchResults,
        isLoading,
        error,
    } = props

    if (isLoading) {
        return null
    }
    if (error) {
        return (
            <div className="text-center text-red-800">
                {error}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {searchResults.map((result, index) => (
                <div key={index} className="text-[#282828]">
                    <span>{result.title}</span>
                    <span>{result.description}</span>
                </div>
            ))}
        </div>
    )
}