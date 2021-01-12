export const removeMaskCPF = cpf => {
  var newCPF = '';
  for (const clear of cpf) {
    if (clear !== '.' || clear !== '-') {
      newCPF += clear;
    }
  }
  return newCPF;
}

export const removeMaskCEP = cep => {
  var newCEP = '';
  for (const clear of cep) {
    if (clear !== '-') {
      newCEP += clear;
    }
  }
  return newCEP;
}
