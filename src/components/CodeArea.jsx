import React from 'react'

export default function CodeArea({ userInput, setUserInput }) {
    return (
        <>
            <textarea
                value={userInput || ""}
                className=" w-full rounded-sm border border-black dark:border dark:bg-[#121212] dark:text-white dark:shadow-white/5 dark:border-white/40 hover:shadow-none shadow-[4px_4px_0px_0px_black] transition focus:outline-none focus:shadow-xs min-h-[80px] duration-200 bg-white py-2 px-4"
                placeholder="Clip your code..."
                aria-label="Code input area"
                onChange={(e) => setUserInput(e.target.value)}
            />

        </>
    )
}
