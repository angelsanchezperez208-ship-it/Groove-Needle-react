const BASE = import.meta.env.VITE_API_URL

export const registrar = async ({ nombre, email, password }) => {
  const res = await fetch(`${BASE}/api/usuarios/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password }),
  })
  return res.json()
}

export const login = async ({ email, password }) => {
  const res = await fetch(`${BASE}/api/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return res.json()
}

export const getPerfil = async (token) => {
  const res = await fetch(`${BASE}/api/usuarios/perfil`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export const getUsuarios = async (token) => {
  const res = await fetch(`${BASE}/api/usuarios`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export const eliminarUsuario = async (id, token) => {
  const res = await fetch(`${BASE}/api/usuarios/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}
