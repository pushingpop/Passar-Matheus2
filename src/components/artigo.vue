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
      <input type="radio" v-model="form.codigo" value="3">
      DOI:
      <input v-model="form.doi" class="input" type="text" placeholder="Ex: XXXXXXSsdswd">
    </div>

    <div class="control">
      <label class="req">Autor(es): </label>
      <div v-for = "(nome, index) in form.name">
        <input v-model="form.name[index]" class="input" id="autor1" type="text" placeholder="Ex: Paulo da Silva, Maria de Lurdes">
        <button @click="deleteFind(index)">Deletar</button>
      </div>
      <button type="button" name="Adicionar" v-on:click="changeQnt()">Adicionar</button>
    </div>

    <div class="control req">
      <label class="req">Nome do Períodico: </label>
      <input v-model="form.nomePeriodico" class="input" type="text" placeholder="Ex: Catalogação e descrição bibliográfica">
    </div>

    <div class="control req">
      Nº:
      <input v-model="form.numero" class="input" type="text" placeholder="Ex: 1">
    </div>

    <div class="control req">
      Ano Publicação:
      <input v-model="form.ano" class="input" type="text" placeholder="Ex: 2018">
    </div>

    <div class="control">
      <label class="req">Título do trabalho: </label>
      <input v-model="form.titulo" class="input" type="text" placeholder="Ex: Catalogação e descrição bibliográfica">
    </div>

    <div class="control" v-show = "form.titulo != '' ">
      Subtítulo do trabalho:
      <input v-model="form.subtitulo" class="input" type="text" placeholder="Ex: contribuições a uma teoria">
    </div>

    <div class="control req">
      Nº Volumes:
      <input v-model="form.nVolumes" class="input" type="text" placeholder="Ex: 48">
    </div>

    <div class="control">
      Página Inicial do Capítulo:
      <input v-model="form.inicialCap" class="input" type="text" placeholder="Ex: contribuições a uma teoria">
    </div>

    <div class="control">
      Página Final do Capítulo:
      <input v-model="form.finalCap" class="input" type="text" placeholder="Ex: contribuições a uma teoria">
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
        nVolumes: 'nVolumes'
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
      this.output = '';
      this.qntNomes();
      this.chamarDados();
/*
        if(this.form.tipoCap == 'juridica'){
          if(this.form.autorCap.length <= 3){
            this.qntAutor();
            this.dadosCap();
          }else{
            this.output = this.form.autorCap[0] + "; ";
            this.dadosCap();
          }
      }

      if(this.form.tipoCap == 'governamental'){
        if(this.form.autorCap.length <= 3){
          this.qntAutor();
          this.dadosCap();
        }else {
          this.dadosCap();
        }
      }

      if(this.form.tipoAutor == 'fisica'){
        if(this.form.name.length > 3){
          this.output += this.form.name[0] + " .et al. ";
          if(this.form.respAutoral != 1){
            this.output += "(" + this.form.respAutoral+"). ";
          }
          //this.output = this.form.autorCap + " " + " .et al. " + this.form.autoralCap + " " + this.form.tituloCap + " " + this.form.name[0] + " .et al. ";
          this.chamarDados();
        }else {
          this.qntNomes();
          this.output += ".et al. "
          if(this.form.respAutoral != 1){
            this.output += "(" + this.form.respAutoral+"). ";
          }
          this.chamarDados();
        }

      }

      if(this.form.tipoAutor == "juridica"){
        if(this.form.name.length > 3){
          //this.dadosCap();
          this.output += this.form.name[0] + " .et al. (" + this.toTitleCase(this.form.pais) + "). " + this.form.vinculo + ". ";
          if(this.form.respAutoral != 1){
            this.output += "(" + this.form.respAutoral+"). ";
          }
          this.chamarDados();
        }else {
          this.qntNomes();
          this.output += ".et al. (" + this.toTitleCase(this.form.pais) + "). " + this.form.vinculo + ". ";
          if(this.form.respAutoral != 1){
            this.output += "(" + this.form.respAutoral+"). ";
          }
          this.chamarDados();
        }
      }

      if(this.form.tipoAutor == 'governamental'){
        if(this.form.name.length > 3){

          this.output += this.form.pais.toUpperCase()+ ". " + this.form.name[0] + " .et al. " + this.form.vinculo + ". ";
          if(this.form.respAutoral != 1){
            this.output += "(" + this.form.respAutoral+"). ";
          }
          this.chamarDados();
        }else {
          this.output += this.form.pais.toUpperCase()+ ". "
          this.qntNomes();
          this.output += ".et al. " + this.form.vinculo + ". ";
          this.chamarDados();
        }
      }
      */
    },

    changeQnt(){
      this.autorID++;
      /*
      let tempID = this.autorID - 1;
      tempID.toString();
      console.log(tempID);
      document.getElementById('autor'+tempID).insertAdjacentHTML('afterend', '<br><input v-model="form.name" class="input" id="autor'+ this.autorID+ '"' + 'type="text" placeholder="Ex: Paulo da Silva, Maria de Lurdes">');
      */
      this.form.name.push("");
    },

    changeQntCap(){

      this.capID++;
      /*
      let tempcapID = this.capID - 1;
      tempcapID.toString();
      console.log(tempcapID);
      //document.getElementById('autorCap'+tempcapID).insertAdjacentHTML('afterend', '<br><input v-model="form.autorCap" class="input" id="autorCap'+ this.capID+ '"' + 'type="text" placeholder="Ex: Paulo da Silva, Maria de Lurdes">');
      */
      this.form.autorCap.push("");
      console.log(this.form.autorCap);
    },

      chamarDados(){
        if(this.form.subtitulo != ''){
          this.output += this.form.titulo;
          this.output += ": " + this.form.subtitulo+". ";
        }else{
          this.output += this.form.titulo +". ";
        }
        if(this.form.nomePeriodico != ''){
          this.output += this.form.nomePeriodico + ", ";
        }
        if(this.form.volume != ''){
          this.output += "v. " + this.form.volume + ", ";
        }
        if(this.form.numero != ''){
          this.output += "n. " + this.form.numero + ", ";
        }
        if(this.form.inicialCap != ''){
          this.output += "p. " + this.form.inicialCap + "-" + this.form.finalCap + ", ";
        }
        if(this.form.ano != ''){
          this.output +=  this.form.ano+". ";
        }
        if(this.form.codigo == 1){
          if(this.form.isbn != ''){
            this.output += "ISBN: " + this.form.isbn+". ";
        }
      }
        if(this.form.codigo == 2){
          if(this.form.issn != ''){
            this.output += "ISSN: " + this.form.issn+". ";
          }
        }
        if(this.form.codigo == 3){
          if(this.form.issn != ''){
            this.output += "DOI: " + this.form.issn+". ";
          }
        }
        if(this.form.link != ''){
          this.output += "Disponível em: <" + this.form.link+">. ";
        }
        console.log(this.output);
      },

      dadosCap(){
        //this.output = this.form.autorCap[0] + " .et al. ";

        if(this.form.tipoCap == 'juridica'){
          if(this.form.autorCap > 3){
          if(this.form.autoralCap != 1){
            this.output = this.form.autorCap[0] + " .et al. ";
          }else{
            this.output = this.form.autorCap[0] + " .et al. ";
          }
            //this.output += "(" + this.toTitleCase(this.form.paisCap) + "). " + this.form.vinculoCap + " ";
          }else {
            this.output += ".et al. " + "(" + this.toTitleCase(this.form.paisCap) + "). " + this.form.vinculoCap + " ";
          }
        }

        if(this.form.tipoCap == 'governamental'){
          if(this.form.autorCap > 3){
            if(this.form.autoralCap != 1){
              this.output = this.form.paisCap.toUpperCase() + ". " + this.form.autorCap[0] + " .et al. ";
              console.log("teste1");
            }else{
              this.output = this.form.paisCap.toUpperCase() + ". " + this.form.autorCap[0] + " .et al. ";
              console.log("teste2");
            }
              this.output += this.form.vinculoCap + " ";
              console.log("teste3");
          }else{
            //this.output = this.form.paisCap.toUpperCase() + ". ";
            console.log("teste4");
          }
          }


        if(this.form.tipoCap == 'fisica'){
          if(this.form.autorCap > 3){
            if(this.form.autoralCap != 1){
              this.output = this.form.autorCap[0] + " .et al. " + "(" + this.form.autoralCap + "). ";
            }else{
              this.output = this.form.autorCap[0] + " .et al. ";
            }
          }else {
            this.output += ".et al. ";
          }

        }

        if(this.form.subtituloCap == ''){
          if(this.form.autoralCap == 1){
            this.output += this.form.tituloCap;
          }else{
          this.output += "(" + this.form.autoralCap + "). " + this.form.tituloCap;
        }
        }else{
          if(this.form.autoralCap == 1){
            console.log("aqui");
            this.output += this.form.tituloCap + ": " + this.form.subtituloCap + ". ";
          }else{
            this.output += "(" + this.form.autoralCap + "). " + this.form.tituloCap + ": " + this.form.subtituloCap + ". ";
            console.log("ou aqui");
          }

        }
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

      qntAutor(){
        this.output = this.form.autorCap[0] + "; ";
        for (var i = 1; i < this.form.autorCap.length-1; i++) {
          this.output += this.form.autorCap[i] + "; ";
        }
        if(this.form.autorCap.length > 1 && this.form.autorCap.length <= 3){
          console.log("aparece nao");
          let lastElement = this.form.autorCap[this.form.autorCap.length-1];
          this.output += lastElement + ". ";
          //this.dadosCap();
        }else{
          //this.dadosCap();
        }
        if(this.form.tipoCap == 'governamental'){
          this.output = this.form.paisCap.toUpperCase() + ". " + this.output;
          console.log(this.output);
          //this.dadosCap();
        }
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
