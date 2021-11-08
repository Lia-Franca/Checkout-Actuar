import { TipoDocumentoEnum, ExtensaoArquivo } from './contrato.enum';

export class ContratoHelper {
    public static obterContratoBase64(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = function() {
                const reader = new FileReader();

                reader.onloadend = () => {
                    resolve(String(reader.result));
                }

                reader.readAsDataURL(xhr.response);
            };

            xhr.onerror = (error) => {
                reject(error);
            }

            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        });
    }

    public static obterNomeArquivo(nome: string, tipoDocumento: number): string {
        nome = nome ? nome : 'contrato';
        const timestamp = new Date().getTime();

        return ContratoHelper.removerCaracteresEspeciais(nome) + '_' + timestamp + '.' + ContratoHelper.obterExtensaoArquivo(tipoDocumento);
    }

    public static obterExtensaoArquivo(tipoDocumento: number): string {
        switch (tipoDocumento) {
            case TipoDocumentoEnum.MODELO:
                return ExtensaoArquivo.MODELO;
            case TipoDocumentoEnum.UPLOAD:
                return ExtensaoArquivo.UPLOAD;
            default:
                return ExtensaoArquivo.UPLOAD;
        }
    }

    public static removerCaracteresEspeciais(nome: string): string {
        let nomeSemCaracteresEspeciais = nome;

        nomeSemCaracteresEspeciais = ContratoHelper.removerAcentos(nomeSemCaracteresEspeciais);
        nomeSemCaracteresEspeciais = ContratoHelper.converterEspacoParaUnderline(nomeSemCaracteresEspeciais);

        return nomeSemCaracteresEspeciais.toLocaleUpperCase();
    }

    public static removerAcentos(nome: string): string {
        const nomeComAcento = nome.split('');

		let nomeSemAcento: Array<any> | string = new Array();
		const tamanhoNome = nomeComAcento.length;
		
        const letrasComAcento = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
		const letrasSemAcento = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';
		
        for (var y = 0; y < tamanhoNome; y++) {
			if (letrasComAcento.indexOf(nomeComAcento[y]) != -1) {
				nomeSemAcento[y] = letrasSemAcento.substr(letrasComAcento.indexOf(nomeComAcento[y]), 1);
			} else {
                nomeSemAcento[y] = nomeComAcento[y];
            }
		}
		
        nomeSemAcento = nomeSemAcento.join('');
		
        return nomeSemAcento;
    }

    public static converterEspacoParaUnderline(nome: string): string {
        return nome.replace(/ /g,"_");
    }
}
