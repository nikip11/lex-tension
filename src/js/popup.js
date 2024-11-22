// popup.js
// Función para cambiar al input y limpiar el nombre anterior
function showNameInput() {
    document.getElementById('welcome-message').style.display = 'none';
    document.getElementById('name-input').style.display = 'block';
    document.getElementById('username').value = '';
}

// Función para mostrar el mensaje de bienvenida y establecer el nombre de usuario
function showWelcomeMessage(username) {
    document.getElementById('welcome-message').style.display = 'block';
    document.getElementById('name-input').style.display = 'none';
    document.getElementById('user-name').textContent = `¡Hola, ${username}!`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Recuperar el nombre de usuario del almacenamiento
    chrome.storage.local.get(['username'], function(result) {
        if (result.username) {
            showWelcomeMessage(result.username);
        } else {
            showNameInput();
        }
    });
});

document.getElementById('save-background').addEventListener('click', () => {
    var fileInput = document.getElementById('background-uploader');
    var file = fileInput.files[0];
    
    if(file && file.type.match('image.*')) {
        var reader = new FileReader();
        
        reader.onloadend = () => {
            // Guardar Data URL en 'chrome.storage.local'
            chrome.storage.local.set({'backgroundImage': reader.result}, () => {
                console.log('Imagen de fondo guardada.');
            });
        };
        
        reader.readAsDataURL(file);
    }
});

// Event listener para guardar el nombre de usuario
document.getElementById('save').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    chrome.storage.local.set({ 'username': username }, function() {
        showWelcomeMessage(username);
    });
});

// Event listener para el enlace 'No eres tú?'
document.getElementById('not-you-link').addEventListener('click', function(event) {
    event.preventDefault();
    showNameInput();
});