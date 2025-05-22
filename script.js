const formulario = document.getElementById('formulario-cliente');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const carritoLista = document.getElementById('carrito');
const totalSpan = document.getElementById('total');

let carrito = [];

formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();

  if (nombre === '' || email === '') {
    alert('Por favor complete todos los campos.');
    return;
  }

  alert(`¡Bienvenido/a, ${nombre}! Ahora puedes agregar libros al carrito.`);
});

document.querySelectorAll('.agregar').forEach(btn => {
  btn.addEventListener('click', function () {
    const libro = this.parentElement;
    const id = libro.dataset.id;
    const nombre = libro.dataset.nombre;
    const precio = parseFloat(libro.dataset.precio);

    const itemExistente = carrito.find(item => item.id === id);
    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
  });
});

function actualizarCarrito() {
  carritoLista.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;
    carritoLista.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalSpan.textContent = total.toFixed(2);
}