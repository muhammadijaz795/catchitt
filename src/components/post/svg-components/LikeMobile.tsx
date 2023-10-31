
export const LikeMobile = ({ liked }: { liked?: boolean }) => {

	return (
		<svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_d_201_146693)">
				<path d="M4 14.3041V13.9303C4 9.42501 7.25617 5.58231 11.6957 4.84239C14.5768 4.35319 17.6254 5.31097 19.7266 7.41536L20.5 8.18751L21.2154 7.41536C23.3746 5.31097 26.3652 4.35319 29.3043 4.84239C33.7451 5.58231 37 9.42501 37 13.9303V14.3041C37 16.9789 35.8914 19.5377 33.932 21.3617L22.2854 32.235C21.802 32.6861 21.1639 32.9375 20.5 32.9375C19.8361 32.9375 19.198 32.6861 18.7146 32.235L7.06732 21.3617C5.11053 19.5377 4.00002 16.9789 4.00002 14.3041H4Z" fill={liked ? '#D36262' : "white"} />
			</g>
			<defs>
				<filter id="filter0_d_201_146693" x="0" y="0.716858" width="41" height="36.2206" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
					<feOffset />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_201_146693" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_201_146693" result="shape" />
				</filter>
			</defs>
		</svg>

	)
}