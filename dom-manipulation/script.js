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
// let quotes = [
//   { text: "The only way to do great work is to love what you do.", category: "work" },
//   { text: "Life is what happens when you're busy making other plans.", category: "life" },
//   { text: "In the middle of difficulty lies opportunity.", category: "inspiration" },
//   { text: "Simplicity is the ultimate sophistication.", category: "wisdom" },
//   { text: "Stay hungry, stay foolish.", category: "motivation" },
//   { text: "Nothing lasts for ever, both good and bad.", category: "mystery" }
// ];

// // ───────────────
// // DOM elements
// // ───────────────
// const quoteDisplay = document.getElementById('quoteDisplay');
// const newQuoteBtn  = document.getElementById('newQuote');
// const exportBtn    = document.getElementById('exportBtn');
// const importInput  = document.getElementById('importFile');

// // ───────────────
// // Web Storage Helpers
// // ───────────────
// function saveQuotes() {
//   localStorage.setItem('quotes', JSON.stringify(quotes));
// }

// function loadQuotes() {
//   const stored = localStorage.getItem('quotes');
//   if (stored) {
//     try {
//       quotes = JSON.parse(stored);
//     } catch (e) {
//       console.error('Could not parse stored quotes:', e);
//     }
//   }
// }

// // ───────────────
// // Initialization
// // ───────────────
// function init() {
//   loadQuotes();
//   createAddQuoteForm();
//   createCategorySelector();

//   // Show last viewed quote from this session, or a new one
//   const last = sessionStorage.getItem('lastQuote');
//   if (last) {
//     quoteDisplay.innerHTML = last;
//   } else {
//     showRandomQuote();
//   }

//   // Hook up buttons & import field
//   newQuoteBtn.addEventListener('click', showRandomQuote);
//   exportBtn.addEventListener('click', exportToJson);
//   importInput.addEventListener('change', importFromJsonFile);
// }

// document.addEventListener('DOMContentLoaded', init);

// // ───────────────
// // UI Builders
// // ───────────────
// function createAddQuoteForm() {
//   const formContainer = document.createElement('div');
//   formContainer.innerHTML = `
//     <h2>Add New Quote</h2>
//     <div>
//       <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
//       <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
//       <button id="addQuoteBtn">Add Quote</button>
//     </div>
//   `;
//   document.body.appendChild(formContainer);
//   document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
// }

// function createCategorySelector() {
//   const selectorContainer = document.createElement('div');
//   selectorContainer.innerHTML = `
//     <label for="categorySelect">Filter by category:</label>
//     <select id="categorySelect">
//       <option value="all">All Categories</option>
//     </select>
//   `;
//   document.body.insertBefore(selectorContainer, quoteDisplay);
//   updateCategorySelector();
//   document.getElementById('categorySelect').addEventListener('change', showRandomQuote);
// }

// // ───────────────
// // Core Functionality
// // ───────────────
// function updateCategorySelector() {
//   const select = document.getElementById('categorySelect');
//   const cats   = ['all'];

//   quotes.forEach(q => {
//     if (typeof q.category === 'string' && q.category && !cats.includes(q.category)) {
//       cats.push(q.category);
//     }
//   });

//   select.innerHTML = cats
//     .map(cat => {
//       const label = cat === 'all'
//         ? 'All Categories'
//         : cat.charAt(0).toUpperCase() + cat.slice(1);
//       return `<option value="${cat}">${label}</option>`;
//     })
//     .join('');
// }

// function showRandomQuote() {
//   const sel     = document.getElementById('categorySelect');
//   const cat     = sel.value;
//   const pool    = cat === 'all'
//     ? quotes
//     : quotes.filter(q => q.category === cat);

//   if (!pool.length) {
//     quoteDisplay.innerHTML = '<p>No quotes found in this category.</p>';
//   } else {
//     const q = pool[Math.floor(Math.random() * pool.length)];
//     quoteDisplay.innerHTML = `
//       <blockquote>"${q.text}"</blockquote>
//       <p class="category">— ${q.category.charAt(0).toUpperCase() + q.category.slice(1)}</p>
//     `;
//   }

//   sessionStorage.setItem('lastQuote', quoteDisplay.innerHTML);
// }

// function addQuote() {
//   const textEl = document.getElementById('newQuoteText');
//   const catEl  = document.getElementById('newQuoteCategory');
//   const text   = textEl.value.trim();
//   const cat    = catEl.value.trim().toLowerCase();

//   if (!text || !cat) {
//     alert('Please enter both a quote and a category');
//     return;
//   }

//   quotes.push({ text, category: cat });
//   saveQuotes();
//   updateCategorySelector();
//   showRandomQuote();

//   textEl.value = '';
//   catEl.value  = '';
// }

// // ───────────────
// // JSON Import / Export
// // ───────────────
// function exportToJson() {
//   const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
//   const url  = URL.createObjectURL(blob);
//   const a    = document.createElement('a');
//   a.href     = url;
//   a.download = 'quotes.json';
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// }

// function importFromJsonFile(e) {
//   const file = e.target.files[0];
//   if (!file) return;
//   const reader = new FileReader();
//   reader.onload = evt => {
//     try {
//       const data = JSON.parse(evt.target.result);
//       if (Array.isArray(data)) {
//         quotes.push(...data);
//         saveQuotes();
//         updateCategorySelector();
//         alert('Quotes imported successfully!');
//       } else throw new Error('Not an array');
//     } catch {
//       alert('Invalid JSON file.');
//     }
//   };
//   reader.readAsText(file);
// }



// script.js

// ───────────────
// Quote database (overridden by localStorage if present)
// ───────────────
// 



// script.js

// ───────────────
// Simulation: Mock "server" endpoint
// ───────────────
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

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
const quoteDisplay   = document.getElementById('quoteDisplay');
const newQuoteBtn    = document.getElementById('newQuote');
const exportBtn      = document.getElementById('exportBtn');
const importInput    = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');
const syncStatus     = document.getElementById('syncStatus');
const syncNowBtn     = document.getElementById('syncNowBtn');

// ───────────────
// Web Storage Helpers
// ───────────────
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) {
    try { quotes = JSON.parse(stored); }
    catch (e) { console.error('Could not parse stored quotes:', e); }
  }
}

// ───────────────
// UI: Add‑Quote Form
// ───────────────
function createAddQuoteForm() {
  const container = document.createElement('div');
  container.innerHTML = `
    <h2>Add New Quote</h2>
    <div>
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteBtn">Add Quote</button>
    </div>
  `;
  document.body.appendChild(container);
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
}

// ───────────────
// Capitalize Helper
// ───────────────
function capitalize(str) {
  return (typeof str === 'string' && str.length)
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : '';
}

// ───────────────
// Show Random Quote
// ───────────────
function showRandomQuote() {
  if (!quotes.length) {
    quoteDisplay.textContent = 'No quotes available.';
    return;
  }
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  const catText = capitalize(q.category);
  quoteDisplay.innerHTML = `
    <blockquote>"${q.text}"</blockquote>
    ${catText ? `<p class="category">— ${catText}</p>` : ''}
  `;
}

// ───────────────
// Add a New Quote
// ───────────────
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
  populateCategories();
  filterQuotes();

  textEl.value = '';
  catEl.value  = '';
}

// ───────────────
// Populate Filter Dropdown
// ───────────────
function populateCategories() {
  const set = new Set(quotes.map(q => q.category).filter(c => typeof c === 'string' && c.trim()));
  categoryFilter.innerHTML = `
    <option value="all">All Categories</option>
    ${Array.from(set).map(c => `<option value="${c}">${capitalize(c)}</option>`).join('')}
  `;
}

// ───────────────
// Filter Quotes by Category
// ───────────────
function filterQuotes() {
  const sel = categoryFilter.value;
  localStorage.setItem('lastFilter', sel);
  const pool = sel === 'all' ? quotes : quotes.filter(q => q.category === sel);

  if (!pool.length) {
    quoteDisplay.innerHTML = '<p>No quotes found in this category.</p>';
  } else {
    quoteDisplay.innerHTML = pool.map(q => {
      const catText = capitalize(q.category);
      return `
        <blockquote>"${q.text}"</blockquote>
        ${catText ? `<p class="category">— ${catText}</p>` : ''}
      `;
    }).join('');
  }
}

// ───────────────
// JSON Export
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

// ───────────────
// JSON Import
// ───────────────
function importFromJsonFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!Array.isArray(data)) throw new Error();
      quotes.push(...data);
      saveQuotes();
      populateCategories();
      filterQuotes();
      alert('Quotes imported successfully!');
    } catch {
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
}

// ───────────────
// Fetch from "Server"
// ───────────────
async function fetchQuotesFromServer() {
  const res = await fetch(SERVER_URL);
  return res.json().then(data =>
    data.map(item => ({ text: item.body, category: 'server' }))
  );
}

// ───────────────
// Sync with Server & Conflict Resolution
// ───────────────
async function syncQuotes(showNotification = false) {
  try {
    const serverQuotes = await fetchQuotesFromServer();
    let additions = 0, overrides = 0;
    const localMap = new Map(quotes.map(q => [q.text, q]));

    // merge server → local
    serverQuotes.forEach(sq => {
      if (localMap.has(sq.text)) {
        if (localMap.get(sq.text).category !== sq.category) {
          localMap.get(sq.text).category = sq.category;
          overrides++;
        }
      } else {
        quotes.push(sq);
        additions++;
      }
    });

    if (additions || overrides) {
      saveQuotes();
      populateCategories();
      filterQuotes();
    }

    // POST merged data back to server
    await fetch(SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quotes)
    });

    if (showNotification) {
      syncStatus.textContent =
        `Sync complete: ${additions} new, ${overrides} updated and posted.`;
      syncStatus.style.display = 'block';
      setTimeout(() => (syncStatus.style.display = 'none'), 5000);
    }
  } catch (e) {
    console.error('Sync failed:', e);
    if (showNotification) {
      syncStatus.textContent = 'Sync failed – check console.';
      syncStatus.style.display = 'block';
      setTimeout(() => (syncStatus.style.display = 'none'), 5000);
    }
  }
}

// ───────────────
// Initialization
// ───────────────
function init() {
  loadQuotes();
  createAddQuoteForm();
  populateCategories();

  const last = localStorage.getItem('lastFilter') || 'all';
  categoryFilter.value = last;
  filterQuotes();

  newQuoteBtn.addEventListener('click', showRandomQuote);
  exportBtn.addEventListener('click', exportToJson);
  importInput.addEventListener('change', importFromJsonFile);
  categoryFilter.addEventListener('change', filterQuotes);
  syncNowBtn.addEventListener('click', () => syncQuotes(true));

  // automatic sync every 60s
  syncQuotes();
  setInterval(syncQuotes, 60000);
}

document.addEventListener('DOMContentLoaded', init);
