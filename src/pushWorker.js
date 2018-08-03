// Created inline https://web-push-codelab.glitch.me/
const applicationServerPublicKey = 'BCTILdidAKEp7ZpSF3HbvdZdi7CHZQhvXGAUSqjn8-6-HwdOvYM5P12FWrdRPr3Ds89xzDFGb_L3LHwJVnk02F0';
// private key 8mj8W5G-wjhfYgcDtB9vVVz9B5g7KQaYWZ1w8xm0KGk
const pushButton = document.querySelector('.js-push');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('/sw.js')
    .then(function (swReg) {
      console.log('Service Worker 注册成功', swReg);

      swRegistration = swReg;
      initialiseUI();
    })
    .catch(function (error) {
      console.error('Service Worker 注册失败', error);
    });
} else {
  console.warn('当前环境不支持推送消息');
  pushButton.textContent = '当前环境不支持推送消息';
}

function initialiseUI() {
  pushButton.addEventListener('click', function () {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });

  Notification.requestPermission(function (result) {
    isSubscribed = result === 'granted'
    subscribeUser()
    console.log("Notificationission : ", result);
  });
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = '用户禁止推送消息';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = '停止订阅';
  } else {
    pushButton.textContent = '启用订阅';
  }

  pushButton.disabled = false;
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function (subscription) {
    console.log('用户订阅了:', subscription);

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function (err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails = document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}