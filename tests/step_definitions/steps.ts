const { I } = inject();

Given("я нахожусь на странице регистрация клиента", () => {
  I.amOnPage("/register/client");
});

Given("я нахожусь на странице регистрация тренера", () => {
  I.amOnPage("/register/trainer");
});

When(
  "ввожу в поле {string} значение {string}",
  (name: string, value: string) => {
    I.fillField(name, value);
  },
);

When("нажимаю на кнопку {string}", (name: string) => {
  I.click(`//button[contains(., '${name}')]`);
});

Then("я вижу сообщение {string}", (message: string) => {
  I.see(message);
});

const pageMap: Record<string, string> = {
  "входа как клиент": "/login/client",
  "входа как тренер": "/login/trainer",
  "создания задач": "/add-new-lesson",
  "входа как админ": "/admin-login",
  "создание админа": "/admin/create-new-admin",
};

const userPasswords = {
  "client@fit.local": "test",
  "trainer@fit.local": "test",
  superAdmin: "superAdmin",
};

Given("я нахожусь на странице {string}", (page: string) => {
  I.amOnPage(pageMap[page]);
});

Given("я залогинен как {string}", (userName: string) => {
  I.amOnPage(pageMap["входа как админ"]);
  I.fillField("Username", userName);
  I.fillField("Password", userPasswords[userName]);
  I.click(`//button[contains(., 'Get Started')]`);
  I.waitForNavigation(1);
});

When(
  "ввожу в поле {string} значение {string}",
  (name: string, value: string) => {
    I.fillField(name, value);
  },
);

When("нажимаю на кнопку {string}", (name: string) => {
  I.click(`button[type='submit']`);
});

Then("я вижу сообщение {string}", (message: string) => {
  I.see(message);
});

Given("я нахожусь на странице заполнение формы курса", () => {
  I.amOnPage("/add-new-course");
});

When(
  "ввожу в поле {string} значение {string}",
  (name: string, value: string) => {
    I.fillField(name, value);
  },
);

When("нажимаю на кнопку {string}", (name: string) => {
  I.click(`//button[contains(., '${name}')]`);
});

Then("я вижу сообщение {string}", (message: string) => {
  I.see(message);
});
