import re

# List of example URLs (replace with your list)
example_urls = [
    "101nitro.com",
    "1111sale.us",
    "15dfjkbvdf.club",
    "17ebook.com",
    "1month-premium.com",
    "1nitro.club",
    # Add more URLs as needed
]

# Function to check if a URL matches a suspicious pattern
def is_phishing(url):
    suspicious_patterns = [
        r'\d{2,}',        # Contains consecutive digits
        r'\w{15,}',       # Contains long alphanumeric strings
        r'[a-z]{5,}\.com' # Common pattern for phishing domains
    ]
    
    for pattern in suspicious_patterns:
        if re.search(pattern, url):
            return True
    return False

# Filter out phishing URLs
filtered_urls = [url for url in example_urls if not is_phishing(url)]

# Print filtered URLs
print("Filtered URLs (non-phishing):")
for url in filtered_urls:
    print(url)
