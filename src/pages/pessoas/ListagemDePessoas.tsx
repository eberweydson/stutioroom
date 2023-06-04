import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { IListagemPessoa, PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { useDebounce } from '../../shared/hooks';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { Environment } from '../../shared/environment';

export const ListagemDePessoas: React.FC = () => {

  const navigate = useNavigate();

  const [ searchParams, setSearchParams ] = useSearchParams();
  const { debounce } = useDebounce(1000, false);

  const [ rows, setRows ] = useState<IListagemPessoa[]>([]);
  const [ totalCount, setTotalCount ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(pagina, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        console.log(result);
        setRows(result.data);
        setTotalCount(result.totalCount);
      });
    });
  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar ?')) {
      PessoasService.deleteById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(oldRows => [
            ...oldRows.filter(oldRow => oldRow.id !== id)
          ]);
          alert('Registro apagado com sucesso');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo="Listagem de pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo='Nova'
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          mostrarImputBusca
          //textoDaBusca={searchParams.get('busca') ?? ''}
          textoDaBusca={busca}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
        />
      }
    >

      <TableContainer component={Paper} variant='outlined'
        sx={{ width: 'auto', m: 1 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell align="center">Nome Completo</TableCell>
              <TableCell align="center">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <IconButton size='small' onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size='small' onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination 
                    page={pagina}
                    onChange={(e, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)} 
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>

    </LayoutBaseDePagina>
  );
};