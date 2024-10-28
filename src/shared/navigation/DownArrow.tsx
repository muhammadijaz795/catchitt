
export default function DownArrow({ active }: { active?: boolean }) {
    return (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke={active ? "rgb(255, 59, 92)" : "#fff"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}
