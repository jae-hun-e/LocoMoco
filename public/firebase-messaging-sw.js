// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// 푸시 이벤트 처리
// 푸시 내용을 처리해서 알림으로 띄운다.
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json().data;

    const options = {
      title: data.title,
      body: data.body,
      icon: data.image,
      image: data.image,
      data: {
        click_action: data.click_action, // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  } else {
    console.log('This push event has no data.');
  }
});

// 클릭 이벤트 처리
// 알림을 클릭하면 사이트로 이동한다.
self.addEventListener('notificationclick', function (event) {
  event.preventDefault();
  event.notification.close();

  const urlToOpen = event.notification.data.click_action;

  // 클라이언트에 해당 사이트가 열려있는지 체크
  const promiseChain = self.clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then(function (windowClients) {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(urlToOpen)) {
          matchingClient = windowClient;
          break;
        }
      }

      // 열려있다면 focus, 아니면 새로 open
      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return self.clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});
