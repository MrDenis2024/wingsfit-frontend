# language: ru

Функционал: Работа с админами
    Как админ сайта, я должен иметь возможность
    создавать админов(superAdmin), залогиниться, и выйти из аккаунта.

    @loginAdmin
    Сценарий: Успешный логин админа
        Допустим я нахожусь на странице "входа как админ"
        И ввожу в поле "userName" значение "superAdmin"
        И ввожу в поле "password" значение "superAdmin"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "Class Schedule"

    @loginAdminDontExistAdmin
        Сценарий: Логин с несуществующим админом 
            Допустим я нахожусь на странице "входа как админ"
            И ввожу в поле "userName" значение "falseAdmin"
            И ввожу в поле "password" значение "superAdmin"
            И нажимаю на кнопку "Get Started"
            Тогда я вижу сообщение "Admin not found or password is incorrect!"

    @loginAdminWithEmptyUserName
        Сценарий: Логин с не заполненным полем 
            Допустим я нахожусь на странице "входа как админ"
            И ввожу в поле "userName" значение "superAdmin"
            И нажимаю на кнопку "Get Started"
            Тогда я вижу сообщение "Username and password are required"

    @createNewAdmin
        Сценарий: Создание новго админа
            Допустим я залогинен как "superAdmin"
            И я нахожусь на странице "создание админа"
            И ввожу в поле "userName" значение "admin"
            И ввожу в поле "password" значение "admin1"
            И нажимаю на кнопку "Save admin"
            Тогда я вижу сообщение "Class Schedule"

    @createNewAdminWithEmptyUserName
        Сценарий: Создание админа с незаполненными полями
            Допустим я залогинен как "superAdmin"
            И я нахожусь на странице "создание админа"
            И нажимаю на кнопку "Save admin"
            Тогда я вижу сообщение "Username and password are required"