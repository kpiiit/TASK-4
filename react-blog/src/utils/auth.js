// src/utils/auth.js

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('users')) || [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}
