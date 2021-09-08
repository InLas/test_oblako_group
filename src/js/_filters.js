const forms = document.querySelectorAll('.filters');

if (forms) {
  forms.forEach(form => {

    const filterItems = form.querySelectorAll('.filters__item');
    const openFilters = form.querySelectorAll('.filters__btn--set');
    const settingFilters = form.querySelectorAll('.setting-filter');
    const resets = form.querySelectorAll('.filters__btn--reset');

    filterItems.forEach(filterItem => {
      const inputSelector = filterItem.querySelector('.filters__input--selector');

      if (inputSelector) {
        const filterDrop = filterItem.querySelector('.filters__drop');
        const filterSelects = filterItem.querySelectorAll('.filters__select');

        inputSelector.textContent = 'Все';

        inputSelector.addEventListener('click', (evt) => {
          evt.preventDefault();
          filterItem.classList.toggle('filters__item--active');
        });

        document.addEventListener('click', function (e) {
          const target = e.target;
          const its_filterDrop = target == filterDrop || filterDrop.contains(target);
          const its_inputSelector = target == inputSelector;
          const filterItem_is_active = filterItem.classList.contains('filters__item--active');

          if (!its_filterDrop && !its_inputSelector && filterItem_is_active) {
            filterItem.classList.toggle('filters__item--active');
          }
        });

        filterSelects.forEach(filterSelect => {
          filterSelect.classList.add('filters__select--active');
          let filterSelectResultMore = 1;

          filterSelect.addEventListener('click', (evt) => {
            evt.preventDefault();

            if (!filterSelect.classList.contains('filters__select--active')) {
              filterSelect.classList.add('filters__select--active');

              let filterSelectResult = filterSelect.dataset.param;

              let content = `<span class="filters__multiple">${filterSelectResult}<button class="filters__multiple-del"></button></span>`

              let contentMore = `<span class="filters__multiple--more">${filterSelectResultMore}</span>`

              if (inputSelector.textContent === 'Все') {
                inputSelector.textContent = '';
                inputSelector.insertAdjacentHTML('beforeend', content);
              } else if (inputSelector.querySelector('.filters__multiple--more')) {
                filterSelectResultMore += 1;
                inputSelector.querySelector('.filters__multiple--more').textContent = filterSelectResultMore;
              } else {
                inputSelector.insertAdjacentHTML('afterbegin', contentMore);
              }
            } else {
              filterSelect.classList.remove('filters__select--active');

              if (inputSelector.querySelector('.filters__multiple--more') && inputSelector.querySelector('.filters__multiple') && inputSelector.querySelector('.filters__multiple--more').textContent > 1) {
                filterSelectResultMore -= 1;
                inputSelector.querySelector('.filters__multiple--more').textContent = filterSelectResultMore;
              } else if (inputSelector.querySelector('.filters__multiple') && inputSelector.querySelector('.filters__multiple--more') && inputSelector.querySelector('.filters__multiple--more').textContent <= 1) {
                inputSelector.removeChild(inputSelector.firstChild);
              } else if (inputSelector.querySelector('.filters__multiple') && !inputSelector.querySelector('.filters__multiple--more')) {
                inputSelector.removeChild(inputSelector.firstChild);
              }
            }
          });
        });
      }
    });

    settingFilters.forEach(settingFilter => {

      const closeBtn = settingFilter.querySelector('.setting-filter__btn--cancel');
      const okBtn = settingFilter.querySelector('.setting-filter__btn--ok');
      const checkboxes = settingFilter.querySelectorAll('.setting-filter__checkbox');

      openFilters.forEach(openFilter => {
        openFilter.addEventListener('click', () => {
          if (!settingFilter.classList.contains('setting-filter--active')) {
            settingFilter.classList.add('setting-filter--active');
          } else {
            settingFilter.classList.remove('setting-filter--active');
          }
        });

        document.addEventListener('click', function (e) {
          const target = e.target;
          const its_settingFilter = target == settingFilter || settingFilter.contains(target);
          const its_openFilter = target == openFilter;
          const settingFilter_is_active = settingFilter.classList.contains('setting-filter--active');

          if (!its_settingFilter && !its_openFilter && settingFilter_is_active) {
            settingFilter.classList.toggle('setting-filter--active');
          }
        });
      });

      closeBtn.addEventListener('click', () => {
        settingFilter.classList.remove('setting-filter--active');
      });

      checkboxes.forEach(checkbox => {
        filterItems.forEach(filterItem => {
          if (checkbox.checked && checkbox.id === filterItem.dataset.filter) {
            filterItem.classList.add('filters__item--show');
          }
        });
      });

      okBtn.addEventListener('click', () => {
        checkboxes.forEach(checkbox => {
          filterItems.forEach(filterItem => {
            if (checkbox.checked && checkbox.id === filterItem.dataset.filter) {
              filterItem.classList.add('filters__item--show');
            } else if (checkbox.checked === false && checkbox.id === filterItem.dataset.filter) {
              filterItem.classList.remove('filters__item--show');
            }
            settingFilter.classList.remove('setting-filter--active');
          });
        });
      });

      resets.forEach(reset => {
        reset.addEventListener('click', () => {
          checkboxes.forEach(checkbox => {
            filterItems.forEach(filterItem => {
              if (checkbox.id !== 'search' && checkbox.id !== 'program' && checkbox.id !== 'trening' && checkbox.id !== 'trener') {
                checkbox.checked = false;
              } else {
                checkbox.checked = true;
              }

              if (filterItem.dataset.filter !== 'search' && filterItem.dataset.filter !== 'program' && filterItem.dataset.filter !== 'trening' && filterItem.dataset.filter !== 'trener') {
                filterItem.classList.remove('filters__item--show');
              } else {
                filterItem.classList.add('filters__item--show');
              }
            });
          });
        });
      });

    });
  });
}