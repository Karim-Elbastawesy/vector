'use client'

import { PiWarningCircleFill } from "react-icons/pi";


export default function error({ error }: { error: Error }) {
    return (
        <div className="flex justify-center items-center my-5 min-h-40">
            <div className="flex bg-red-100 text-red-600 items-center gap-3 rounded-3xl p-5 justify-center">
                <PiWarningCircleFill className="text-2xl"></PiWarningCircleFill>
                <p className="text-xl">{error.message}</p>
            </div>
        </div>
    )
}
