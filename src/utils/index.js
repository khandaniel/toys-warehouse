export const login = (email, password) => {
  fetch('http://localhost:8080/login', {
    body: JSON.stringify({email, password}),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
  }).then(r => r.json()).then(data => localStorage.setItem('bff-toys-token', data.accessToken));
}