
export default function CreatorTools({ isInDark }: { isInDark: boolean }) {
    return (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19 9.77794V16.1999C19 17.88 19 18.7201 18.673 19.3618C18.3854 19.9263 17.9265 20.3853 17.362 20.6729C16.7202 20.9999 15.8802 20.9999 14.2 20.9999H9.8C8.11984 20.9999 7.27976 20.9999 6.63803 20.6729C6.07354 20.3853 5.6146 19.9263 5.32698 19.3618C5 18.7201 5 17.88 5 16.1999V9.77729M21 11.9999L15.5668 5.96381C14.3311 4.59105 13.7133 3.90466 12.9856 3.65127C12.3466 3.4287 11.651 3.42875 11.0119 3.65141C10.2843 3.90492 9.66661 4.59139 8.43114 5.96434L3 11.9999"
                stroke={isInDark ? "white" : "black"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.1045 12.4373L13.3545 13.7363L11.1045 15.0354L11.1045 12.4373Z"
                stroke={isInDark ? "white" : "black"}
                strokeWidth={2}
            />
        </svg>
    )
}
