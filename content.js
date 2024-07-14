// Define the suspicious patterns for phishing detection
function isPhishing(url) {
    // Regular expression patterns for phishing detection
    const suspiciousPatterns = [
        /^0{5,}/,                          // URL starts with many zeros
        /(\.php\?|\.php$|\.html$)/i,       // Files or pages with PHP or HTML extensions
        /\d{4,}/                           // Long sequences of digits
        // Add more patterns as needed
    ];

    // Check if the URL matches any suspicious pattern
    for (const pattern of suspiciousPatterns) {
        if (pattern.test(url)) {
            return true;
        }
    }

    return false;
}

// Example URLs (replace with your URLs or fetch dynamically)
const exampleUrls = [
    "101nitro.com",
    "1111sale.us",
    "15dfjkbvdf.club",
    "17ebook.com",
    "1month-premium.com",
    "1nitro.club",
    "http://00000000000000000dhl.000webhostapp.com/delive",
    "http://example.com",         // Should return false
    "http://00000example.com",    // Should return true (starts with many zeros)
    "http://example.com/login",   // Should return false
    "http://example.com/phpfile.php", // Should return true (PHP file extension)
    "http://example.com/abcxyz.php?", // Should return true (PHP file extension with query)
    "http://example.xyz",         // Should return true (uncommon TLD)
    "http://example.com/{@}[+=_]",   // Should return true (contains special characters)
    "http://example.com/abc1234.com", // Should return true (alphanumeric pattern)
    "http://example.com/ru",
];

// Filter out phishing URLs
const filteredUrls = exampleUrls.filter(url => isPhishing(url));

// Print filtered phishing URLs
console.log("Filtered phishing URLs:");
filteredUrls.forEach(url => console.log(url));

// Listen for messages from background script
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.action === "checkPhishing") {
        const url = request.url;
        let message;
        if (isPhishing(url)) {
            message = "This link is potentially a phishing link! Please close the tab.";
        } else {
            message = "No phishing detected.";
        }

        chrome.runtime.sendMessage({
            action: "showAlert",
            message: message,
            url: url
        });
    }
});
