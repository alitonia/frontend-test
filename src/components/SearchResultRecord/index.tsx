import Link from "next/link";
import React from "react";

interface SearchResultItemProps {
    result: SearchResultItem,
}
export const SearchResultItem = (props) => {
    const { result } = props;

    return (
        <div className="text-[#282828]">
            <h3 className={"text-[#1c76d5] font-semibold text-xl"}>
                <Link href={result.DocumentURI}>
                    {result.DocumentTitle.Text}
                </Link>
            </h3>
            <h5 className={'mt-2 mb-4'}>{result.DocumentExcerpt.Text}</h5>
            <h6 className={'text-[#777]'}>
                <Link href={result.DocumentURI}>
                    {result.DocumentURI}
                </Link>
            </h6>
        </div>
    )
}