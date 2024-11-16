import Highlighter from "react-highlight-words";

export default function TextHighlighter({ searchQuery, text }: { searchQuery: string, text: string }) {
    return (
        <Highlighter
            searchWords={[searchQuery]}
            highlightStyle={{ fontWeight: 700, background: 'transparent', color: 'rgb(255, 59, 92)', textDecoration: 'underline' }}
            autoEscape={true}
            textToHighlight={text}
        />
    )
}