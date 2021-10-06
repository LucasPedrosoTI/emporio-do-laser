const cpfCnpj = $('#cpfCNPJ');

$('input[name="pfOuPj"]').on('click change', function (e) {
  $('#form-cadastro').removeClass('visually-hidden');

  if ($('input[name="pfOuPj"]:checked')[0].value === 'pf') {
    $('#cpfCNPJ').on('keypress', function (e) {
      $('#cpfCNPJ').mask('000.000.000-00');
    });
  } else {
    $('#cpfCNPJ').on('keypress', function (e) {
      $('#cpfCNPJ').mask('00.000.000/0000-00', { reverse: true });
    });
  }
});
