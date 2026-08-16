"use client";

import { useState } from "react";

const ShareLink = ({ token }: { token: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const url = `${window.location.origin}/h/${token}`;
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }
    return (
        <button
            onClick={handleCopy}
            className="shrink-0 whitespace-nowrap rounded-full border border-stone-300 px-3 py-2 text-xs font-medium uppercase tracking-wide text-stone-600 transition hover:border-orange-800 hover:text-orange-800"
        >
            {copied ? "Copied ✓" : "Share link"}
        </button>
    );
};

export default ShareLink;