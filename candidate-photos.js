(() => {
  let dialog, returnFocus, previousOverflow;
  function makeDialog() {
    dialog = document.createElement('dialog');
    dialog.className = 'candidate-lightbox';
    dialog.setAttribute('aria-labelledby', 'candidate-lightbox-title');
    dialog.innerHTML = '<div class="candidate-lightbox-head"><h2 id="candidate-lightbox-title"></h2><button type="button" aria-label="사진 닫기" autofocus>닫기 ×</button></div><img class="candidate-lightbox-image" alt=""><p class="candidate-lightbox-note"></p><a class="candidate-lightbox-official" target="_blank" rel="noopener noreferrer">공식 객실·시설 사진 보기 ↗</a>';
    document.body.appendChild(dialog);
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => {
      const r = dialog.getBoundingClientRect();
      if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.style.overflow = previousOverflow;
      if (returnFocus && returnFocus.isConnected) returnFocus.focus({preventScroll:true});
    });
    dialog.querySelector('img').addEventListener('error', () => {
      dialog.querySelector('img').hidden = true;
      dialog.querySelector('.candidate-lightbox-note').textContent = '사진을 불러오지 못했습니다. 아래 공식 사진 링크에서 확인해 주세요.';
    });
  }
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-candidate-photo]');
    if (!trigger || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || !window.HTMLDialogElement) return;
    e.preventDefault();
    if (!dialog) makeDialog();
    returnFocus = trigger;
    dialog.querySelector('h2').textContent = trigger.dataset.photoTitle;
    const img = dialog.querySelector('img');
    img.hidden = false;
    img.alt = trigger.dataset.photoTitle;
    img.src = trigger.href;
    dialog.querySelector('.candidate-lightbox-note').textContent = trigger.dataset.photoNote;
    dialog.querySelector('.candidate-lightbox-official').href = trigger.dataset.photoOfficial;
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
})();
