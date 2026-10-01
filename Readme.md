

# sistema de chamados ifpe

#desenvolvedor do projeto: kauã henrique leandro lins, discente do instituto tecnologico de pernambuco (IFPE) campus paulista
atualmente no 2º período de análise e desenvolvimento de sistemas (ads) e estágiario em suporte técnico

# obervaçoes: 
O sistema foi desenvolvido como parte do desafio de ingresso na liga de engenharia de software (LES) do ifpe
como eu trabalho atualmente com suporte técnico sei a importância de um sistema de chamados então resolvi fazer com esse tema, 
o projeto tem como objetivo demonstrar conhecimentos básicos e programação, manipulação de arquivos binários, estruturas de dados e implementação de operações CRUD


# Resumo sobre o programa 
O programa que eu desenvolvi é um sistema dinamico de chamados onde o usuário pode 
registrar um chamado colocando as seguintes informações (categoria, setor, descrição) de acordo com as opções já estabelecidas
após isso o programa salva o chamado registrado e atribui um identificador e o status de aberto, posteriormente o usuário consegue ver os chamados 
que ele já registrou, consegue alterar algumas informaçoes atribuidas ou então mesmo mudar o status do chamado para fechado, ou até mesmo excluir o chamado,
o programa fica rodando até o usuário querer sair dele.

# linguagem e ferramentas utilizadas
utilizei a linguagem de programação javascript, node.js e alguns módulos nativos do proprio node.js

# requisitos que voce precisa para rodar 
foi utilizado nesse programa apenas node.js
para verficar se o node.js está instalado no computador
verifique isso executando -> ''' bash node -v no terminal

# funcionalidades:

cadastrar: 
permite cadastrar um novo chamado informando categoria, setor, descrição

listar:
exibe todos os chamados cadastrados mostrando 
ID
categoria
setor
descrição
status

atualizar:
permite localizar um chamado pelo seu id e alterar as suas informações
também é possivel alterar o status do chamado para fechado

excluir:
permite remover um chamado informando o seu id

# persistencia dos dados:
Os chamados são armazenados em um arquivo binario que está na pasta
data e em um arquivo com o nome de chamados.bin -> data/chamados.bin

# exemplo de uso

O menu principal é esse abaixo que de acordo com o número que você digita ele vai para funcionalidade
daquele respectivo número
============= SISTEMA DE CHAMADOS IFPE =============
1 - Cadastrar chamado
2 - Listar chamados
3 - Atualizar chamado
4 - Excluir chamado6
5 - Sair


caso aperte 1 vai para cadastrar o chamado onde você tem que digitar as seguintes informações (categoria, setor, descriçao) dos chamados nessa ordem. abaixo está um exemplo paa você preencher a
categoria caso dé enter ou digite algo que não esteja nas opções ele volta para o menu

Digite a categoria do chamado [computador não liga], [computador sem internet], [setor sem internet], [periférico com defeito], [outros]

caso aperte 2 você vé os chamados já cadastrados 
ID: 3
categoria: setor sem internet
setor: marketing
descrição: energia caiu
status: Aberto
-----------------
ID: 4
categoria: computador não liga
setor: administrativo
descrição: computador pifou
status: Aberto

caso aperte 3 você consegue atualizar um chamado através do id, o usuário pode tanto mudar as informações ja passadas ou fechar o chamado 

digite o ID do chamado que você quer atualizar: 5

digite a nova categoria, se quiser manter aperte enter: setor sem internet

digite o novo setor, se quiser manter aperte enter: 

digite a nova descrição, se quiser manter aperte enter: 
digite 'fechado' se quiser fechar o chamado, se não aperte enter: 
chamado atualizado com sucesso

caso aperte 4 você consegue excluir um chamado pelo id

digite o ID do chamado que você quer deletar:

caso aperte 5 aparece uma mensgame dizendo que você saiu do programa


# estrutura do projeto:
src/sistema.js
contém o código principal do sistena, incluindo o menu e a operações CRUD

src/opcoes.js
contém as opcoes válidas de categorias e etores utilizadas pelo sistema

data/chamados.bin
arquivo binário utilizado para armazenar os chamados

package.json
contém as informações e configurações do projeto node.js

# como executar
execute git clone https://github.com/kauahlins/projeto-chamados-lesIFpe
entre na pasta do projeto executando -> cd projeto-chamadosIFPE
depois execute o node no terminal na pasta -> node src/sistema.js
se você tiver o node.js
e depois disso ele vai estar rodando 
