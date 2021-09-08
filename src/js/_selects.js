const selectes = document.querySelectorAll('.selects');

if (selectes) {
  selectes.forEach(selects => {
    const select = selects.querySelector('.selects__select');
    const drop = selects.querySelector('.selects__drop');
    const selectors = selects.querySelectorAll('.selects__selector');

    // select.addEventListener('click', (evt) => {
    //   evt.preventDefault();
    //   selects.classList.toggle('selects--active');
    // });

    // document.addEventListener('click', function (e) {
    //   const target = e.target;
    //   const its_drop = target == drop || drop.contains(target);
    //   const its_select = target == select;
    //   const selects_is_active = selects.classList.contains('selects--active');

    //   if (!its_drop && !its_select && selects_is_active) {
    //     selects.classList.toggle('selects--active');
    //   }
    // });

    selectors.forEach(selector => {
      selector.addEventListener('click', (evt) => {
        evt.preventDefault();

        select.textContent = selector.dataset.param;
      });
    });
  });
}