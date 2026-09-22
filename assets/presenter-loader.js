(() => {
  const image = document.querySelector('.presenter-image');
  if (!image || !window.__presenterImage) return;
  image.src = `data:image/webp;base64,${window.__presenterImage}`;
  delete window.__presenterImage;
})();
