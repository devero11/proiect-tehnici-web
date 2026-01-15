const form = document.getElementById('loginForm');

  form.addEventListener('submit', async function(event) {
    event.preventDefault(); 


    const username = document.getElementById('uname').value.trim();
    const password = document.getElementById('psw').value.trim();

    const passwordRegex = /^.{6}$/;

  if (!passwordRegex.test(password)) {
    alert("Password too short!");
    return;   }
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
      alert(":(");
    }
});



document.body.addEventListener('click', async function(event) {
   let x = window.getComputedStyle(document.body)
   let color = x.getPropertyValue("background-color")

   const numbers = color.match(/\d+/g).map(Number);
    
    numbers[Math.floor(Math.random()*3)] = Math.floor(Math.random()*255)
  console.log("rgb("+ numbers[0] +","+numbers[1]+","+numbers[2] +")")
   document.body.style.backgroundColor = "rgb("+ numbers[0] +","+numbers[1]+","+numbers[2] +")"
})
document.getElementById("loginForm").addEventListener('click', async function(event) {
  event.stopPropagation()
})
