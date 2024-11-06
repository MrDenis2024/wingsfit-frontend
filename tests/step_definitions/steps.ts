const { I } = inject();

Given('я нахожусь на странице входа', () => {
  I.amOnPage('/login/client');
});

When('ввожу в поле {string} значение {string}', (name: string, value: string) => {
  I.fillField(name, value); 
});

When('нажимаю на кнопку {string}', () => {
  console.log('Click to button');
  I.wait(30);
});

Then('я вижу сообщение {string}', () => {
  console.log('Good work');
});
