const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
const b = new Promise((resolve, reject) => {
    window.addEventListener('beforeinstallprompt', (t) => {
        Object.assign(window, { inst: t });
        resolve(window.inst);
    });
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    window.inst ? window.inst.prompt() : await b;
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    switch (true) {
        case (!window.inst):
            return;
        default:
            return window.inst = !window.inst;
    }
});
