document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const first_name = document.getElementById("fname").value;
    const last_name = document.getElementById("lname").value;
    const email = document.getElementById("email").value;

    fetch("http://127.0.0.1:5005/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Registration successful! Please log in.");
          window.location.href = "login.html";
        } else {
          alert("Username already exists.");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
