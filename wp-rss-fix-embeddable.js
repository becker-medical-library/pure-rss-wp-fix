// Embeddable version. Copy/paste and wrap in <script> tags.
// Script to fix WordPress special character 
// rendering in RSS feeds.

// After the DOM has loaded, call pureRSSCleaner
document.addEventListener('DOMContentLoaded', (e) => {
    pureRSSCleaner(true, true);
});

// pureRSSCleaner corrects improperly encoded HTML
// tags in RSS item titles and also strips
// title content repeated in the excerpt.
// Function parameters are booleans.
function pureRSSCleaner(title, excerpt) {
    // Define a regular expression pattern to check for HTML elements
    const re = /<[a-zA-Z]+>/;
    // Identify the RSS feed items on the page
    const rssItems = document.getElementsByClassName('wp-block-rss__item');

    for (let i = 0; i < rssItems.length; i++) {
        // Attempt to store the associated title and excerpt
        const itemTitle = rssItems[i].getElementsByClassName('wp-block-rss__item-title');
        const itemExcerpt = rssItems[i].getElementsByClassName('wp-block-rss__item-excerpt');

        // If 'title' is set to true and the itemTitle exists
        if (title) {
            if (itemTitle.length > 0) {
                // Find the article title <a> element (we do not want to disturb the URL)
                const itemTitleLink = itemTitle[0].querySelector('a');
                // If the text content of the article link 
                // contains HTML elements,replace the inner HTML 
                // of the article link element with the plain text string 
                // that WordPress is rendering as HTML when decoding special characters
                if (re.test(itemTitleLink.textContent)) {
                    itemTitleLink.innerHTML = itemTitle[0].textContent;
                }
            }
        }
        // If `excerpt` is set to true and the itemTitle and itemExcerpt exists,
        // strip the title content from the excerpt
        if (excerpt) {
            if (itemTitle.length > 0) {
                if (itemExcerpt.length > 0) {
                    let excerptContent = itemExcerpt[0].textContent;
                    let titleContent = itemTitle[0].textContent;
                    // Remove extra whitespace and breaks from title
                    titleContent = titleContent.replace(/\s\s+/g, " ");
                    // Remove extra whitespace and breaks from excerpt
                    excerptContent = excerptContent.replace(/\s\s+/g, " ");
                    // Remove titleContent from excerptContent
                    excerptContent = excerptContent.replace(titleContent, "");
                    // Replace original item excerpt with cleaned content
                    itemExcerpt[0].textContent = excerptContent;
                }
            }
        }
    }
}