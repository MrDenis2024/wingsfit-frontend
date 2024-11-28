# language: ru

Функционал: Работа с трейнером
  Как пользователь сайта, я должен иметь возможность
  создавать курсы.

  @createCourse
  Сценарий: Создание курса
    Допустим я залогинен как тренер "trainer1@fit.local"
    И я нахожусь на странице заполнение формы курса
    И ввожу в поле "title" значение "бокс"
    И ввожу в поле "courseType" значение "Yoga"
    И ввожу в поле "description" значение ""
    И ввожу в поле "format" значение "group"
    И ввожу в поле "schedule" значение "вторник , четвернг"
    И ввожу в поле "scheduleLength" значение "30 min"
    И ввожу в поле "price" значение "20"
    И ввожу в поле "maxClients" значение "25"
    И ввожу в поле "image" значение ""
    И нажимаю на кнопку "Save"
    Тогда я вижу сообщение "Courses"

  @createCourseWithMissingRequiredFields
  Сценарий: Создание курса с отсутствующими обязательными полями
    Допустим я залогинен как тренер "trainer1@fit.local"
    И я нахожусь на странице заполнение формы курса
    И ввожу в поле "title" значение ""
    И ввожу в поле "courseType" значение "Yoga"
    И ввожу в поле "description" значение "бокс описание"
    И ввожу в поле "format" значение "group"
    И ввожу в поле "schedule" значение "вторник , четвернг"
    И ввожу в поле "scheduleLength" значение "30 min"
    И ввожу в поле "price" значение "1500"
    И ввожу в поле "maxClients" значение "25"
    И ввожу в поле "image" значение "imageGroup"
    И нажимаю на кнопку "Save"
    Тогда я вижу сообщение "Заполните это поле"

  @createCourseWithOptionalFields
  Сценарий: Создание курса с необязательными полями
    Допустим я залогинен как тренер "trainer1@fit.local"
    И я нахожусь на странице заполнение формы курса
    И ввожу в поле "title" значение "Танцы"
    И ввожу в поле "courseType" значение "Yoga"
    И ввожу в поле "description" значение "танцы описание"
    И ввожу в поле "format" значение "group"
    И ввожу в поле "schedule" значение "вторник , четвернг"
    И ввожу в поле "scheduleLength" значение "30 min"
    И ввожу в поле "price" значение "1500"
    И ввожу в поле "maxClients" значение "25"
    И ввожу в поле "image" значение "imageGroup"
    И нажимаю на кнопку "Save"
    Тогда я вижу сообщение "Courses"