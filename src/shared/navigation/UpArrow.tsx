
function UpArrow({ active }: { active?: boolean }) {
    return (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke={active ? "rgb(255, 59, 92)" : "#fff"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default UpArrow