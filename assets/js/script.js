let form = document.querySelector('.b7validator');

let b7Validador = {
  handleSubmit: event => {
    event.preventDefault(); // previne o comportamento padrão
    let send = true;

    let inputs = form.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      let check = b7Validador.checkInput(input);
      if (check !== true) {
        send = false;
        //exibir o erro
        console.log(check);
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
            if (input.value === '') {
              return 'Campo não pode ser vazio.';
            }
            break;
          case 'min':
            break;
        }
      }
    }

    return true;
  }
};

form.addEventListener('submit', b7Validador.handleSubmit);
