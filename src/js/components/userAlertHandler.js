import { customModalAlert } from './customModal.js';

export const exibirMensagemErroAPI = (data, statusCode = null) => {
    let mensagemErro = '';

    if (statusCode) {
        mensagemErro = 'Erro status: ' + statusCode + '\n\n';
    }

    for (const campo in data) {
        mensagemErro += `\n${campo}: `;
        const erros = data[campo];
        if (Array.isArray(erros)) {
            mensagemErro += erros.join(', ') + '\n';
        } else {
            mensagemErro += erros + '\n';
        }
    }

    customModalAlert.abrirModal(mensagemErro.trim(), 'Fechar');
};



export const exibirMensagemErroComum = (mensagem, statusCode = null) => {
    let mensagemErro = '';
    if (statusCode) {
        mensagemErro = 'Erro status: ' + statusCode + '\n\n';
    }
    mensagemErro += mensagem;
    customModalAlert.abrirModal(mensagemErro.trim(), 'Fechar');
};


export const exibirMensagemSucesso = (mensagem) => {
    customModalAlert.abrirModal(mensagem.trim(), 'Fechar');
}