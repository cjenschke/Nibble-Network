// public/js/logout.js:
document.addEventListener('DOMContentLoaded', function () {
    const logoutLink = document.getElementById('logout');

    logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        fetch('/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (response.ok) {
                    location.href = '/login';
                } else {
                    alert('Logout failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});
