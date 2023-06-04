import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { Form } from '@unform/web';

import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { VTextField } from '../../shared/forms';

export const DetalheDePessoas: React.FC = () => {

  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  
  const [ isLoading, setIsLoading ] = useState(false);
  const [ nome, setNome ] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            console.log(result);
            setNome(result.nomeCompleto);
          }
        });
    }
  }, [id]);

  const handleSalvar = () => {
    console.log('Salvar');
  };

  const handleApagar = (id: number) => {
    if (confirm('Realmente deseja apagar ?')) {
      PessoasService.deleteById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso');
          navigate('/pessoas');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={ id === 'nova' ? 'Nova pessoa' : `Detalhe de ${nome}` }
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={ id !== 'nova' }
          mostrarBotaoApagar={ id !== 'nova' }

          aoClicarEmSalvar={ handleSalvar }
          aoClicarEmSalvarEFechar={ handleSalvar }
          aoClicarEmApagar={() => handleApagar(Number(id)) }
          aoClicarEmNovo={() => { navigate('/pessoas/detalhe/nova'); }}
          aoClicarEmVoltar={() => { navigate('/pessoas'); }}
        />
      }
    >
      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}
      DetalheDePessoas {id}

      <Form onSubmit={(dados) => console.log(dados)}>
        <VTextField 
          name='nomeCompleto'
        />

        <button type='submit'>Submit</button>
      </Form>

    </LayoutBaseDePagina>
  );
};