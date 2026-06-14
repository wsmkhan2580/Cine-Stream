const FK = 'cs_favs', AK = 'cs_auth'
export const storage = {
  getFavs: () => { try { return JSON.parse(localStorage.getItem(FK) || '[]') } catch { return [] } },
  setFavs: (d) => localStorage.setItem(FK, JSON.stringify(d)),
  getAuth: () => { try { return JSON.parse(sessionStorage.getItem(AK) || 'null') } catch { return null } },
  setAuth: (d) => sessionStorage.setItem(AK, JSON.stringify(d)),
  clearAuth: () => sessionStorage.removeItem(AK),
}
