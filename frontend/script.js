const topupForm = document.getElementById('topupForm');
if (topupForm) {
  topupForm.addEventListener('submit', async e => {
    e.preventDefault();
    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('amount').value;
    const res = await fetch('/api/topup/request', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({userId: 'USER_ID_HERE', senderNumber: phone, amount})
    });
    const data = await res.json();
    document.getElementById('response').innerText = JSON.stringify(data);
  });
}

const productForm = document.getElementById('productForm');
if (productForm) {
  productForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const description = document.getElementById('desc').value;

    const res = await fetch('/api/products/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name, category, price, stock, description})
    });
    const data = await res.json();
    document.getElementById('response').innerText = JSON.stringify(data);
  });
}
