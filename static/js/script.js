
const apiKey = '60bf1e13-0c75-4cce-aee3-83dc4bded1e7'; 

function fetchCryptoData() {
    const proxyUrl = 'https://corsproxy.io/?';
    const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
    const limit = 300; 


    const urlWithParams = `${proxyUrl}${apiUrl}?limit=${limit}`;

    fetch(urlWithParams, {
        method: 'GET',
        headers: {
            'X-CMC_PRO_API_KEY': apiKey,
            'Accept': 'application/json'
        }
    })
    .then(response =>(response.json()))
    .then(data => displayData(data))
    .catch(error => console.error('Error fetching data:', error));
}

function displayData(data) {
    const tableBody = document.getElementById('crypto-table-body');
    tableBody.innerHTML = '';

    data.data.forEach(crypto => {
        const row = document.createElement('tr');
        const priceChange1hClass = crypto.quote.USD.percent_change_1h >= 0 ? 'positive' : 'negative';
        const priceChange24hClass = crypto.quote.USD.percent_change_24h >= 0 ? 'positive' : 'negative';
        const priceChange7dClass = crypto.quote.USD.percent_change_7d >= 0 ? 'positive' : 'negative';

        row.innerHTML = `
            <td>${crypto.cmc_rank}</td>
            <td><img src="${crypto.url}" alt="${crypto.name} ${crypto.symbol}" /></td>
            <td>$${crypto.quote.USD.price.toFixed(2)}</td>

            <td class="${priceChange1hClass}">
                ${crypto.quote.USD.percent_change_1h >= 0 ? '<span class="caret-up">&#9650;</span>' : '<span class="caret-down">&#9660;</span>'}
                ${crypto.quote.USD.percent_change_1h.toFixed(2)}%
            </td>
            <td class="${priceChange24hClass}">
                ${crypto.quote.USD.percent_change_24h >= 0 ? '<span class="caret-up">&#9650;</span>' : '<span class="caret-down">&#9660;</span>'}
                ${crypto.quote.USD.percent_change_24h.toFixed(2)}%
            </td>

            <td class="${priceChange7dClass}">
                ${crypto.quote.USD.percent_change_7d >= 0 ? '<span class="caret-up">&#9650;</span>' : '<span class="caret-down">&#9660;</span>'}
                ${crypto.quote.USD.percent_change_7d.toFixed(2)}%
            </td>
            <td>$${crypto.quote.USD.market_cap.toFixed(2)}</td>
            <td>$${crypto.quote.USD.volume_24h.toFixed(2)}</td>
            <td>
            ${crypto.circulating_supply.toFixed(2)} ${crypto.symbol}<br>
            ${crypto.max_supply ? `${((crypto.circulating_supply / crypto.max_supply) * 100).toFixed(2)}% ` : ''}
            </td>
        `;
        
       
       
        tableBody.appendChild(row);




        
    });

}
fetchCryptoData();


function toggleDiv() {
    const myDiv = document.getElementById("divs");
    myDiv.style.display = (divs.style.display === "none") ? "flex" : "none";

}
const items = Array.from({ length: 300}, (_, i) => `row ${i + 1}`);

const itemsPerPage = 100;
let currentPage = 1;

// Function to display items based on the current page
function displayItems(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  const itemsList = document.getElementById('crypto-table-body');
  itemsList.innerHTML = ''; // Clear previous items

  paginatedItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    itemsList.appendChild(li);
  });
}

// Function to generate pagination buttons
function renderPaginationButtons() {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = ''; // Clear previous pagination buttons

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', function () {
      currentPage = i;
      displayItems(currentPage);
      highlightCurrentPage();
    });
    pagination.appendChild(button);
  }

  // Highlight the current page button
  highlightCurrentPage();
}

// Function to highlight the current page button
function highlightCurrentPage() {
  const buttons = document.querySelectorAll('#pagination button');
  buttons.forEach((button, index) => {
    if (index + 1 === currentPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// Initial display
displayItems(currentPage);
renderPaginationButtons();








