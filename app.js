// app.js

document.addEventListener("DOMContentLoaded", () => {
    const markdownInput = document.getElementById("markdown-input");
    const markdownPreview = document.getElementById("markdown-preview");
    const fontSelector = document.getElementById("font-selector");
    const saveButton = document.getElementById("save-button");
    const loadFileInput = document.getElementById("load-file");

    // Render Markdown
    function renderMarkdown(markdown) {
        let html = markdown;

        // Handle headings
        html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
        html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
        html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

        // Handle bold and italic
        html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

        // Handle links
        html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');

        // Handle lists
        html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
        html = html.replace(/<li>(.+)<\/li>/gms, "<ul>$&</ul>");

        // Handle inline math: $...$
        html = html.replace(/\$(.+?)\$/g, "<span class='math'>$1</span>");

        // Handle block math: $$...$$
        html = html.replace(/\$\$(.+?)\$\$/gs, "<div class='math-block'>$1</div>");

        return html;
    }

    // Live preview Markdown
    markdownInput.addEventListener("input", () => {
        const markdownText = markdownInput.value;
        markdownPreview.innerHTML = renderMarkdown(markdownText);
    });

    // Change font style
    fontSelector.addEventListener("change", () => {
        const selectedFont = fontSelector.value;
        const fontMap = {
            cmunrm: "'Computer Modern Serif', serif",
            cmunbsr: "'Computer Modern Bold', serif",
            cmunui: "'Computer Modern Upright Italic', serif",
            cmunti: "'Computer Modern Italic', serif"
        };
        markdownPreview.style.fontFamily = fontMap[selectedFont];
    });

    // Save Markdown as MD(TXT) file
    saveButton.addEventListener("click", () => {
        const markdownText = markdownInput.value;
        const blob = new Blob([markdownText], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "markdown.md";
        a.click();
    });

    // Load Markdown from MD(TXT) file
    loadFileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const markdownText = reader.result;
                markdownInput.value = markdownText;
                markdownPreview.innerHTML = renderMarkdown(markdownText);
            };
            reader.readAsText(file);
        }
    });
});
