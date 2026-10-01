///importa os arrays de opcoes
const { categorias, setores } = require("./opcoes")

/// importa o modulo do node.js que permite trabahar com arquivos
const fs = require("fs")

/// cria uma variavel que vai utilizar a funcionalidade de trabalhar com arquivos
const v8 = require("v8")


/// array que vai guardar os chamados
let chamados = carregarChamados()

const readline = require("readline")
/// interface que consegue pegar o que o usuário digitou
const entrada = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



/// funçao que permite guardar os dados dos chamados
function salvarChamados(chamados) {
    /// cria uma variavel que guarda o array 'chamados' em formato binario
    const dados = v8.serialize(chamados)
    ///grava os dados na pasta 'chamados.bin'
    fs.writeFileSync("data/chamados.bin", dados)
}

/// funçao responsavel por pegar os dados binarios e tranformar em array novamente
function carregarChamados() {
    ///faz a verificação se a pasta está vazia, se sim retorna um array vazio
    if (!fs.existsSync("data/chamados.bin")) {
        return []
    }
    /// lé a pasta que contém os arquivos binarios
    const dados = fs.readFileSync("data/chamados.bin")
    /// deserializa os dados binarios para o array 
    const chamados = v8.deserialize(dados)

    return chamados

}


/// funçao que cadastra o chamado ou seja adiciona o objeto 'chamado' no array 
function cadastrarChamado(chamados) {
    entrada.question("\nDigite a categoria do chamado [computador não liga], [computador sem internet], [setor sem internet], [periférico com defeito], [outros]  :", (categoria) => {

        ///faz a verificação se o usuario digitou algumas das opcoes validas, se nao chama a funçao novamente
        if (!categorias.includes(categoria.toLowerCase().trim())) {
            console.log("categoria inválida! digite uma categoria. ");
            cadastrarChamado(chamados)
            return
        }

        entrada.question("\nDigite o setor do chamado [financeiro] [administrativo] [Recursos Humanos] [TI] [marketing] : ", (setor) => {

            if (!setores.includes(setor.toLowerCase().trim())) {
                console.log("setor inválido digite um setor. ");
                cadastrarChamado(chamados)
                return
            }

            entrada.question("\nDigite uma descrição pro chamado: ", (descriçao) => {

                if (descriçao.trim() == "") {
                    console.log("descriçao inválida digite uma descriçao. ");
                    cadastrarChamado(chamados)
                    return
                }

                /// faz uma condiçao que verifica se o array está vazio se nao estiver ele pega o maior id(math.max) e soma mais 1 para o proximo chamado
                const novoID = chamados.length > 0 ? Math.max(...chamados.map(chamado => chamado.id)) + 1 : 1;

                const novoChamado = {
                    id: novoID,
                    categoria: categoria,
                    setor: setor,
                    descriçao: descriçao,
                    status: "Aberto"
                }
                chamados.push(novoChamado)
                salvarChamados(chamados)
                console.log("Chamado cadastrado com sucesso !!!")
                menu()

            })
        })
    })
}


/// função que lista os chamados ou seja percorre a o array e printa as variaveis dos objetos  
function listarChamado(chamados) {

    if (chamados.length == 0) {
        console.log("\nvocê não tem nenhum chamado\n")
    }
    chamados.forEach((chamado) => {

        console.log(`ID: ${chamado.id}`)
        console.log(`categoria: ${chamado.categoria}`)
        console.log(`setor: ${chamado.setor}`)
        console.log(`descrição: ${chamado.descriçao}`)
        console.log(`status: ${chamado.status}`)
        console.log("-----------------")



    });
    menu()

}

///função que atualiza o chamado ele percorre o array e altera as variaveis dentro do objeto de acordo com o que o usuário digitar
function atualizarChamado(chamados) {
    entrada.question("digite o ID do chamado que você quer atualizar ", (id) => {
        id = Number(id)
        ///variavel usada para procurar dentro do array de chamados o id digitado pelo usuário e retorna o objeto que tem esse id
        const chamado = chamados.find((chamado) => chamado.id === id)

        if (!chamado) {
            console.log("chamado não encontrado")
            menu()
            return
        }
        entrada.question("\ndigite a nova categoria, se quiser manter aperte enter: ", (novaCategoria) => {

            if (novaCategoria !== "" && !categorias.includes(novaCategoria.toLowerCase().trim())) {
                console.log("categoria inválida! digite uma categoria. ");
                atualizarChamado(chamados)
                return
            }

            entrada.question("\ndigite o novo setor, se quiser manter aperte enter: ", (novoSetor) => {

                if (novoSetor !== "" && !setores.includes(novoSetor.toLowerCase().trim())) {
                    console.log("setor inválido digite um setor. ");
                    atualizarChamado(chamados)
                    return
                }

                entrada.question("\ndigite a nova descrição, se quiser manter aperte enter: ", (novaDescrição) => {
                    entrada.question("digite 'fechado' se quiser fechar o chamado, se não aperte enter:  ", (novoStatus) => {
                        if (novaCategoria !== "") {
                            chamado.categoria = novaCategoria
                        }
                        if (novoSetor !== "") {
                            chamado.setor = novoSetor
                        }
                        if (novaDescrição !== "") {
                            chamado.descriçao = novaDescrição
                        }
                        if (novoStatus.toLowerCase() === "fechado") {
                            chamado.status = "Fechado"
                        }
                        salvarChamados(chamados)
                        console.log("chamado atualizado com sucesso")

                        menu()

                    })
                })
            })
        })
    }
    )
}


///funçao que percorre o array de chamados e deleta aquele que tem o id igual ao o que o usuário digitou
function deletarChamado(chamados) {
    entrada.question("digite o ID do chamado que você quer deletar: ", (id) => {
        id = Number(id)

        let encontrado = false

        for (let i = 0; i < chamados.length; i++) {
            if (chamados[i].id == id) {
                encontrado = true
                chamados.splice(i, 1);
                salvarChamados(chamados)
                console.log("chamado resolvido com sucesso")
                break

            }
        }
        if (!encontrado) {
            console.log("\nid não encontrado\n")

        }
        menu()
    })
}


///funçao que printa o menu e as escolhas essa função é chamada para poder dar continuidade ao programa em loop
function menu() {
    console.log("============= SISTEMA DE CHAMADOS IFPE =============")
    console.log("1 - Cadastrar chamado")
    console.log("2 - Listar chamados")
    console.log("3 - Atualizar chamado")
    console.log("4 - Excluir chamado")
    console.log("5 - Sair")

    entrada.question("escolha uma opção :", (opcao) => {
        if (opcao == "1") {
            cadastrarChamado(chamados)
        }
        else if (opcao == "2") {
            listarChamado(chamados)
        }

        else if (opcao == "3") {
            atualizarChamado(chamados)
        }

        else if (opcao == "4") {
            deletarChamado(chamados)
        }

        else if (opcao == "5") {
            console.log("você escolheu sair do sistema...")
            entrada.close()
        }
        else {
            console.log("Opção inválida")
            menu()
        }
    })
}
menu()


