document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['username'], function(result) {
        if (result.username) {
            document.getElementById('greeting').textContent = `¡Hola, ${result.username}!`;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('backgroundImage', function(result) {
        if(result.backgroundImage) {
            document.body.style.backgroundImage = `url('${result.backgroundImage}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.opacity = '0.8';
        }
    });
});