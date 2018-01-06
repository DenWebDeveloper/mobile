// Dom7
var $ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: theme,
  data: function() {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function() {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});

//GET   ukryama.com/xml?page=0
var items = [];
function getPit() {
  var offset = 0;
  var xhr = new XMLHttpRequest();

  // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
  xhr.open('GET', 'https://ukryama.com/xml?page=' + offset++, true);
  xhr.setRequestHeader('Content-Type', 'text/xml');
  xhr.setRequestHeader("Content-Type", "application/xml");
  // 3. Отсылаем запрос
  xhr.send();

  // 4. Если код ответа сервера не 200, то это ошибка
  if (xhr.status != 200) {
    // обработать ошибку
    console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
  } else {
    // вывести результат
    console.log(xhr.responseText); // responseText -- текст ответа.
    console.log(offset);
  }
}

setInterval(function() {
  var b = 20
  items.push({
    title: 'Item ' + b++,
    subtitle: 'Subtitle ' + b++
  });
  virtualList.update();
  getPit();
}, 5000)


var virtualList = app.virtualList.create({
  // List Element
  el: '.virtual-list',
  // Pass array with items
  items: items,
  // Custom search function for searchbar
  searchAll: function(query, items) {
    var found = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
    }
    return found; //return array with mathced indexes
  },
  // List item Template7 template
  itemTemplate: '<li>' +
    '<a href="#" class="item-link item-content">' +
    '<div class="item-inner">' +
    '<div class="item-title-row">' +
    '<div class="item-title">{{title}}</div>' +
    '</div>' +
    '<div class="item-subtitle">{{subtitle}}</div>' +
    '</div>' +
    '</a>' +
    '</li>',
  // Item height
  height: app.theme === 'ios' ? 63 : 73,
});
