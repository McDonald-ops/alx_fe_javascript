// // Quote database
// let quotes = [
//     { text: "The only way to do great work is to love what you do.", category: "work" },
//     { text: "Life is what happens when you're busy making other plans.", category: "life" },
//     { text: "In the middle of difficulty lies opportunity.", category: "inspiration" },
//     { text: "Simplicity is the ultimate sophistication.", category: "wisdom" },
//     { text: "Stay hungry, stay foolish.", category: "motivation" },
//     { text: "Nothing lasts for ever, both good and bad.", category: "mystery" }
// ];

// // DOM elements
// const quoteDisplay = document.getElementById('quoteDisplay');
// const newQuoteBtn = document.getElementById('newQuote');

// // Initialize the application
// function init() {
//     // Create the form for adding quotes
//     createAddQuoteForm();
    
//     // Create category selector
//     createCategorySelector();
    
//     // Show initial random quote
//     showRandomQuote();
    
//     // Event listener for new quote button
//     newQuoteBtn.addEventListener('click', showRandomQuote);
// }

// // Create form for adding new quotes
// function createAddQuoteForm() {
//     const formContainer = document.createElement('div');
//     formContainer.innerHTML = `
//         <h2>Add New Quote</h2>
//         <div>
//             <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
//             <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
//             <button onclick="addQuote()">Add Quote</button>
//         </div>
//     `;
//     document.body.appendChild(formContainer);
// }

// // Create category selector dropdown
// function createCategorySelector() {
//     const selectorContainer = document.createElement('div');
//     selectorContainer.innerHTML = `
//         <label for="categorySelect">Filter by category:</label>
//         <select id="categorySelect">
//             <option value="all">All Categories</option>
//         </select>
//     `;
//     document.body.insertBefore(selectorContainer, quoteDisplay);
//     updateCategorySelector();
// }

// // Update category selector options
// function updateCategorySelector() {
//     const categorySelect = document.getElementById('categorySelect');
    
//     // Get all unique categories
//     const categories = ['all'];
//     quotes.forEach(quote => {
//         if (!categories.includes(quote.category)) {
//             categories.push(quote.category);
//         }
//     });
    
//     // Clear and repopulate selector
//     categorySelect.innerHTML = '';
//     categories.forEach(category => {
//         const option = document.createElement('option');
//         option.value = category;
//         option.textContent = category === 'all' ? 'All Categories' : 
//                            category.charAt(0).toUpperCase() + category.slice(1);
//         categorySelect.appendChild(option);
//     });
// }

// // Display a random quote
// function showRandomQuote() {
//     const categorySelect = document.getElementById('categorySelect');
//     const selectedCategory = categorySelect.value;
    
//     // Filter quotes by selected category
//     let filteredQuotes = selectedCategory === 'all' ? 
//         quotes : 
//         quotes.filter(quote => quote.category === selectedCategory);
    
//     if (filteredQuotes.length === 0) {
//         quoteDisplay.innerHTML = '<p>No quotes found in this category.</p>';
//         return;
//     }
    
//     // Get random quote
//     const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
//     const quote = filteredQuotes[randomIndex];
    
//     // Display the quote
//     quoteDisplay.innerHTML = `
//         <blockquote>"${quote.text}"</blockquote>
//         <p class="category">— ${quote.category.charAt(0).toUpperCase() + quote.category.slice(1)}</p>
//     `;
// }

// // Add a new quote
// function addQuote() {
//     const quoteText = document.getElementById('newQuoteText').value.trim();
//     const quoteCategory = document.getElementById('newQuoteCategory').value.trim().toLowerCase();
    
//     if (quoteText && quoteCategory) {
//         // Create new quote object
//         const newQuote = {
//             text: quoteText,
//             category: quoteCategory
//         };
        
//         // Add to quotes array
//         quotes.push(newQuote);
        
//         // Update UI
//         updateCategorySelector();
//         showRandomQuote();
        
//         // Clear form inputs
//         document.getElementById('newQuoteText').value = '';
//         document.getElementById('newQuoteCategory').value = '';
//     } else {
//         alert('Please enter both a quote and a category');
//     }
// }

// // Initialize the app when DOM is loaded
// document.addEventListener('DOMContentLoaded', init);



// script.js

// ───────────────
// Quote database (overridden by localStorage if present)
// ───────────────
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "work" },
  { text: "Life is what happens when you're busy making other plans.", category: "life" },
  { text: "In the middle of difficulty lies opportunity.", category: "inspiration" },
  { text: "Simplicity is the ultimate sophistication.", category: "wisdom" },
  { text: "Stay hungry, stay foolish.", category: "motivation" },
  { text: "Nothing lasts for ever, both good and bad.", category: "mystery" }
];

// ───────────────
// DOM elements
// ───────────────
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn  = document.getElementById('newQuote');
const exportBtn    = document.getElementById('exportBtn');
const importInput  = document.getElementById('importFile');

// ───────────────
// Web Storage Helpers
// ───────────────
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) {
    try {
      quotes = JSON.parse(stored);
    } catch (e) {
      console.error('Could not parse stored quotes:', e);
    }
  }
}

// ───────────────
// Initialization
// ───────────────
function init() {
  loadQuotes();
  createAddQuoteForm();
  createCategorySelector();

  const last = sessionStorage.getItem('lastQuote');
  if (last) {
    quoteDisplay.innerHTML = last;
  } else {
    showRandomQuote();
  }

  newQuoteBtn.addEventListener('click', showRandomQuote);
  exportBtn.addEventListener('click', exportToJson);
  importInput.addEventListener('change', importFromJsonFile);
}

document.addEventListener('DOMContentLoaded', init);

// ───────────────
// UI Builders
// ───────────────
function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  formContainer.innerHTML = `
    <h2>Add New Quote</h2>
    <div>
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteBtn">Add Quote</button>
    </div>
  `;
  document.body.appendChild(formContainer);
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
}

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
  document.getElementById('categorySelect').addEventListener('change', showRandomQuote);
}

// ───────────────
// Core Functionality
// ───────────────
function updateCategorySelector() {
  const select = document.getElementById('categorySelect');
  const cats   = ['all'];

  quotes.forEach(q => {
    if (typeof q.category === 'string' && q.category.trim() !== '' && !cats.includes(q.category)) {
      cats.push(q.category);
    }
  });

  select.innerHTML = cats
    .map(cat => {
      const label = cat === 'all'
        ? 'All Categories'
        : cat.charAt(0).toUpperCase() + cat.slice(1);
      return `<option value="${cat}">${label}</option>`;
    })
    .join('');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function showRandomQuote() {
  const sel     = document.getElementById('categorySelect');
  const chosen  = sel.value;
  const pool    = chosen === 'all'
    ? quotes
    : quotes.filter(q => q.category === chosen);

  if (pool.length === 0) {
    quoteDisplay.innerHTML = '<p>No quotes found in this category.</p>';
  } else {
    const q = pool[Math.floor(Math.random() * pool.length)];
    // Safely get category text
    const catText = (typeof q.category === 'string') ? capitalize(q.category) : '';
    
    quoteDisplay.innerHTML = `
      <blockquote>"${q.text}"</blockquote>
      <p class="category">${catText ? '— ' + catText : ''}</p>
    `;
  }

  sessionStorage.setItem('lastQuote', quoteDisplay.innerHTML);
}

function addQuote() {
  const textEl = document.getElementById('newQuoteText');
  const catEl  = document.getElementById('newQuoteCategory');
  const text   = textEl.value.trim();
  const cat    = catEl.value.trim().toLowerCase();

  if (!text || !cat) {
    alert('Please enter both a quote and a category');
    return;
  }

  quotes.push({ text, category: cat });
  saveQuotes();
  updateCategorySelector();
  showRandomQuote();

  textEl.value = '';
  catEl.value  = '';
}

// ───────────────
// JSON Import / Export
// ───────────────
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importFromJsonFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = evt => {
    try {
      const data = JSON.parse(evt.target.result);
      if (Array.isArray(data)) {
        quotes.push(...data);
        saveQuotes();
        updateCategorySelector();
        alert('Quotes imported successfully!');
      } else {
        throw new Error('Not an array');
      }
    } catch {
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
}
