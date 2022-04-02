let b7Validador = {
  handleSubmit: event => {
    event.preventDefault(); // previne o comportamento padrão
  }
};
let form = document.querySelector('.b7validator');

form.addEventListener('submit', b7Validador.handleSubmit);
