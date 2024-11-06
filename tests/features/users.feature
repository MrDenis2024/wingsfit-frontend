# language: ru

Функционал: Работа с пользователем
    Как пользователь сайта, я должен иметь возможность
    зарегистрироваться, залогиниться, и выйти из аккаунта.

    @loginAsClient
    Сценарий: Логин как клиент
        Допустим я нахожусь на странице "входа как клиент"
        И ввожу в поле "email" значение "client@fit.local" 
        И ввожу в поле "password" значение "test"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "Class Schedule"
    
    @loginAsTrainer
    Сценарий: Логин как тренер
        Допустим я нахожусь на странице "входа как тренер"
        И ввожу в поле "email" значение "trainer@fit.local" 
        И ввожу в поле "password" значение "test"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "Class Schedule"

    @loginAsDontExistClient
    Сценарий: Логин как не существующий клиент
        Допустим я нахожусь на странице "входа как клиент"
        И ввожу в поле "email" значение "errorClient@fit.local" 
        И ввожу в поле "password" значение "test"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "User not found!"
    
    @loginAsDontExistTrainer
    Сценарий: Логин как не существующий тренер
        Допустим я нахожусь на странице "входа как тренер"
        И ввожу в поле "email" значение "errorTrainer@fit.local" 
        И ввожу в поле "password" значение "test"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "User not found!"

    @loginClientWithIncorrectPassword
    Сценарий: Логин как клиент с неверным поролем
        Допустим я нахожусь на странице "входа как клиент"
        И ввожу в поле "email" значение "client@fit.local" 
        И ввожу в поле "password" значение "incorrectPassword"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "Password is wrong!"
    
    @loginTrainerWithIncorrectPassword
    Сценарий: Логин как тренер с неверным поролем
        Допустим я нахожусь на странице "входа как тренер"
        И ввожу в поле "email" значение "trainer@fit.local" 
        И ввожу в поле "password" значение "incorrectPassword"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "Password is wrong!"