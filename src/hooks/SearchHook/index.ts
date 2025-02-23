import React, {KeyboardEvent, useEffect} from "react";

import {SearchResult,} from "@/definitions/searchDefinitions";
import {useDebouncedCallback} from "use-debounce";
import {Bounce, toast} from "react-toastify";


interface SearchHookProps {

}

const DATA_API = 'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json'
const SUGGESTIONS_API = 'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json'
const DEFAULT_INDEX = -1

export const useSearchHook = (props: SearchHookProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const fetchSuggestionRef = React.useRef<AbortController | null>(null);
    const fetchDataRef = React.useRef<AbortController | null>(null);

    const [searchTerm, setSearchTerm] = React.useState('');

    const [searchResult, setSearchResult] = React.useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const [suggestions, setSuggestion] = React.useState<string[]>([]);
    const [currentMovingSuggestionIndex, setCurrentMovingSuggestionIndex] = React.useState(DEFAULT_INDEX);

    const [showResetButton, setShowResetButton] = React.useState(false);

    const fetchSuggestions = async (term: string) => {
        if (fetchSuggestionRef.current !== null) {
            fetchSuggestionRef.current.abort();
        }
        try {
            const controller = new AbortController();
            fetchSuggestionRef.current = controller;

            const response = await fetch(`${SUGGESTIONS_API}`, {signal: controller.signal});

            if (!response.ok) {
                throw new Error('Failed to fetch suggestions');
            }
            const data = await response.json();
            fetchSuggestionRef.current = null;
            // should have a dynamic API for this though
            setSuggestion((data.suggestions || []).filter((t: string) => t.includes(searchTerm)) || null);
            setCurrentMovingSuggestionIndex(DEFAULT_INDEX);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };
    const debouncedFetchSuggestions = useDebouncedCallback(
        // function
        (value) => {
            fetchSuggestions(value);
        },
        // delay in ms
        300
    );

    const handleChangeSearchTerm = (searchTerm: string) => {
        setSearchTerm(function (preSearchTerm) {
            if (preSearchTerm !== searchTerm) {
                if (searchTerm.length > 0) {
                    setShowResetButton(true);
                }
                if (searchTerm.length > 2) {
                    debouncedFetchSuggestions(searchTerm);
                }
                return searchTerm;
            }
            return preSearchTerm;
        });
    };

    const handleArrowUpMove = () => {
        if (currentMovingSuggestionIndex > 0 && suggestions.length > currentMovingSuggestionIndex) {
            setCurrentMovingSuggestionIndex(currentMovingSuggestionIndex - 1);
        }
    }

    const handleArrowDownMove = () => {
        if (
            currentMovingSuggestionIndex < suggestions.length - 1 &&
            suggestions.length > 0 &&
            currentMovingSuggestionIndex + 1 <= suggestions.length
        ) {
            setCurrentMovingSuggestionIndex(currentMovingSuggestionIndex + 1);
        }

    }

    const handleStartSearch = async (searchTerm: string) => {
        setIsLoading(true);
        setError(null);
        setSearchResult(null);
        setCurrentMovingSuggestionIndex(DEFAULT_INDEX);
        setSuggestion([]);

        if (fetchDataRef.current !== null) {
            fetchDataRef.current.abort();
        }
        try {
            const controller = new AbortController();
            fetchDataRef.current = controller;
            const response = await fetch(DATA_API, {signal: controller.signal});

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            fetchDataRef.current = null;
            console.log('Search results:', data);

            setSearchResult(data);

        } catch (error) {
            console.error('Error fetching search results:', error);
            setError('Failed to fetch search results. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    const handleEnterPress = () => {
        if (currentMovingSuggestionIndex >= 0 && currentMovingSuggestionIndex < suggestions.length) {
            setSearchTerm(suggestions[currentMovingSuggestionIndex]);
            return handleStartSearch(suggestions[currentMovingSuggestionIndex])
        }
        return handleStartSearch(searchTerm)
    }

    const handleSuggestionRowPress = (text: string) => {
        console.log('Clicked suggestion:', text);
        setSearchTerm(text);
        return handleStartSearch(text)
    }

    const handleBlurSearchTerm = () => {
        setTimeout(() => {
            setSuggestion([]);
            setCurrentMovingSuggestionIndex(DEFAULT_INDEX);
        }, 0)

    }

    const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'Enter':
                handleEnterPress();
                break;
            case 'ArrowUp':
                handleArrowUpMove();
                break;
            case 'ArrowDown':
                handleArrowDownMove();
                break;
            default:
                return;
        }
    }

    const handleSearchBoxFocus = () => {
        if (searchTerm.length > 2) {
            debouncedFetchSuggestions(searchTerm);
        }
    }

    const handleSearchButtonClick = () => {
        return handleStartSearch(searchTerm);
    }

    const handleCloseSuggestions = () => {
        setSuggestion([]);
        setCurrentMovingSuggestionIndex(DEFAULT_INDEX);
        setShowResetButton(false);
        setSearchTerm('');
        setTimeout(() => inputRef.current?.focus(), 0);
    }

    const showErrorToast = (text: string) => {
        toast.error(text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        })
    }

    useEffect(() => {
        if (error) {
            showErrorToast(error)
        }
    }, [error])

    return {
        inputRef,
        searchTerm,
        handleChangeSearchTerm,
        handleStartSearch,
        searchResult,
        isLoading,
        error,
        suggestions,
        handleArrowUpMove,
        handleArrowDownMove,
        handleSearchKeyDown,
        handleBlurSearchTerm,
        currentMovingSuggestionIndex,
        handleSearchBoxFocus,
        handleCloseSuggestions,
        showResetButton,
        handleSearchButtonClick,
        handleSuggestionRowPress
    }
}