var intervalId;

function temporizador() {
    const display = document.getElementById("timer-display");
    const input = document.getElementById("timer-input");
    const time = document.getElementById("time-input").value;
    const botaoIniciar = document.getElementById("botao-iniciar");
    const botaoParar = document.getElementById("botao-parar");

    const partes = time.split(':');
    const horas = parseInt(partes[0]);
    const minutos = parseInt(partes[1]);
    const segundos = parseInt(partes[2]);

    if(isNaN(horas) || isNaN(minutos) || isNaN(segundos)) {
        alert("Por favor, insira um tempo válido no formato HH:mm:ss.");
        return;
    }
    else {
        input.hidden = true;
        botaoIniciar.hidden = true;
        display.hidden = false;
        botaoParar.hidden = false;
    }

    let tempoFinal = Date.now() + (horas * 3600000 + minutos * 60000 + segundos * 1000);

    intervalId = setInterval((function relogio() {
        const tempoAtual = Date.now();
        const diferenca = tempoFinal - tempoAtual;
        if (diferenca < 0) {
            clearInterval(intervalId);
            display.textContent = "00:00";
            return;
        }
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);  
        display.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        if (minutos === 0 && segundos === 0) {
            clearInterval(intervalId);
        }
        
        return relogio;
    })(), 1000);
}

function pararTemporizador() {
    const display = document.getElementById("timer-display");
    const input = document.getElementById("timer-input");
    const botaoIniciar = document.getElementById("botao-iniciar");
    const botaoParar = document.getElementById("botao-parar");
    
    display.textContent = "";
    display.hidden = true;
    input.hidden = false;
    botaoIniciar.hidden = false;
    botaoParar.hidden = true;

    clearInterval(intervalId);
}