let form = document.querySelector('.b7validator');

let b7Validador = {
  handleSubmit: event => {
    event.preventDefault(); // previne o comportamento padrão
    let send = true;

    let inputs = form.querySelectorAll('input');

    b7Validador.clearErrors();

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      let check = b7Validador.checkInput(input);
      if (check !== true) {
        send = false;
        b7Validador.showError(input, check);
      }
    }

    if (send) {
      form.submit();
    }
  },
  checkInput: input => {
    let rules = input.getAttribute('data-rules');

    if (rules !== null) {
      rules = rules.split('|');
      for (let item in rules) {
        let rulesDetails = rules[item].split('=');
        switch (rulesDetails[0]) {
          case 'required':
            if (input.value == '') {
              return 'Campo não pode ser vazio.';
            }
            break;
          case 'min':
            if (input.value.length < rulesDetails[1]) {
              return (
                'Campo tem que ter pelo menos ' +
                rulesDetails[1] +
                ' caracteres'
              );
            }
            break;
          case 'email':
            if (input.value !== '') {
              let regex =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (!regex.test(input.value.toLowerCase())) {
                return 'E-mail digitado não é válido!';
              }
            }
            break;
        }
      }
    }

    return true;
  },
  showError: (input, error) => {
    input.style.borderColor = '#ff0000';
    let errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = error;

    input.parentElement.insertBefore(errorElement, input.nextElementSibling);
  },
  clearErrors: () => {
    let inputs = form.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style = '';
    }
    let errorElements = document.querySelectorAll('.error');
    for (let i = 0; i < errorElements.length; i++) {
      errorElements[i].remove();
    }
  }
};

form.addEventListener('submit', b7Validador.handleSubmit);
