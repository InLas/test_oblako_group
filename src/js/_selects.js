const $selects = $('.selects');

if ($selects) {
  const $select = $('.selects__select');
  const $selectors = $('.selects__selector');

  $select.on('click', function (evt) {
    evt.preventDefault();
    this.blur();
    let $current = $(this);

    $current.parent($selects).toggleClass('selects--active');

    $(document).on('click', function (evt) {

      if (!$current.is(evt.target)) {
        $current.parent($selects).removeClass('selects--active');
      }

    });

  });

  const $planingProgram = $selects.closest('.planning__program');

  $planingProgram.find('.selects__selector').first().addClass('selects__selector--active');

  $selectors.on('click', function (evt) {
    evt.preventDefault();

    $(this).closest($selects).find($select).html($(this).html());
    $(this).closest($selects).find($selectors).removeClass('selects__selector--active');
    $(this).addClass('selects__selector--active');

  });

}