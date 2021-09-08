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
