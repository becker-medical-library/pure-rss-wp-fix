// Script to fix WordPress special character 
// rendering in RSS feeds.
// Define a regular expression pattern to check for HTML elements
const re = /<[a-zA-Z]+>/;
// Wait until the DOM has loaded
document.addEventListener('DOMContentLoaded', (e) => {
    // Identify the RSS feed titles on the page
    const rssTitles = document.getElementsByClassName('wp-block-rss__item-title');
    // For each RSS title
    for (let i = 0; i < rssTitles.length; i++) {
        // Find the article title <a> element (we do not want to disturb the URL)
        const articleLink = rssTitles[i].querySelector('a');
        // If the text content of the article link 
        // contains HTML elements,replace the inner HTML 
        // of the article link element with the plain text string 
        // that WordPress is rendering as HTML when decoding special characters
        if (re.test(articleLink.textContent)) {
            articleLink.innerHTML = rssTitles[i].textContent;
        }
    }
});
