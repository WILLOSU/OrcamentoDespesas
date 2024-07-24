

class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados() {
		for(let i in this) { // recupera chaves ou atributo
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	} // este i retorna o índice,
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id') // caso não existe

		if(id === null) {
			localStorage.setItem('id', 0) // setando e colocando o valor zero
		}
	}
     
	// primeiro verifica se já existe o id
	// 
	getProximoId() {
		let proximoId = localStorage.getItem('id') 
		return parseInt(proximoId) + 1 // somando + 1
	}
     
	// GRAVANDO EM LOCAL STORAGE
	gravar(d) {
		let id = this.getProximoId()
        
		// CONVERSÃO DE OBJETO LITERAL PARA JSON
		// CRIAMOS UM ID UNICO
		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id) // atualizando o id
	}

	recuperarTodosRegistros() {

		//array de despesas
		let despesas = Array()

		let id = localStorage.getItem('id')

		//recuperar todas as despesas cadastradas em localStorage
		for(let i = 1; i <= id; i++) {

			//recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i))
			// os dados esntão em JSON e precisamos trazer
			// como objetos literais, por isso usamos o .parse

			//existe a possibilidade de haver índices que foram pulados/removidos
			//nestes casos nós vamos pular esses índices
			
			if(despesa === null) {
				continue
			}
			despesa.id = i
			despesas.push(despesa)

			//usando o método push para recupar o array
		}

		return despesas
	}
     // desta forma aproveitamos bastante os códigos
	pesquisar(despesa){
         
		// retornando os dados para aplicar os filtros
		// Importante! o objeto local storage não fornece
		// nenhum método que nos permita fazer isso 
		// diretamente

		/*Usando a função call back
          recuperamos o array, executar o método filter
		  passando a função de call back , a função de call back recebe um parâmetro que é o valor contido naquele determinado índice, já que vamos percorrer
		  cada um dos índices,e na sequencia precisamos retornar true ou false.
		*/

		let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()
		console.log(despesasFiltradas);
		console.log(despesa)

		//filter (filtro) ano
		if(despesa.ano != ''){
			console.log("filtro de ano");
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}
			
		//filter (filtro) mes
		if(despesa.mes != ''){
			console.log("filtro de mes");
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		//filter (filtro) dia
		if(despesa.dia != ''){
			console.log("filtro de dia");
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		//filter (filtro) tipo
		if(despesa.tipo != ''){
			console.log("filtro de tipo");
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		//filter (filtro) descricao
		if(despesa.descricao != ''){
			console.log("filtro de descricao");
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		//filter (filtro) valor
		if(despesa.valor != ''){
			console.log("filtro de valor");
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		
		return despesasFiltradas

	}

	remover(id){
		localStorage.removeItem(id)
	}
}

let bd = new Bd()

// PRIMEIRO CÓDIGO
function cadastrarDespesa() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value,
		valor.value
	)


	if(despesa.validarDados()) {
		bd.gravar(despesa)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		//dialog de sucesso
		$('#modalRegistraDespesa').modal('show') 

		ano.value = '' 
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''
		
	} else {
		
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		//dialog de erro
		$('#modalRegistraDespesa').modal('show') 
	}
}

// será chamada sempre quando houver um unload do body
// de consulta HTML 
function carregaListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false){
		despesas = bd.recuperarTodosRegistros() 
	}
	

	/*

	<tr>
		<td>15/03/2018</td>
		<td>Alimentação</td>
		<td>Compras do mês</td>
		<td>444.75</td>
	</tr>

	*/

	let listaDespesas = document.getElementById("listaDespesas")
    listaDespesas.innerHTML = ''
	despesas.forEach(function(d){

		//Criando a linha (tr)
		var linha = listaDespesas.insertRow();

		//Criando as colunas (td)
		// backtick ``
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` 

		//Ajustar o tipo
		switch(d.tipo){
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
			
		}
		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		//Criar o botão de exclusão
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fa fa-times"  ></i>'// botão fechar
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function(){// remover a despesa
			let id = this.id.replace('id_despesa_','')
			//alert(id)
			bd.remover(id)
			window.location.reload()// atualiza a página
		}
		linha.insertCell(4).append(btn)
		console.log(d) // identificando a despesa

	})

 }

 
 function pesquisarDespesa(){
	 
	let ano  = document.getElementById("ano").value
	let mes = document.getElementById("mes").value
	let dia = document.getElementById("dia").value
	let tipo = document.getElementById("tipo").value
	let descricao = document.getElementById("descricao").value
	let valor = document.getElementById("valor").value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	let despesas = bd.pesquisar(despesa)
	 
	this.carregaListaDespesas(despesas, true)

 }

 /*
 	Local Storage



 */
