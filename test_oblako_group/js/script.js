'use strict'

const mainNav = document.querySelector('.main-nav');
const burgerMenu = document.querySelector('.controls__btn--burger');
const pageHeader = document.querySelector('.page-header');

if (mainNav) {
  mainNav.classList.remove('main-nav--no-js');

  burgerMenu.addEventListener('click', () => {
    mainNav.classList.toggle('main-nav--closed');
  });


  window.addEventListener('scroll', function () {
    if (this.pageYOffset > 0) {
      pageHeader.classList.add('page-header--scroll');
    } else {
      pageHeader.classList.remove('page-header--scroll');
    }
  });
};
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
      $current.blur();

      $current.siblings($settingFilters).toggleClass('setting-filter--active');

      if ($current.hasClass('filters__btn--active')) {
        $current.removeClass('filters__btn--active');
      } else {
        $current.addClass('filters__btn--active');
      }

      $(document).on('click', function (evt) {

        if (!$current.siblings($settingFilters).hasClass('setting-filter--active')) {

          $current.removeClass('filters__btn--active');
        }

      });

      $(document).on('click', function (evt) {

        if (!$current.is(evt.target) && !$current.siblings($settingFilters).is(evt.target) && $current.siblings($settingFilters).has(evt.target).length === 0) {
          $current.siblings($settingFilters).removeClass('setting-filter--active');
          $current.removeClass('filters__btn--active');
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

};
const activity = document.querySelector('.activity');

if (activity) {
  const activityLinks = activity.querySelectorAll('.activity__link');
  const activityItems = activity.querySelectorAll('.activity__item');

  activityLinks.forEach(activityLink => {
    activityLink.addEventListener('click', (evt) => {
      evt.preventDefault();
      activityLink.classList.add('activity__link--active');
      activityLink.classList.toggle('activity__link--filter');
    });
  });

  activityItems.forEach(activityItem => {
    const activityMenu = activityItem.querySelector('.activity__menu');
    const menuShow = activityItem.querySelector('.activity__btn');

    activityItem.addEventListener('click', () => {
      activityMenu.classList.toggle('activity__menu--active');
      activityItem.blur();
    });

    menuShow.addEventListener('click', () => {
      if (activityMenu.classList.contains('activity__menu--active')) {
        activityMenu.classList.add('activity__menu--active');
      } else {
        activityMenu.classList.remove('activity__menu--active');
      }
      menuShow.blur();
    });

    document.addEventListener('click', function (e) {
      const target = e.target;
      const its_activityMenu = target == activityMenu || activityMenu.contains(target);
      const its_activityItem = target == activityItem;
      const its_menuShow = target == menuShow;
      const activityMenu_is_active = activityMenu.classList.contains('activity__menu--active');

      if (!its_activityMenu && !its_activityItem && !its_menuShow && activityMenu_is_active) {
        activityMenu.classList.toggle('activity__menu--active');
      }
    });
  });
}
;
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

};
const planning = document.querySelector('.planning');

if (planning) {
  const page = document.querySelector('.page');
  const planBtn = document.querySelector('.controls__btn--plan');
  const editBtns = document.querySelectorAll('.menu-activity__btn--edit');
  const planningBtns = planning.querySelectorAll('.planning__btn');
  const planningToogles = planning.querySelectorAll('.planning__toggle');
  const planningPages = planning.querySelectorAll('.planning__page');

  planBtn.addEventListener('click', () => {
    planning.classList.add('planning--active');
    page.classList.add('page--planning');
  });

  editBtns.forEach(editBtn => {
    editBtn.addEventListener('click', () => {
      planning.classList.add('planning--active');
      page.classList.add('page--planning');
    });
  });

  planningBtns.forEach(planningBtn => {
    planningBtn.addEventListener('click', () => {
      planning.classList.remove('planning--active');
      page.classList.remove('page--planning');
    });
  });

  planningToogles.forEach(planningToogle => {

    planningToogle.addEventListener('click', (evt) => {

      planningToogles.forEach(planningToogle => {
        planningToogle.classList.remove('planning__toggle--active');
      });

      const target = evt.target;
      target.classList.add('planning__toggle--active');

      planningPages.forEach(planningPage => {
        planningPage.classList.remove('planning__page--active');

        if (planningToogle.dataset.planning === planningPage.dataset.planning) {
          planningPage.classList.add('planning__page--active');
        }
      });
    });
  });
}
;
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

};
$(document).ready(function () {
  $.datetimepicker.setLocale('ru');
  $('#datepicker1').datetimepicker({
    timepicker: false,
    format: 'd.m',
  });
  $('#datepicker2').datetimepicker({
    timepicker: false,
    format: 'd.m',
  });
  $('#datepicker3').datetimepicker({
    timepicker: false,
    format: 'd.m',
  });
});;