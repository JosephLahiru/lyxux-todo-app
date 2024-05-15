document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    fetch("http://127.0.0.1:5005/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("isLoggedIn", true);
          window.location.href = "index.html";
        } else {
          alert("Invalid username or password.");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
