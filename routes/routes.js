page('/', indexController.index);
page('/arena', arenaController.index);
page('/hero', heroController.index);
page('/fetch', UserData.fetchJSON);

page();
