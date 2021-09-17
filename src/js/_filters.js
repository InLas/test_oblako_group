const $filters = $('.filters');

if ($filters) {

  $filters.each(function () {

    const $filterItems = $(this).find($('.filters__item'));
    const $openSetFilters = $(this).find($('.filters__btn--set'));
    const $inputSelectors = $(this).find($('.filters__input--selector'));
    const $settingFilters = $(this).find($('.setting-filter'));
    const $resets = $(this).find($('.filters__btn--reset'));
    const $closeBtns = $(this).find($('.setting-filter__btn--cancel'));
    const $okBtns = $(this).find($('.setting-filter__btn--ok'));
    const $checkboxes = $(this).find($('.setting-filter__checkbox'));

    $openSetFilters.on('click', function () {

      let $current = $(this);

      $(this).siblings($settingFilters).toggleClass('setting-filter--active');

      $(document).on('click', function (evt) {

        if (!$current.is(evt.target) && !$current.siblings($settingFilters).is(evt.target) && $current.siblings($settingFilters).has(evt.target).length === 0) {
          $current.siblings($settingFilters).removeClass('setting-filter--active');
        }

      });

    });

    $resets.on('click', function () {

      $checkboxes.each(function () {

        let $currentCheckbox = $(this);

        $filterItems.each(function () {

          if ($currentCheckbox.attr('data-filter') !== 'search' && $currentCheckbox.attr('data-filter') !== 'program' && $currentCheckbox.attr('data-filter') !== 'trening' && $currentCheckbox.attr('data-filter') !== 'trener') {
            $currentCheckbox.prop('checked', false);
          } else {
            $currentCheckbox.prop('checked', true);
          }

          if ($(this).attr('data-filter') !== 'search' && $(this).attr('data-filter') !== 'program' && $(this).attr('data-filter') !== 'trening' && $(this).attr('data-filter') !== 'trener') {
            $(this).removeClass('filters__item--show');
          } else {
            $(this).addClass('filters__item--show');
          }

        });

      });

    });

    $closeBtns.on('click', function () {

      $(this).closest($settingFilters).removeClass('setting-filter--active');

    });

    $checkboxes.each(function () {

      let $currentCheckbox = $(this);

      $filterItems.each(function () {

        if ($currentCheckbox.is(':checked') && $currentCheckbox.attr('data-filter') === $(this).attr('data-filter')) {
          $(this).addClass('filters__item--show');
        }

      });

    });

    $okBtns.on('click', function () {

      $checkboxes.each(function () {

        let $currentCheckbox = $(this);

        $filterItems.each(function () {

          if ($currentCheckbox.is(':checked') && $currentCheckbox.attr('data-filter') === $(this).attr('data-filter')) {
            $(this).addClass('filters__item--show');
          } else if ($currentCheckbox.is(':checked') === false && $currentCheckbox.attr('data-filter') === $(this).attr('data-filter')) {
            $(this).removeClass('filters__item--show');
          }

        });

      });

      $(this).closest($settingFilters).removeClass('setting-filter--active');

    });

    $inputSelectors.on('click', function (evt) {

      evt.preventDefault();
      this.blur();

      let $current = $(this);
      let $parent = $(this).parent($filterItems);
      let $filterDrop = $(this).parent($filterItems).children('.filters__drop');

      $parent.toggleClass('filters__item--active');

      $(document).on('click', function (evt) {

        if (!$current.is(evt.target) && !$filterDrop.is(evt.target) && $filterDrop.has(evt.target).length === 0) {
          $parent.removeClass('filters__item--active');
        }

      });

    });

    $filterItems.each(function () {

      const $inputSelectors = $(this).find($('.filters__input--selector'));
      const $filterSelects = $(this).find($('.filters__select'));
      let $resultMore = 1;

      $filterSelects.on('click', function (evt) {

        evt.preventDefault();

        let $result = $(this).attr('data-param');
        let $content = `<span class="filters__multiple">${$result}</span>`
        let $contentMore = `<span class="filters__more">${$resultMore}</span>`

        if (!$(this).hasClass('filters__select--active')) {
          $(this).addClass('filters__select--active');

          if ($inputSelectors.children().length === 0) {
            $inputSelectors.append($content);
          } else if ($inputSelectors.children('.filters__more').length > 0) {
            $resultMore += 1;
            $inputSelectors.children('.filters__more').html($resultMore);
          } else if ($inputSelectors.children().length > 0) {
            $inputSelectors.prepend($contentMore);
          }

        } else {
          $(this).removeClass('filters__select--active');

          if ($inputSelectors.children('.filters__more').length > 0 && $inputSelectors.children('.filters__more').html() <= 1) {
            $inputSelectors.children('.filters__more').remove('.filters__more');

          } else if ($inputSelectors.children('.filters__more').length > 0) {
            $resultMore -= 1;
            $inputSelectors.children('.filters__more').html($resultMore);

          } else if ($inputSelectors.children('.filters__more').length === 0) {
            $inputSelectors.children('.filters__multiple').remove('.filters__multiple');
          }

          $filterSelects.each(function () {

            let $currentSelect = $(this);

            if ($currentSelect.hasClass('filters__select--active') && $inputSelectors.children('.filters__multiple').text() === $result) {

              $inputSelectors.children('.filters__multiple').html($currentSelect.html());

            }

          });

        }
      });

    });

  });

}