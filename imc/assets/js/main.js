const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Remove resultado anterior se existir
    const resultadoAnterior = document.querySelector('.resultado-imc');
    if (resultadoAnterior) {
        resultadoAnterior.remove();
    }
    
    // Cria novo resultado
    const resultado = document.createElement('span');
    resultado.className = 'resultado-imc';
    resultado.style.display = 'flex';
    resultado.style.justifyContent = 'center';
    resultado.style.alignItems = 'center';
    resultado.style.marginTop = '20px';
    resultado.style.fontSize = '18px';
    resultado.style.fontWeight = 'bold';
    resultado.style.color = 'black';
    resultado.style.backgroundColor = 'rgba(73, 218, 32, 0.65)';
    resultado.style.padding = '10px';
    resultado.style.borderRadius = '5px';
    resultado.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    
    form.appendChild(resultado);
    
    const peso = parseFloat(document.getElementById('peso').value);
    const alturaInput = document.getElementById('altura').value;
    
    // Validação dos campos vazios
    if (!peso || !alturaInput) {
        resultado.textContent = 'Por favor, preencha todos os campos';
        resultado.style.color = 'red';
        return;
    }

    // Tratamento da altura
    let altura;
    if (alturaInput.includes(',')) {
        // Se usar vírgula, converte para ponto
        altura = parseFloat(alturaInput.replace(',', '.'));
    } else {
        altura = parseFloat(alturaInput);
    }

    // Se a altura for maior que 3, assume que está em centímetros e converte para metros
    if (altura > 3) {
        altura = altura / 100;
    }

    // Validação da altura
    if (altura <= 0 || altura > 3) {
        resultado.textContent = 'Por favor, insira uma altura válida (entre 0 e 3 metros)';
        resultado.style.color = 'red';
        return;
    }
    
    const imc = peso / (altura * altura);
    let classificacao = '';
    
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
        resultado.style.backgroundColor = 'rgba(238, 238, 17, 0.76)'; // Amarelo
    } else if (imc < 24.9) {
        classificacao = 'Peso normal';
        resultado.style.backgroundColor = 'rgba(73, 218, 32, 0.65)'; // Verde
    } else if (imc < 29.9) {
        classificacao = 'Sobrepeso';
        resultado.style.backgroundColor = 'rgba(255, 165, 0, 0.65)'; // Laranja
    } else if (imc < 34.9) {
        classificacao = 'Obesidade grau 1';
        resultado.style.backgroundColor = 'rgba(174, 114, 2, 0.65)'; // Laranja
    } else if (imc < 39.9) {
        classificacao = 'Obesidade grau 2';
        resultado.style.backgroundColor = 'rgba(255, 0, 0, 0.65)'; // Vermelho
    } else {
        classificacao = 'Obesidade grau 3';
        resultado.style.backgroundColor = 'rgba(130, 21, 239, 0.65)'; // Roxo
    }
    
    resultado.textContent = `Seu IMC é ${imc.toFixed(2)} - ${classificacao}`;
    resultado.style.color = 'black';
});
