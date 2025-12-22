import { Spinner } from "@/components/ui/spinner"

export default function AuthLoading() {
    return (
        <div className="flex flex-1 items-center justify-center p-4">
            <Spinner className="w-10 h-10" />
        </div>
    )
}