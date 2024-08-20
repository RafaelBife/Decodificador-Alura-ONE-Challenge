const textArea = document.querySelector(".decodificador__conteudo__texto");
const mensagemResultado = document.querySelector(".decodificador__resultado__texto");
const layoutResultado = document.querySelector(".decodificador__resultado");
const layoutResultadoVazio = document.querySelector(".decodificador__resultado__vazio");

// As "chaves" de criptografia que utilizaremos são:
// A letra "e" é convertida para "enter"
// A letra "i" é convertida para "imes"
// A letra "a" é convertida para "ai"
// A letra "o" é convertida para "ober"
// A letra "u" é convertida para "ufat"

layoutResultadoVazio.style.display = "block";
layoutResultado.style.display = "none";

function rejeitarMaiusculosOuEspeciais(textArea) {
    // Expressão regular para verificar caracteres maiúsculos e caracteres especiais 
    const regex = /^(?!\s*$)[a-z\s:,;!.?]+$/;
    // Verifica se a string contém qualquer caractere maiúsculo ou especial
    if (regex.test(textArea)) {
        return false; // Rejeitar a string
    }
    return true; // Aceitar a string
}
function verificarInput() {
    if (textArea.value.length == 0) {
        layoutResultadoVazio.style.display = "block";
        layoutResultado.style.display = "none";
    } else {
        layoutResultadoVazio.style.display = "none";
        layoutResultado.style.display = "block";
    }
}

function verificarResultado() {
    if (mensagemResultado.value.length == 0) {
        layoutResultadoVazio.style.display = "block";
        layoutResultado.style.display = "none";
    } else {
        layoutResultadoVazio.style.display = "none";
        layoutResultado.style.display = "block";
    }
}

function btnCriptografar() {
    rejeitarMaiusculosOuEspeciais(textArea)
    if (rejeitarMaiusculosOuEspeciais(textArea.value) == true) {
        alertPersonalizado();
        verificarInput();
        mensagemResultado.value = "";
    } else {
        const textoCriptografado = criptografar(textArea.value);
        mensagemResultado.value = textoCriptografado;
        textArea.value = "";
        verificarResultado();  
    }
    verificarResultado();
}

function criptografar(stringCriptografada) {
    let matrizCodigo = [["e" , "enter"] , ["i" , "imes"] , ["a" , "ai"] , ["o" , "ober"] , ["u" , "ufat"]];
    stringCriptografada = stringCriptografada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if(stringCriptografada.includes(matrizCodigo[i][0])) {
            stringCriptografada = stringCriptografada.replaceAll(matrizCodigo[i][0] , matrizCodigo [i][1]);
        }
    }
    return stringCriptografada;
}

function btnDescriptografar() {
    rejeitarMaiusculosOuEspeciais(textArea)
    if (rejeitarMaiusculosOuEspeciais(textArea.value) == true) {
        alertPersonalizado();
        verificarInput();
        mensagemResultado.value = "";
    } else {
        const textoDescriptografado = descriptografar(textArea.value);
        mensagemResultado.value = textoDescriptografado;
        textArea.value = "";
        verificarResultado();
    }
    verificarResultado();
}

function descriptografar(stringDescriptografada) {
    let matrizCodigo = [["e" , "enter"] , ["i" , "imes"] , ["a" , "ai"] , ["o" , "ober"] , ["u" , "ufat"]];
    stringDescriptografada = stringDescriptografada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if(stringDescriptografada.includes(matrizCodigo[i][1])) {
            stringDescriptografada = stringDescriptografada.replaceAll(matrizCodigo[i][1] , matrizCodigo [i][0]);
        }
    }
    return stringDescriptografada;
}

function btnCopiar() {
    mensagemResultado.select();
    document.execCommand("copy");
    mensagemResultado.value = "";
    verificarResultado();
}

function alertPersonalizado() {
    //biblioteca <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Digite um texto utilizando apenas letras minúsculas, sem acento e/ou caracteres especiais.",
});
}