const scr = document.createElement('script');
scr.src = 'http://localhost:8097';
setTimeout(() => {
  if (document.head) {
    document.head.appendChild(scr);
  }
}, 1000);
