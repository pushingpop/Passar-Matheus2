<template lang="html">
  <div class="nameField">
    <label class="labels">Dados do Capítulo:</label>
    <div class="control">
      <input type="radio" v-model="form.codigo" value="1">
      ISBN:
      <input v-model="form.isbn" class="input" type="text" placeholder="Ex: 9788521631842">
    </div>

    <div class="control">
      <input type="radio" v-model="form.codigo" value="2">
      ISSN:
      <input v-model="form.issn" class="input" type="text" placeholder="Ex: XXXXXXSsdswd">
    </div>

    <div class="control">
      <label class="req">Autor(es): </label>
      <div v-for = "(nome, index) in form.name">
        <input v-model="form.name[index]" class="input" id="autor1" type="text" placeholder="Ex: Paulo da Silva, Maria de Lurdes">
        <button @click="deleteFind(index)">Deletar</button>
      </div>
      <button type="button" name="Adicionar" v-on:click="changeQnt()">Adicionar</button>
    </div>

    <div class="control">
      <label class="">Sigla do Evento: </label>
      <input v-model="form.siglaInst" class="input" type="text" placeholder="Ex: CNNPI">
    </div>

    <div class="control req">
      <label class="req">Nome: </label>
      <input v-model="form.nomeOrgao" class="input" type="text" placeholder="Ex: Congresso Norte Nordeste de Pesquisa e Inovação">
    </div>

    <div class="control req">
      <label class="req">Nº Eventos: </label>
      <input v-model="form.numero" class="input" type="text" placeholder="Ex: 12">
    </div>

    <div class="control req">
      Ano Evento:
      <input v-model="form.ano" class="input" type="text" placeholder="Ex: 2018">
    </div>

    <div class="control req">
      <label class="req">Cidade do Evento</label>
      <input v-model="form.cidade" class="input" type="text" placeholder="Ex: Maceió">
    </div>

    <div class="control">
      <label class="req">Título: </label>
      <input v-model="form.titulo" class="input" type="text" placeholder="Ex: Catalogação e descrição bibliográfica">
    </div>

    <div class="control" v-show = "form.titulo != '' ">
      Subtítulo:
      <input v-model="form.subtitulo" class="input" type="text" placeholder="Ex: contribuições a uma teoria">
    </div>

    <div class="control req">
      <label class="req">Cidade de Publicação:</label>
      <input v-model="form.cidadePub" class="input" type="text" placeholder="Ex: Recife">
    </div>

    <div class="control req">
      <label class="req">Editora: </label>
      <input v-model="form.editora" class="input" type="text" placeholder="Ex: Penso">
    </div>

    <div class="control req">
      <label class="req">Ano Publicação: </label>
      <input v-model="form.anoPub" class="input" type="text" placeholder="Ex: Penso">
    </div>

    <div class="control">
      Nº Volumes:
      <input v-model="form.nVolumes" class="input" type="text" placeholder="Ex: 2">
    </div>

    <div class="control">
      Nº Capítulos:
      <input v-model="form.numeroCap" class="input" type="text" placeholder="Ex: 12">
    </div>

    <div class="control">
      Nº páginas:
      <input v-model="form.nPaginas" class="input" type="text" placeholder="Ex: 300">
    </div>

    <div class="control">
      <label>Link: </label>
      <input v-model="form.link" class="input" type="text" placeholder="Ex: portal.mec.gov.br/seb/arquivos/pdf/profunc/estatistica.pdf">
    </div>

    <div class="control" v-show = 'form.link'>
      <!-- Se link for preenchido, acesso em é requerido -->
      <label>Acesso em: </label>
      <input v-model="form.acesso" class="input" type="text" placeholder="Ex: 01/02/2018">
    </div>

    <button type="button" name="Cancelar">Cancelar</button>
    <button type="button" name="Adicionar" v-on:click="checkForm()">Adicionar</button>

  </div>
</template>

<script>
export default {
  name: 'livro',
  data () {
    return {
      autorID: 1,
      capID: 1,
      output: '',
      form: {
        issn: '123456789',
        isbn: '123456789',
        tipoAutor: 'fisica',
        pais: 'Brasil',
        name: ['Raphael'],
        respAutoral: '1',
        cidade: 'Maceió',
        vinculo: 'Associação Sururu Vale',
        titulo: 'Catalogação e descrição bibliográfica',
        subtitulo: 'contribuições a uma teoria',
        numero: '1',
        editora: 'Penso',
        ano: '2018',
        nPaginas: '230',
        volume: '5',
        link: 'www.google.com.br',
        acesso: '02/05/2018',
        codigo: '123 codigoCap',
        tituloCap: 'Titulo Cap',
        subtituloCap: 'SubtituloCap',
        numeroCap: '2Cap',
        inicialCap: '1pCap',
        finalCap: '10pCap',
        autoralCap: '1',
        autorCap: ['João','Maria'],
        tipoCap: 'fisica',
        paisCap: 'Uganda',
        vinculoCap: 'Sururu',
        doi: '19081098',
        nomePeriodico: 'nomePeriodico',
        nVolumes: 'nVolumes',
        siglaInst: 'ABNT',
        inst: 'Iffff',
        anoDeposito: '2016',
        curso: 'Sistemas de informação',
        departamento: 'AB',
        tipoDocumento: '1',
        nomeOrgao: 'Associação Brasileira de Normas Técnicas',
        nomeNorma: 'NBR 6120',
        anoPub: '2016',
        cidadePub: 'Recife'
      }
    }
  },
  methods:{

    changeForm(){
      let formsClass = document.getElementsByClassName("forms");
      for (var i = 0; i < formsClass.length; i++) {
        formsClass[i].style.display = "none";
      }
      let formID = document.getElementById("select").value;
        document.getElementById("form"+formID).style.display = "block";
    },

    tipoPessoa(){
      if(this.form.tipoAutor == 'fisica'){

      }
    },

    checkForm(e){
      for (var i = 0; i < this.form.name.length; i++) {
        if(this.form.name[i] == '' && this.form.name.length > 1){
          alert("Favor preencher todos os campos de autores");
          return;
        }
      }
      if(this.form.name && this.form.titulo && this.form.nomePeriodico && this.form.numero && this.form.ano && this.form.titulo
        && this.form.nVolumes){
        if(this.form.link){
          if(this.form.acesso){
            this.envio();
          }
          else{
            alert("Favor preencher os dados de Acesso em:")
          }
        }
        else{
          this.envio();
        }

      }
      if(!this.form.name) alert("Favor preencher o nome do Autor(es):")
      if(!this.form.titulo) alert("Favor preencher o Titulo:")
      if(!this.form.nomePeriodico) alert("Favor preencher o nome do Periódico:")
      if(!this.form.numero) alert("Favor preencher o Número:")
      if(!this.form.ano) alert("Favor preencher o Ano de publicação")
      if(!this.form.titulo) alert("Favor preencher o Titulo do trabalho")
      if(!this.form.nVolumes) alert("Favor preencher o Número de volumes:")
    },

    envio(){
      if(this.form.tipoDocumento == 1) this.form.tipoDocumento = 'Doutorado';
      if(this.form.tipoDocumento == 2) this.form.tipoDocumento = 'Mestrado';
      if(this.form.tipoDocumento == 3) this.form.tipoDocumento = 'Especialização';
      if(this.form.tipoDocumento == 4) this.form.tipoDocumento = 'Graduação';

      this.output = '';

      if(this.form.name.length > 3){
        this.output = this.form.name[0] + " .et al. ";
                this.chamarDados();
      }else {
        this.qntNomes();
        this.chamarDados();
      }
    },

    changeQnt(){
      this.autorID++;
      this.form.name.push("");
    },

    changeQntCap(){

      this.capID++;
      this.form.autorCap.push("");
      console.log(this.form.autorCap);
    },


      chamarDados(){
        if(this.form.siglaInst != ''){
          this.output += this.form.siglaInst + ". ";
        }
        if(this.form.nomeOrgao != ''){
          this.output += this.form.nomeOrgao + ", ";
        }
        if(this.form.numero != ''){
          this.output += this.form.numero + " n. ";
        }
        if(this.form.ano != ''){
          this.output += this.form.ano + ", ";
        }
        if(this.form.cidade != ''){
          this.output += this.form.cidade + ". ";
        }
        if(this.form.subtitulo != ''){
          this.output += this.form.titulo;
          this.output += ": " + this.form.subtitulo+". ";
        }else{
          this.output += this.form.titulo +". ";
        }
        if(this.form.cidadePub != ''){
          this.output += this.form.cidadePub + ": ";
        }
        if(this.form.editora != ''){
          this.output += this.form.editora + ", ";
        }
        if(this.form.anoPub != ''){
          this.output += this.form.anoPub + ". ";
        }
        if(this.form.numero != ''){
          this.output += this.form.numero + " p. ";
        }
        if(this.form.link != ''){
          this.output += "Disponível em: <" + this.form.link+">. ";
        }
        if(this.form.acesso != ''){
          this.output += "Acesso em: " + this.form.acesso+". ";
        }
        console.log(this.output);
      },

      toTitleCase(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      },

      deleteFindCap(index) {
        console.log(index);
        this.form.autorCap.splice(index, 1);
        console.log(this.form.autorCap);
      },

      deleteFind(index) {
        console.log(index);
        this.form.name.splice(index, 1);
        console.log(this.form.autorCap);
      },

      qntNomes(){
        this.output += this.form.name[0] + "; ";
        for (var i = 1; i < this.form.name.length-1; i++) {
          this.output += this.form.name[i] + "; ";
        }
        if(this.form.name.length > 1 && this.form.name.length <= 3){
          console.log("aparece");
          let lastElementName = this.form.name[this.form.name.length-1];
          this.output += lastElementName + ". ";
          //this.chamarDados();
        }
        this.output += ".et al. ";
      }
  }
  }

  </script>

  <style lang="css">
  .req{
    color: red;
  }

  .control{
    padding-top: 5px;
  }

  .labels{

  }
  </style>
