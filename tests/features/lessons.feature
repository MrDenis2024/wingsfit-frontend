# language: ru

Функционал: Работа с занятиями
    Как пользователь сайта(тренер), я должен иметь возможность
    создавать и удалять задачи.

    @createLesson
    Сценарий: Успешное создание занятия!
        Допустим я нахожусь на странице "создания задач"
        И ввожу в поле "course" значение "672cade9cc1f8f43e89c74ff"
        И ввожу в поле "title" значение "lesson-1"
        И ввожу в поле "timeZone" значение "+4 GTM"
        И ввожу в поле "quantityClients" значение "3"
        И ввожу в поле "groupLevel" значение "2"
        И ввожу в поле "ageLimit" значение "3"
        И ввожу в поле "description" значение "LESSON_1"
        И нажимаю на кнопку "Save"
        Тогда я вижу сообщение "Class Schedule"

    @createLessonWithEmptyTitle
    Сценарий: Создание занятия с пропущеным полем!
        Допустим я нахожусь на странице "создания задач"
        И ввожу в поле "course" значение "672cade9cc1f8f43e89c74ff"
        И ввожу в поле "timeZone" значение "+4 GTM"
        И ввожу в поле "quantityClients" значение "3"
        И ввожу в поле "groupLevel" значение "2"
        И нажимаю на кнопку "Save"
        Тогда я вижу сообщение "Fill in the fields: Course, Title, Time Zone, Quantity clients, Group Level!"

    @createLessonWithoutOptionalFields
    Сценарий: Cоздание занятия без необязательных полей!
        Допустим я нахожусь на странице "создания задач"
        И ввожу в поле "course" значение "672cade9cc1f8f43e89c74ff"
        И ввожу в поле "title" значение "lesson-1"
        И ввожу в поле "timeZone" значение "+4 GTM"
        И ввожу в поле "quantityClients" значение "3"
        И ввожу в поле "groupLevel" значение "2"
        И нажимаю на кнопку "Save"
        Тогда я вижу сообщение "Class Schedule"
