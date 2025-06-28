// Initial quotes database
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "work" },
    { text: "Life is what happens when you're busy making other plans.", category: "life" },
    { text: "In the middle of difficulty lies opportunity.", category: "inspiration" },
    { text: "Simplicity is the ultimate sophistication.", category: "design" },
    { text: "Stay hungry, stay foolish.", category: "motivation" }
];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categorySelect = document.getElementById('categorySelect');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

// Initialize the app
function init() {
    // Populate category dropdown
    updateCategorySelect();
    
    // Show initial random quote
    showRandomQuote();
    
    // Event listeners
    newQuoteBtn.addEventListener('click', showRandomQuote);
}

// Update category dropdown with unique categories
function updateCategorySelect() {
    // Get all unique categories
    const categories = ['all'];
    quotes.forEach(quote => {
        if (!categories.includes(quote.category)) {
            categories.push(quote.category);
        }
    });
    
    // Clear and repopulate select
    categorySelect.innerHTML = '';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    });
}

// Display a random quote
function showRandomQuote() {
    const selectedCategory = categorySelect.value;
    let filteredQuotes = quotes;
    
    // Filter quotes by category if not "all"
    if (selectedCategory !== 'all') {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }
    
    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes found in this category.</p>';
        return;
    }
    
    // Get random quote
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    
    // Display quote
    quoteDisplay.innerHTML = `
        <p class="quote-text">"${quote.text}"</p>
        <p class="quote-category">— ${quote.category.charAt(0).toUpperCase() + quote.category.slice(1)}</p>
    `;
}

// Add a new quote
function addQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim().toLowerCase();
    
    if (text && category) {
        // Create new quote object
        const newQuote = {
            text: text,
            category: category
        };
        
        // Add to quotes array
        quotes.push(newQuote);
        
        // Update UI
        updateCategorySelect();
        showRandomQuote();
        
        // Clear form
        newQuoteText.value = '';
        newQuoteCategory.value = '';
    } else {
        alert('Please enter both a quote and a category');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);