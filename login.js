const form = document.getElementById('loginForm');

  form.addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const username = document.getElementById('uname').value.trim();
    const password = document.getElementById('psw').value.trim();

    try {
      const response = await fetch('users.json');
      const users = await response.json();
      const user = users.find(u => u.username === username && u.password === password);

      if(user) {
        window.location.href = "game.html";
      } else {
        alert("Invalid username or password!");
      }
    } catch(error) {
      console.error("Error fetching user data:", error);
      alert("Unable to check credentials. Try again later.");
    }
});
