import React from 'react'

export default function CodeArea({ userInput, setUserInput }) {
    return (
        <>
            <div className="flex flex-col gap-10 justify-start items-center min-w-[40%] p-6 border-r border-black transition focus:outline-none focus:shadow-xs">
                <textarea
                    value={userInput || ""}
                    className="px-4 py-2 w-[40%] min-h-[60px] border border-black hover:shadow-none shadow-[4px_4px_0px_0px_black] transition focus:outline-none focus:shadow-xs"
                    placeholder="Clip your code..."
                    aria-label="Code input area"
                    onChange={(e) => setUserInput(e.target.value)}
                />
                {/* <div className="px-4 py-2 h-[40%] w-[80%] border border-black shadow-md transition focus:outline-none focus:shadow-xs"></div> */}
            </div>
        </>
    )
}
