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