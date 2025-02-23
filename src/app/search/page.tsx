"use client"

import React from "react";
import Link from 'next/link';
import {Banner} from "@/components/Banner";
import {SearchBar} from "@/components/SearchBar";
import {useSearchHook} from "@/hooks/SearchHook";
import {SearchResultDisplay} from "@/components/SearchResultDisplay";
import {ToastContainer} from 'react-toastify';


export default function SearchPage() {

    const talons = useSearchHook({})

    return (
        <div className="min-h-screen flex flex-col items-center p-8">
            <Banner text={'Welcome to the Singapore Government'}/>

            <div className="w-full lg:px-[15%] md:px-[5%] py-12">
                <SearchBar
                    {...talons}
                />
                <SearchResultDisplay
                    {...talons}
                />
            </div>
            <ToastContainer/>

            <Link href="/" className="mt-8 text-blue-500 hover:underline">
                Back to Home
            </Link>
        </div>
    );
}