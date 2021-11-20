$(document).ready(function () {
  $('.date').mask('00/00/0000');
  $('.time').mask('00:00:00');
  $('.date_time').mask('00/00/0000 00:00:00');
  $('.cep').mask('00000-000');
  $('.phone').mask('0000-0000');
  $('.phone_with_ddd').mask('(00) 00000-0000', { clearIfNotMatch: true });
  $('.phone_us').mask('(000) 000-0000');
  $('.mixed').mask('AAA 000-S0S');
  $('.cpf').mask('000.000.000-00', { reverse: true });
  $('.cnpj').mask('00.000.000/0000-00', { reverse: true });
  $('.money').mask('000.000.000.000.000,00', { reverse: true });
  $('.money2').mask('#.##0,00', { reverse: true });
  $('.card_number').mask('0000 0000 0000 0000');
  $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
    translation: {
      Z: {
        pattern: /[0-9]/,
        optional: true,
      },
    },
  });
  $('.ip_address').mask('099.099.099.099');
  $('.percent').mask('##0,00%', { reverse: true });
  $('.clear-if-not-match').mask('00/00/0000', { clearIfNotMatch: true });
  $('.placeholder').mask('00/00/0000', { placeholder: '__/__/____' });
  $('.fallback').mask('00r00r0000', {
    translation: {
      r: {
        pattern: /[\/]/,
        fallback: '/',
      },
      placeholder: '__/__/____',
    },
  });
  $('.selectonfocus').mask('00/00/0000', { selectOnFocus: true });
});

const currencyformatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const percentFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const round = (num, numDecimais) => {
  const casasDecimais = Math.pow(10, numDecimais);

  return Math.round(num * casasDecimais) / casasDecimais;
};

function returnErrorAlert(message) {
  return `
  <div class="alert alert-danger alert-dismissible fade show mt-4" id="error-alert" role="alert">
    <i class="bi bi-x-circle-fill"></i> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
`;
}
