import produce from 'immer';

export default function cart(state = [], action) {

  switch (action.type) {

    case 'ADD_TO_CART':
      // METODO SEM IMMER
      // return[ ...state, {
      //   ...action.product,
      //   amount:1
      // } ];
      /////////////////////
      // METODO COM IMMER//
      ////////////////////
      return produce(state, draft => {

        // // AQUI DENTRO FOI FEITO UMA LOGICA QUE IRA VARRER TODO MEU STATE REDUX PARA SABER
        // SE JA EXISTE PRODUTOS NO CARRINHO, CASO JA EXISTA ELE VAI SALVAR NO STATE DO REDUCER E SOMARA O amount
        // PARA QUE POSSAR TER DOIS PRODUTOS E NAO REPLICAR OS PRODUTO POR DO FINDINDEX E DO IF
        // CASO NAO TENHA ELE IRA ADICIONA O PRIMEIRO
        // ISSO TUDO SO OCORRE QUANDO PRODUTO OU ELE É IGUAL OU NUNCA FOI ADD
        const productIndex = draft.findIndex(p => p.id === action.product.id);

        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({
            ...action.product,
            amount: 1
          });
        }

      });
    case 'REMOVE_FROM_CART':

      return produce(state, draft => {

        const productIndex = draft.findIndex(p => p.id === action.id);

        if(productIndex){
          draft.splice(productIndex, 1);
        }

      });

    default:
      return state;
  }

};
