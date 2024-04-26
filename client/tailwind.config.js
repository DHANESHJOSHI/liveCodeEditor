/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.jsx", "./*.html"],
    theme: {
        extend: {
            colors: {
                dark: "#080713",
                darkHover: "#080713",
                light: "#f5f5f5",
                primary: "#39E079",
                danger: "#ef4444",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            animation: {
                "up-down": "up-down 2s ease-in-out infinite alternate",
            },
        },
    },
    plugins: [],
}
