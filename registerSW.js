(() => {
    if (!('serviceWorker' in navigator)) return;

    window.addEventListener('load', async () => {
        try {
            const registrations = await navigator.serviceWorker.getRegistrations();
            await Promise.all(registrations.map(registration => registration.unregister()));
        } catch (error) {
            console.warn('xH all in one: service worker cleanup failed', error);
        }

        try {
            if ('caches' in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map(key => caches.delete(key)));
            }
        } catch (error) {
            console.warn('xH all in one: cache cleanup failed', error);
        }
    });
})();
