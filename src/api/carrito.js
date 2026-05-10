const BASE = import.meta.env.VITE_API_URL

const authHeader = (token) => ({ Authorization: `Bearer ${token}` })
const authJson = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
})

export const getCarrito = async (token) => {
  const res = await fetch(`${BASE}/api/carrito`, { headers: authHeader(token) })
  return res.json()
}

export const agregarItem = async (viniloId, cantidad = 1, token) => {
  const res = await fetch(`${BASE}/api/carrito`, {
    method: 'POST',
    headers: authJson(token),
    body: JSON.stringify({ viniloId, cantidad }),
  })
  return res.json()
}

export const actualizarItem = async (viniloId, cantidad, token) => {
  const res = await fetch(`${BASE}/api/carrito/${viniloId}`, {
    method: 'PUT',
    headers: authJson(token),
    body: JSON.stringify({ cantidad }),
  })
  return res.json()
}

export const eliminarItem = async (viniloId, token) => {
  const res = await fetch(`${BASE}/api/carrito/${viniloId}`, {
    method: 'DELETE',
    headers: authHeader(token),
  })
  return res.json()
}

export const vaciarCarrito = async (token) => {
  const res = await fetch(`${BASE}/api/carrito`, {
    method: 'DELETE',
    headers: authHeader(token),
  })
  return res.json()
}

export const confirmarCompra = async (token) => {
  const res = await fetch(`${BASE}/api/carrito/confirmar`, {
    method: 'POST',
    headers: authHeader(token),
  })
  return res.json()
}
