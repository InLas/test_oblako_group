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
