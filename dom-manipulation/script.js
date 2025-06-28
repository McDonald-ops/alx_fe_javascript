// Quote database
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "work" },
    { text: "Life is what happens when you're busy making other plans.", category: "life" },
    { text: "In the middle of difficulty lies opportunity.", category: "inspiration" },
    { text: "Simplicity is the ultimate sophistication.", category: "wisdom" },
    { text: "Stay hungry, stay foolish.", category: "motivation" },
    { text: "Nothing lasts for ever, both good and bad.", category: "mystery" }
];

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

// Initialize the application
function init() {
    // Create the form for adding quotes
    createAddQuoteForm();
    
    // Create category selector
    createCategorySelector();
    
    // Show initial random quote
    showRandomQuote();
    
    // Event listener for new quote button
    newQuoteBtn.addEventListener('click', showRandomQuote);
}

// Create form for adding new quotes
function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `
        <h2>Add New Quote</h2>
        <div>
            <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
            <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
            <button onclick="addQuote()">Add Quote</button>
        </div>
    `;
    document.body.appendChild(formContainer);
}

// Create category selector dropdown
function createCategorySelector() {
    const selectorContainer = document.createElement('div');
    selectorContainer.innerHTML = `
        <label for="categorySelect">Filter by category:</label>
        <select id="categorySelect">
            <option value="all">All Categories</option>
        </select>
    `;
    document.body.insertBefore(selectorContainer, quoteDisplay);
    updateCategorySelector();
}

// Update category selector options
function updateCategorySelector() {
    const categorySelect = document.getElementById('categorySelect');
    
    // Get all unique categories
    const categories = ['all'];
    quotes.forEach(quote => {
        if (!categories.includes(quote.category)) {
            categories.push(quote.category);
        }
    });
    
    // Clear and repopulate selector
    categorySelect.innerHTML = '';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category === 'all' ? 'All Categories' : 
                           category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    });
}

// Display a random quote
function showRandomQuote() {
    const categorySelect = document.getElementById('categorySelect');
    const selectedCategory = categorySelect.value;
    
    // Filter quotes by selected category
    let filteredQuotes = selectedCategory === 'all' ? 
        quotes : 
        quotes.filter(quote => quote.category === selectedCategory);
    
    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes found in this category.</p>';
        return;
    }
    
    // Get random quote
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    
    // Display the quote
    quoteDisplay.innerHTML = `
        <blockquote>"${quote.text}"</blockquote>
        <p class="category">— ${quote.category.charAt(0).toUpperCase() + quote.category.slice(1)}</p>
    `;
}

// Add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim().toLowerCase();
    
    if (quoteText && quoteCategory) {
        // Create new quote object
        const newQuote = {
            text: quoteText,
            category: quoteCategory
        };
        
        // Add to quotes array
        quotes.push(newQuote);
        
        // Update UI
        updateCategorySelector();
        showRandomQuote();
        
        // Clear form inputs
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    } else {
        alert('Please enter both a quote and a category');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);