import { formataMaiorLanceDoLeilao } from '../../../src/negocio/formatadores/lance';

describe('negocio/formatadores/lance', () => {
    it('Deve retornar o maior lance entre 80, 90 e 100', () => {
        const resultado = formataMaiorLanceDoLeilao([{ valor: 80},{ valor: 90 },{ valor:100 }], 50)
        expect(resultado).toBe(100)
    })
})