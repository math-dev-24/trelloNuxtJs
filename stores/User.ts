import { defineStore } from "pinia";

export type Style = "success" | "warning" | "primary" | "secondary" | "info" | "error" | "neutral" | undefined

interface UserStoreInterface {
    settings: UserSettings;
}

export interface UserSettings {
    language: string
}

export const useUserStore = defineStore("userStore", {
    state: (): UserStoreInterface => ({
        settings: {
            language: 'fr'
        }
    }),
    actions: {
        sendMsg(msg: string, style: Style) {
            const toast = useToast();
            const icon: string = (style === "warning" || style === "error") ? "i-heroicons-x-circle-16-solid" : "i-heroicons-check-badge";

            toast.add({
                title: style === "error" || style == "warning" ? "Une erreur est survenue !" : "Succès !",
                description: msg,
                color: style,
                icon: icon,
                duration: 3000
            })
        },
    },
});