function doLogin() {
    let emailInput = document.getElementById('email-input');
    let passwordInput = document.getElementById('password-input');

    let jsonData = {
        email: emailInput.value,
        password: passwordInput.value,
        userId: ''
    };

    fetch('http://localhost:3000/findLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                localStorage.setItem('userId', data.userId)
                document.getElementById('success-message');
                window.location.href = "../index.html"
             })
            } else {
                response.text().then(mensagem => {                  
                    const messageContainer = document.getElementById('message-container');
                    const messageReturn = JSON.parse(mensagem)
                    messageContainer.innerHTML = messageReturn.error;
                    messageContainer.style.display = 'block';
                });
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro ao tentar fazer login:', error);
            alert('Ocorreu um erro ao tentar fazer login!');
        });
}

const loginForm = document.getElementById('fields-form');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    doLogin();
});

// TODO: colocar o redirecionamento do código para página de cadastro
const registerButton = document.getElementById('register-button');
registerButton.addEventListener('click', function () {
    window.location.href = "../register/index.html";
});