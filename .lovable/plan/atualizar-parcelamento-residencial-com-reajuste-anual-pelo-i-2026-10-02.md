# Atualizar parcelamento residencial com reajuste anual pelo IPCA

## Resultado
- Manter os valores residenciais atuais como valores iniciais oficiais: lote de R$ 90.000, entrada de R$ 9.000 e oito opções de 36x a 240x.
- Identificar todas as parcelas como iniciais e informar que o reajuste anual pelo IPCA ocorre conforme contrato.
- Remover qualquer redação que possa sugerir parcelas fixas durante todo o financiamento.

## Alterações
- Atualizar cards, tabela de condições, simulador, mensagens de WhatsApp, rodapé e demais menções ao parcelamento residencial.
- Incluir perguntas frequentes explicando: parcela mantida por ciclos de 12 meses; primeiro reajuste após 12 meses; reajustes cumulativos apenas sobre parcelas futuras; parcelas pagas não são recalculadas; sem juros ou encargos não previstos.
- Diferenciar claramente “parcela inicial” de “projeção”. Não exibir projeção numérica enquanto faltarem período de referência, defasagem de divulgação e regra para IPCA negativo.
- Manter as condições comerciais sem alterações.
- Manter a imagem atual do mapa, pois o PDF disponível é uma planta de disponibilidade e não contém condições financeiras nem a expressão “parcelas fixas”.

## Regra técnica
- Centralizar os textos e parâmetros residenciais junto aos valores em `src/lib/site.ts`.
- Quando a cláusula contratual completa for fornecida, a projeção seguirá capitalização anual sobre a parcela vigente, sem retroatividade ou dupla correção.

## Validação
- Conferir desktop e celular, simulador residencial e comercial, textos, links de WhatsApp e ausência de promessa de parcelas fixas.
