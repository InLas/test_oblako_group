const $members = $('.members__list');

if ($members) {

  const $membersChecksAll = $('.members__input--all');
  const $membersChecks = $('.members__input');
  const $membersDrop = $('.members__drop');

  $membersChecksAll.on('click', function () {

    if ($(this).is(':checked')) {
      $(this).closest('.members__item').nextAll().children($membersChecks).prop('checked', true);
    } else {
      $(this).closest('.members__item').nextAll().children($membersChecks).prop('checked', false);
    }

  });

  $membersDrop.children('.members__item--all').fadeOut();

  $(function () {

    $('#members__list').sortable({
      containment: $('.members__container'),
      connectWith: '#members__drop',
      items: '.members__item:not(:first)',
      snap: '#members__list, #members__drop',
      snapMode: 'inner',
      snapTolerance: 50,
      activate: function () {
        $membersDrop.addClass('members__drop--active');
      },
      deactivate: function () {
        $membersDrop.removeClass('members__drop--active');
      }
    });

    $membersDrop.sortable({
      containment: $('.members__container'),
      connectWith: '#members__list',
      items: '.members__item:not(:first)',
      update: function () {
        removeMember();
      },
    });

  });

  function removeMember() {

    if ($membersDrop.children('.members__item').length < 2) {
      $('.members__info').fadeIn(1000);
      $membersDrop.children('.members__item--all').fadeOut(500);

    } else if ($membersDrop.children('.members__item').length > 1) {
      $('.members__info').fadeOut(1000);
      $membersDrop.children('.members__item--all').fadeIn(500);
    }

  };

  const $membersDel = $('.members__del');

  $membersDel.on('click', function () {

    let del = $(this).parent();
    $('.members__list').append(del);
    removeMember();

  });

}