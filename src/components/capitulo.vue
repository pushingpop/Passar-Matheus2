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

    <div class="" v-on:change="tipoPessoa()">
      Tipo do autor do Capítulo:
      <input type="radio" value="fisica" v-model="form.tipoCap">
      <label for="one">Pessoa Física</label>
      <input type="radio" value="juridica" v-model="form.tipoCap">
      <label for="one">Pessoa Jurídica(Assoc., Emp., etc)</label>
      <input type="radio" value="governamental" v-model="form.tipoCap">
      <label for="one">Orgão Governamental</label>
    </div>

    <div class="control req">
      <label class="req">Autor(es) do Capítulo: </label>
      <div v-for = "(nome, index) in form.autorCap">
        <input  v-model="form.autorCap[index]" class="input" type="text" placeholder="Ex: Paulo da Silva, Maria de Lurdes">
        <button @click="deleteFindCap(index)">Deletar</button>
      </div>
      <button type="button" name="Adicionar" v-on:click="changeQntCap()">Adicionar</button>
    </div>

    <div class="">
    Vinculo Autoral do Capítulo:
      <input type="radio" value="1" v-model="form.autoralCap">
      <label for="one">Autor Principal</label>
      <input type="radio" value="2" v-model="form.autoralCap">
      <label for="one">Organizador</label>
      <input type="radio" value="3" v-model="form.autoralCap">
      <label for="one">Copilador</label>
      <input type="radio" id="editor" value="4" v-model="form.autoralCap">
      <label for="one">Editor</label>
    </div>

    <div class="control"  v-show= 'form.tipoCap == "juridica" || form.tipoCap == "governamental"'>
      <label>Pais, Estado ou Munícipio do Capítulo: </label>
      <input v-model="form.paisCap" class="input" type="text" placeholder="Ex: Catalogação e descrição bibliográfica">
    </div>

    <div class="control" v-show= 'form.tipoCap == "juridica" || form.tipoCap == "governamental"'>
      <label>Vinculo do Autor do Capítulo: </label>
      <input v-model="form.vinculoCap" class="input" type="text" placeholder="Ex: Associação Sururu Vale">
    </div>

    <div class="control req">
      <label class="req">Título do Capítulo: </label>
      <input v-model="form.tituloCap" class="input" type="text" placeholder="Ex: Catalogação e descrição bibliográfica">
    </div>

    <div class="control" v-show = "form.tituloCap != '' ">
      Subtítulo do Capítulo:
      <input v-model="form.subtituloCap" class="input" type="text" placeholder="Ex: contribuições a uma teoria">
    </div>

    <div class="control req">
      Número do Capítulo:
      <input v-model="form.numeroCap" class="input" type="text" placeholder="Ex: contribuições a uma teoria">
    </div>

    <div class="control req">
      Página Inicial do Capítulo:
      <input v-model="form.inicialCap" class="input" type="text" placeholder="Ex: contribuições a uma teoria">
    </div>

    <div class="control req">
      Página Final do Capítulo:
      <input v-model="form.finalCap" class="input" type="text" placeholder="Ex: contribuições a uma teoria">
    </div>

    <label class="labels">Dados do Livro:</label>

    <div class="" v-on:change="tipoPessoa()">
      Tipo autor:
      <input type="radio" value="fisica" v-model="form.tipoAutor">
      <label for="one">Pessoa Física</label>
      <input type="radio" value="juridica" v-model="form.tipoAutor">
      <label for="one">Pessoa Jurídica(Assoc., Emp., etc)</label>
      <input type="radio" value="governamental" v-model="form.tipoAutor">
      <label for="one">Orgão Governamental</label>
    </div>

    <div class="control">
      <label class="req">Autor(es): </label>
      <div v-for = "(nome, index) in form.name">
        <input v-model="form.name[index]" class="input" id="autor1" type="text" placeholder="Ex: Paulo da Silva, Maria de Lurdes">
        <button @click="deleteFind(index)">Deletar</button>
      </div>
      <button type="button" name="Adicionar" v-on:click="changeQnt()">Adicionar</button>
    </div>

    <div class="">
    Vinculo Autoral:
      <input type="radio" value="1" v-model="form.respAutoral">
      <label for="one">Autor da Obra</label>
      <input type="radio" value="2" v-model="form.respAutoral">
      <label for="one">Organizador</label>
      <input type="radio" value="3" v-model="form.respAutoral">
      <label for="one">Copilador</label>
      <input type="radio" id="editor" value="4" v-model="form.respAutoral">
      <label for="one">Editor</label>
    </div>

    <!-- só aparece se entidade coletiva ou orgão Governamental estiver marcado -->
    <div class="control"  v-show= 'form.tipoAutor == "juridica" || form.tipoAutor == "governamental"'>
      <label>Pais, Estado ou Munícipio: </label>
      <input v-model="form.pais" class="input" type="text" placeholder="Ex: Catalogação e descrição bibliográfica">
    </div>

    <div class="control" v-show= 'form.tipoAutor == "juridica" || form.tipoAutor == "governamental"'>
      <label>Vinculo do Autor: </label>
      <input v-model="form.vinculo" class="input" type="text" placeholder="Ex: Associação Sururu Vale">
    </div>

    <div class="control">
      <label class="req">Título: </label>
      <input v-model="form.titulo" class="input" type="text" placeholder="Ex: Catalogação e descrição bibliográfica">
    </div>

    <div class="control" v-show = "form.titulo != '' ">
      Subtítulo:
      <input v-model="form.subtitulo" class="input" type="text" placeholder="Ex: contribuições a uma teoria">
    </div>

    <div class="control">
      Edição nº:
      <input v-model="form.numero" class="input" type="text" placeholder="Ex: 1">
    </div>

    <div class="control">
      <label class="req">Cidade: </label>
      <input v-model="form.cidade" class="input" type="text" placeholder="Ex: Maceió">
    </div>

    <div class="control">
      <label class="req">Editora: </label>
      <input v-model="form.editora" class="input" type="text" placeholder="Ex: Penso">
    </div>

    <div class="control">
      <label class="req">Ano: </label>
      <input v-model="form.ano" class="input" type="text" placeholder="Ex: 2018">
    </div>

    <div class="control">
      <label>Nº páginas: </label>
      <input v-model="form.nPaginas" class="input" type="text" placeholder="Ex: 300">
    </div>

    <div class="control">
      <label>Volume: </label>
      <input v-model="form.volume" class="input" type="text" placeholder="Ex: 2">
    </div>

    <div class="control">
      <label>Link: </label>
      <input v-model="form.link" class="input" type="text" placeholder="Ex: portal.mec.gov.br/seb/arquivos/pdf/profunc/estatistica.pdf">
    </div>

    <div class="control req" v-show = 'form.link'>
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
        vinculoCap: 'Sururu'
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
      if(this.form.name != '' && this.form.name != 'undefined' && this.form.titulo && this.form.cidade && this.form.editora && this.form.ano && this.form.autorCap
        && this.form.tituloCap && this.form.inicialCap && this.form.finalCap && this.form.numeroCap){
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
      if(!this.form.name) alert("Favor preencher o nome do Autor:")
      if(this.form.name == '') alert("Favor preencher o nome do Autor:")
      if(!this.form.titulo) alert("Favor preencher o Titulo:")
      if(!this.form.cidade) alert("Favor preencher a Cidade:")
      if(!this.form.editora) alert("Favor preencher a Editora:")
      if(!this.form.ano) alert("Favor preencher o Ano")
      if(!this.form.respAutoral) alert("Favor preencher o Vinculo")
      if(!this.form.tipoAutor) alert("Favor preencher o tipo do Autor:")
      if(!this.form.autorCap) alert("Favor preencher o Autor do Capítulo:")
      if(!this.form.tituloCap) alert("Favor preencher o Título do Capítulo:")
      if(!this.form.inicialCap) alert("Favor preencher o tipo do Autor:")
      if(!this.form.finalCap) alert("Favor preencher o tipo do Autor:")
      if(!this.form.numeroCap) alert("Favor preencher o tipo do Autor:")
    },

    envio(){
      //if(this.form.respAutoral == 1) this.form.respAutoral = '';
      if(this.form.respAutoral == 2) this.form.respAutoral = 'Org.';
      if(this.form.respAutoral == 3) this.form.respAutoral = 'Comp.';
      if(this.form.respAutoral == 4) this.form.respAutoral = 'Ed.';
      if(this.form.autoralCap == 2) this.form.autoralCap = 'Org.';
      if(this.form.autoralCap == 3) this.form.autoralCap = 'Comp.';
      if(this.form.autoralCap == 4) this.form.autoralCap = 'Ed.';

/*
      for (var i = 0; i < this.form.autorCap; i++) {
        this.form.autorCap.push(document.getElementById('autorCap'+[i]).value);
        //document.getElementById('autorCap'+[i]);
        //this.form.autorCap.push(this.form.);
      }
*/
      if(this.form.tipoCap == 'fisica'){
        if(this.form.autorCap.length <= 3){
          console.log("menor que 3");
          this.qntAutor();
          this.dadosCap();
        } else{
            this.output = this.form.autorCap[0] + "; ";
            this.dadosCap();



        }
      }

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
        if(this.form.numero != ''){
          this.output += this.form.numero+" ed. ";
        }
        if(this.form.volume != ''){
          this.output += this.form.volume+" v. ";
        }
        if(this.form.cidade != ''){
          this.output += this.form.cidade+": ";
        }
        if(this.form.editora != ''){
          this.output += this.form.editora+", ";
        }
        if(this.form.ano != ''){
          this.output +=  this.form.ano+". ";
        }
        if(this.form.numeroCap != ''){
          this.output += "Cap. " + this.form.numeroCap + ". ";
        }
        if(this.form.inicialCap != ''){
          this.output += "p. " + this.form.inicialCap + "-" + this.form.finalCap + ". ";
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

        if(this.form.link != ''){
          this.output += "Disponível em: <" + this.form.link+">. ";
        }
        if(this.form.acesso != ''){
          this.output += "Acesso em: " + this.form.acesso+". ";
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
        }else{
          //this.chamarDados();
        }
        if(this.form.tipoAutor == 'governamental'){
          //this.output += this.form.pais.toUpperCase() + ". " + this.output;
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
