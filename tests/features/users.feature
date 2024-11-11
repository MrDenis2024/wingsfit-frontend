# language: ru

Функционал: Работа с пользователем
    Как пользователь сайта, я должен иметь возможность
    зарегистрироваться, залогиниться, и выйти из аккаунта.

    @registerAsClient
    Сценарий: Регистрация клиента
        Допустим я нахожусь на странице регистрация клиента
        И ввожу в поле "email" значение "client@fit.local"
        И ввожу в поле "password" значение "test"
        И ввожу в поле "confirmPassword" значение "test"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "Class Schedule"

    @registerAsTrainer
    Сценарий: Регистрация тренера
        Допустим я нахожусь на странице регистрация тренера
        И ввожу в поле "email" значение "trainer@fit.local"
        И ввожу в поле "password" значение "test"
        И ввожу в поле "confirmPassword" значение "test"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "Class Schedule"

    @registeringWithAnExistingUsernameClient
    Сценарий: Регистрация с уже существующим именем пользователя клиента
        Допустим я нахожусь на странице регистрация клиента
        И ввожу в поле "email" значение "client@fit.local"
        И ввожу в поле "password" значение "test"
        И ввожу в поле "confirmPassword" значение "test"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "This user is already registered!"

    @registeringWithAnExistingUsernameTrainer
    Сценарий: Регистрация с уже существующим именем пользователя трейнера
        Допустим я нахожусь на странице регистрация тренера
        И ввожу в поле "email" значение "trainer@fit.local"
        И ввожу в поле "password" значение "test"
        И ввожу в поле "confirmPassword" значение "test"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "This user is already registered!"

    @registrationWithIncompleteClientData
    Сценарий: Регистрация с неполными данными клиента
        Допустим я нахожусь на странице регистрация клиента
        И ввожу в поле "email" значение ""
        И ввожу в поле "password" значение ""
        И ввожу в поле "confirmPassword" значение ""
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "Path email is required."
        Тогда я вижу сообщение "Path password is required."

    @registrationWithIncompleteTrainerData
    Сценарий: Регистрация с неполными данными тренера
        Допустим я нахожусь на странице регистрация тренера
        И ввожу в поле "email" значение ""
        И ввожу в поле "password" значение ""
        И ввожу в поле "confirmPassword" значение ""
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "Path email is required."
        Тогда я вижу сообщение "Path password is required."

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

    @loginAsClientWithEmptyEmail
    Сценарий: Логин как клиент с неполными данными
        Допустим я нахожусь на странице "входа как клиент"
        И ввожу в поле "password" значение "incorrectPassword"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "Email and password are required"

    @loginAsTrainerWithEmptyEmail
    Сценарий: Логин как тренер с неполными данными
        Допустим я нахожусь на странице "входа как тренер"
        И ввожу в поле "password" значение "incorrectPassword"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "Email and password are required"

    @loginAsClientWithEmptyPassword
    Сценарий: Логин как клиент с неполными данными
        Допустим я нахожусь на странице "входа как клиент"
        И ввожу в поле "email" значение "trainer@fit.local"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "Email and password are required"

    @loginAsTrainerWithEmptyPassword
    Сценарий: Логин как тренер с неполными данными
        Допустим я нахожусь на странице "входа как тренер"
        И ввожу в поле "email" значение "client@fit.local"
        И нажимаю на кнопку "Get Started"
        Тогда я вижу сообщение "Email and password are required"