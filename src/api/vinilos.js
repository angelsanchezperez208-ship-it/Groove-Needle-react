const BASE = import.meta.env.VITE_API_URL

const authJson = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
})

export const getVinilos = async () => {
  const res = await fetch(`${BASE}/api/vinilos`)
  if (!res.ok) throw new Error('Error al obtener vinilos')
  return res.json()
}

export const getViniloById = async (id) => {
  const res = await fetch(`${BASE}/api/vinilos/${id}`)
  if (!res.ok) throw new Error('Vinilo no encontrado')
  return res.json()
}

export const crearVinilo = async (datos, token) => {
  const res = await fetch(`${BASE}/api/vinilos`, {
    method: 'POST',
    headers: authJson(token),
    body: JSON.stringify(datos),
  })
  return res.json()
}

export const actualizarVinilo = async (id, datos, token) => {
  const res = await fetch(`${BASE}/api/vinilos/${id}`, {
    method: 'PUT',
    headers: authJson(token),
    body: JSON.stringify(datos),
  })
  return res.json()
}

export const eliminarVinilo = async (id, token) => {
  const res = await fetch(`${BASE}/api/vinilos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}
