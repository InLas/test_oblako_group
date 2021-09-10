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

    $(this).parent($selects).toggleClass('selects--active');

    $(document).on('click', function (evt) {

      if (!$current.is(evt.target)) {
        $current.parent($selects).removeClass('selects--active');
      }

    });

  });

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
jQuery(document).ready(function () {
  $.datepicker.setDefaults($.datepicker.regional['ru']);
  $('#datepicker1').datepicker({
    dateFormat: 'dd.mm',
    changeYear: true,
    showOn: 'button',
    buttonImage: '../img/svg/calendar.svg',
    buttonImageOnly: true,
  });
  $('#datepicker2').datepicker({
    dateFormat: 'dd.mm',
    changeYear: true,
    showOn: 'button',
    buttonImage: '../img/svg/calendar.svg',
    buttonImageOnly: true,
  });
  $('#datepicker3').datepicker({
    dateFormat: 'dd.mm',
    changeYear: true,
    showOn: 'button',
    buttonImage: '../img/svg/calendar.svg',
    buttonImageOnly: true,
  });
});

(function (factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {

    // AMD. Register as an anonymous module.
    define(['../widgets/datepicker'], factory);
  } else {

    // Browser globals
    factory(jQuery.datepicker);
  }
})(function (datepicker) {
  'use strict';

  datepicker.regional.ru = {
    closeText: 'Закрыть',
    prevText: '&#x3C;Пред',
    nextText: 'След&#x3E;',
    currentText: 'Сегодня',
    monthNames: ['Январь,', 'Февраль,', 'Март,', 'Апрель,', 'Май,', 'Июнь,',
      'Июль,', 'Август,', 'Сентябрь,', 'Октябрь,', 'Ноябрь,', 'Декабрь,'],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
      'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    weekHeader: 'Нед',
    dateFormat: 'dd.mm.yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
  };
  datepicker.setDefaults(datepicker.regional.ru);

  return datepicker.regional.ru;

});;