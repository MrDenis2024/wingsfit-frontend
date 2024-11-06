const { I } = inject();

const pageMap: Record<string, string> = {
  'входа как клиент': '/login/client',
  'входа как тренер': '/login/trainer',
};

const userPasswords = {
  'client@fit.local': 'test',
  'trainer@fit.local': 'test',
}

Given('я нахожусь на странице {string}', (page: string) => {
  I.amOnPage(pageMap[page]);
});

When('ввожу в поле {string} значение {string}', (name: string, value: string) => {
  I.fillField(name, value); 
});

When('нажимаю на кнопку {string}', (name: string) => {
  I.click(`button[type='submit']`);
});

Then('я вижу сообщение {string}', (message: string) => {
  I.see(message);
});
