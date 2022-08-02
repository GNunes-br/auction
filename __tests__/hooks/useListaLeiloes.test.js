import { act, renderHook } from '@testing-library/react-hooks';
import useListaLeiloes from '../../src/hooks/useListaLeiloes';
import { obtemLeiloes } from '../../src/repositorio/leilao';

jest.mock('../../src/repositorio/leilao')

const mockLeiloes = [
    {
        id: 1,
        nome: 'Leilao',
        descricao: 'Descricao do leilao'
    }
]


const mockLeiloesAtualizado = [
    {
        id: 1,
        nome: 'Leilao',
        descricao: 'Descricao do leilao'
    },
    {
        id: 2,
        nome: 'Leilao 2',
        descricao: 'Descricao do leilao 2'
    }
]


describe('hooks/useListaLeiloes', () => {
    it('deve retornar uma lista de leiloes e uma função para atualizar', async () => {
        obtemLeiloes.mockImplementation(() => mockLeiloes)
        const { result, waitForNextUpdate } = renderHook(() => useListaLeiloes())
        expect(result.current[0]).toEqual([])
        await waitForNextUpdate()
        expect(result.current[0]).toEqual(mockLeiloes)
        obtemLeiloes.mockImplementation(() => mockLeiloesAtualizado)
        await act(() => result.current[1]())
        expect(result.current[0]).toEqual(mockLeiloesAtualizado)
    });
});