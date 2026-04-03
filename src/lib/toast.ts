import { toast } from "sonner"

interface ToastOptions {
    title: string
    message: string
    type?: "success" | "error" | "info" | "warning"
}

export function showToast({ title, message, type = "success" }: ToastOptions) {
    const config = {
        description: message,
        duration: 4000,
    }

    switch (type) {
        case "success":
            toast.success(title, config)
            break
        case "error":
            toast.error(title, config)
            break
        case "warning":
            toast.warning(title, config)
            break
        case "info":
            toast.info(title, config)
            break
        default:
            toast(title, config)
    }
}