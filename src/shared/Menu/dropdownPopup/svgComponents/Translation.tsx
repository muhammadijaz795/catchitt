
export default function Translation({ isInDark }: { isInDark: boolean }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4 5H11"
                    stroke={isInDark? 'white':'black'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9 3V5C9 9.418 6.761 13 4 13"
                    stroke={isInDark? 'white':'black'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 9C5 11.144 7.952 12.908 11.7 13"
                    stroke={isInDark? 'white':'black'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12 20L16 11L20 20"
                    stroke={isInDark? 'white':'black'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M19.0999 18H12.8999"
                    stroke={isInDark? 'white':'black'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            <defs>
                <clipPath id="clip0_10796_21349">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}
