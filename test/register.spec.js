import { createUser } from '../src/lib/auth.js';
import { register } from '../src/components/register';


jest.mock('../src/lib/auth.js');

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('Unit tests for register', () => {
  let inputEmail;
  let inputPassword;
  let buttonDataRegister;
  let failureText;

  beforeEach(() => {
    const onNavigateMock = () => {};
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    document.body.appendChild(register(onNavigateMock));
    inputEmail = document.getElementById('email');
    inputPassword = document.getElementById('password');
    buttonDataRegister = document.querySelector('.button-register');
    failureText = document.querySelector('.failure-text');
  });

  it('should display an error message if the email is invalid', async () => {
    createUser.mockRejectedValueOnce(new Error('auth/invalid-email'));

    inputEmail.value = 'invalid-email';
    inputPassword.value = 'password';

    buttonDataRegister.click();
    await tick();

    expect(failureText.textContent).toBe('Wait! Invalid email!');
    expect(failureText.classList.contains('failure-text-hidden')).toBe(false);
  });

  it('should display an error message if the password is too short', async () => {
    inputEmail.value = 'valid-email@example.com';
    inputPassword.value = 'short';

    buttonDataRegister.click();
    await tick();
    console.log(failureText.textContent)
    expect(failureText.textContent).toBe(
      'Spaceship Error! Your password needs 6 characters!'
    );
    expect(failureText.classList.contains('failure-text-hidden')).toBe(false);
  });

  it('should display an error message if the email is already in use', async () => {
    createUser.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
    const errorMessage = 'Email already in use';
    inputEmail.value = 'existing-email@example.com';
    inputPassword.value = 'Am0jzw56941+U';
  
    buttonDataRegister.click();
    await tick();

    expect(failureText.textContent).toBe(errorMessage);
    expect(failureText.classList.contains('failure-text-hidden')).toBe(false);
  });
  
/*   it('should not display an error message when succesful register', async () => {
    createUser.mockResolvedValueOnce({
      user: { userCredential: 12345, email: 'validemail@mail.com' },
    });

    inputEmail.value = 'validemail@mail.com';
    inputPassword.value = 'validpassword';

    buttonDataRegister.click();
    await tick();

    expect(failureText.textContent).toBe('');
  
    //expect(failureText.classList.contains('failure-text-hidden')).not.toBe(false);
  }); */
  
});
