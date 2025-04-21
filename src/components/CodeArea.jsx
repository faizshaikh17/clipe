import React from 'react'

export default function CodeArea({ userInput, setUserInput }) {
    return (
        <>
            <div className=" min-h-[80px] w-full border border-black hover:shadow-none shadow-[4px_4px_0px_0px_black] transition focus:outline-none focus:shadow-xs">
                <textarea
                    value={userInput || ""}
                    className=" min-h-[80px] w-full py-2 px-4 transition focus:outline-none focus:shadow-xs"
                    placeholder="Clip your code..."
                    aria-label="Code input area"
                    onChange={(e) => setUserInput(e.target.value)}
                />
            </div>
        </>
    )
}
