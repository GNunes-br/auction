import { adicionaLance, obtemLancesDoLeilao } from '../../src/repositorio/lance'
import apiLeiloes from '../../src/servicos/apiLeiloes'


jest.mock('../../src/servicos/apiLeiloes')

const mockLances = [
    {
        valor: 1000,
        leilaoId: 1,
        id: 1
    },
]

const mockRequisicao = (retorno) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: retorno })
        }, 200)
    })
}

const mockRequisicaoErro = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

describe('repositorio/lance', () => {

    beforeEach(() => {
        apiLeiloes.get.mockClear()
        apiLeiloes.post.mockClear()
    })

    describe('obtemLancesDoLeilao', () => {
        it('deve retornar uma lista de lances do leilao de id 1', async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLances))
            const lances = await obtemLancesDoLeilao(mockLances[0].leilaoId)
            expect(lances).toEqual(mockLances)
            expect(apiLeiloes.get).toHaveBeenCalledWith(`/lances?leilaoId=${mockLances[0].leilaoId}&_sort=valor&_order=desc`)
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
        })
        it('deve retornar uma lista vazia quando a requisição falhar', async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicaoErro())
            const lances = await obtemLancesDoLeilao(mockLances[0].leilaoId)
            expect(lances).toEqual([])
            expect(apiLeiloes.get).toHaveBeenCalledWith(`/lances?leilaoId=${mockLances[0].leilaoId}&_sort=valor&_order=desc`)
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
        })
    })

    describe('adicionaLance', () => {
        it('deve retornar true caso o lance seja salvo com sucesso', async () => {
            apiLeiloes.post.mockImplementation(() => mockRequisicao({}))
            const lance = await adicionaLance({})
            expect(lance).toBe(true)
            expect(apiLeiloes.post).toHaveBeenCalledWith(`/lances`, {})
            expect(apiLeiloes.post).toHaveBeenCalledTimes(1)
        })
        it('deve retornar false caso o lance não seja salvo', async () => {
            apiLeiloes.post.mockImplementation(() => mockRequisicaoErro())
            const lance = await adicionaLance({})
            expect(lance).toBe(false)
            expect(apiLeiloes.post).toHaveBeenCalledWith(`/lances`, {})
            expect(apiLeiloes.post).toHaveBeenCalledTimes(1)
        })
    })
})