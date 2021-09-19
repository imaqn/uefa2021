function NotifAdd(group){
    const title = `saved`;
    const options = {
        'body': `${group} profile has been saved`,
        'icon': '/img/icon-512x512.png',
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    }
}
export {NotifAdd};