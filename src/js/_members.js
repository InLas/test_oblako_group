const $members = $('.members__list');

if ($members) {

  const $membersChecksAll = $('.members__input--all');
  const $membersChecks = $('.members__input');

  $membersChecksAll.click(function () {

    if ($(this).is(':checked')) {
      $membersChecks.prop('checked', true);
    } else {
      $membersChecks.prop('checked', false);
    }

  });

  $(function () {

    $('#members__list').sortable({
      containment: $('.members__container'),
      connectWith: '#members__drop',
      items: '.members__item:not(:first)',
      snap: '#members__list, #members__drop',
      snapMode: 'inner',
      snapTolerance: 50,
      activate: function () {
        $('#members__drop').addClass('members__drop--active');
      },
      deactivate: function () {
        $('#members__drop').removeClass('members__drop--active');
      }
    });

    $('#members__drop').sortable({
      connectWith: '#members__list',
      items: '.members__item:not(:first)',
    });

  });

}