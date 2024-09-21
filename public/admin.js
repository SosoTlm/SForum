// Ban User
document.getElementById('banUserForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = e.target.username.value.trim();

    if (username === '') {
        alert('Please enter a username to ban.');
        return;
    }

    const res = await fetch('/ban-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });

    const responseText = await res.text();
    alert(responseText);
    e.target.reset();
});

// Ban Forum
document.getElementById('banForumForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const forumName = e.target.forumName.value.trim();

    if (forumName === '') {
        alert('Please enter a forum name to ban.');
        return;
    }

    const res = await fetch('/ban-forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forumName })
    });

    const responseText = await res.text();
    alert(responseText);
    e.target.reset();
});

// Block Servers
document.getElementById('blockServers').addEventListener('click', async function () {
    const confirmation = confirm('Are you sure you want to block the servers?');
    if (!confirmation) return;

    const res = await fetch('/block-servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    const responseText = await res.text();
    alert(responseText);
    updateServerStatus();
});

// Unblock Servers (optional feature)
document.getElementById('unblockServers')?.addEventListener('click', async function () {
    const confirmation = confirm('Are you sure you want to unblock the servers?');
    if (!confirmation) return;

    const res = await fetch('/unblock-servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    const responseText = await res.text();
    alert(responseText);
    updateServerStatus();
});

// Function to update server status display
async function updateServerStatus() {
    const res = await fetch('/server-status');
    const status = await res.text();
    const serverStatusElement = document.getElementById('serverStatus');

    if (status === 'blocked') {
        serverStatusElement.textContent = 'ALERT: Servers are blocked until the issue is resolved.';
        serverStatusElement.style.color = 'red';
    } else {
        serverStatusElement.textContent = 'Servers are operational.';
        serverStatusElement.style.color = 'green';
    }
}

// Initial server status update on page load
document.addEventListener('DOMContentLoaded', updateServerStatus);
