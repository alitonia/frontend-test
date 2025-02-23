import {TextWithHighlights} from "@/definitions/searchDefinitions";
import {ReactElement} from "react";


export const HighlightText = (props: TextWithHighlights) => {
    const {Text, Highlights} = props

    const textBundle: ReactElement[] = []

    const sortedHighlights = Highlights.sort((a, b) => a.BeginOffset - b.BeginOffset)
    let startTmp = 0

    sortedHighlights.forEach((highlight) => {
        textBundle.push(<span key={highlight.BeginOffset}>{Text.slice(startTmp, highlight.BeginOffset)}</span>)
        textBundle.push(
            <span className={"text-[#282828] font-semibold highlighted-element"}
                  key={highlight.EndOffset}>{Text.slice(highlight.BeginOffset, highlight.EndOffset)}</span>
        )
        startTmp = highlight.EndOffset
    })

    return (
        <span>{textBundle}</span>
    )
}