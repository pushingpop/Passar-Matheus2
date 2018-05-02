<template lang="html">
  <div class="nameField">

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
      <input v-model="form.name" class="input" id="autor1" type="text" placeholder="Ex: Paulo da Silva, Maria de Lurdes">
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

    <div class="control">
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
      output: '',
      form: {
        issn: '123456789',
        isbn: '123456789',
        tipoAutor: 'fisica',
        pais: 'Brasil',
        name: ['Raphael','Teste1','Teste2','Teste3'],
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
        codigo: '',
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
      if(this.form.name && this.form.titulo && this.form.cidade && this.form.editora && this.form.ano){
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
      if(!this.form.titulo) alert("Favor preencher o Titulo:")
      if(!this.form.cidade) alert("Favor preencher a Cidade:")
      if(!this.form.editora) alert("Favor preencher a Editora:")
      if(!this.form.ano) alert("Favor preencher o Ano")
      if(!this.form.respAutoral) alert("Favor preencher o Vinculo")
      if(!this.form.tipoAutor) alert("Favor preencher o tipo do Autor:")
    },

    envio(){
      //if(this.form.respAutoral == 1) this.form.respAutoral = '';
      if(this.form.respAutoral == 2) this.form.respAutoral = 'Org.';
      if(this.form.respAutoral == 3) this.form.respAutoral = 'Comp.';
      if(this.form.respAutoral == 4) this.form.respAutoral = 'Ed.';

      if(this.form.tipoAutor == 'fisica'){
        if(this.form.name.length > 3){
          this.output = this.form.name[0] + " .et al. ";
          if(this.form.respAutoral != 1){
            this.output += "(" + this.form.respAutoral+"). ";
          }
        }
          this.chamarDados();
      }

      if(this.form.tipoAutor == "juridica"){
        if(this.form.name.length > 3){

          this.output = this.form.name[0] + " .et al. (" + this.toTitleCase(this.form.pais) + "). " + this.form.vinculo + ". ";
          if(this.form.respAutoral != 1){
            this.output += "(" + this.form.respAutoral+"). ";
          }
          this.chamarDados();
        }
      }

      if(this.form.tipoAutor == 'governamental'){
        if(this.form.name.length > 3){

          this.output = this.form.pais.toUpperCase()+ ". " + this.form.name[0] + " .et al. " + this.form.vinculo + ". ";
          if(this.form.respAutoral != 1){
            this.output += "(" + this.form.respAutoral+"). ";
          }
          this.chamarDados();
        }
      }
    },

    changeQnt(){
      this.autorID++;
      let tempID = this.autorID - 1;
      tempID.toString();
      console.log(tempID);
      document.getElementById('autor'+tempID).insertAdjacentHTML('afterend', '<br><input v-model="form.name" class="input" id="autor'+ this.autorID+ '"' + 'type="text" placeholder="Ex: Paulo da Silva, Maria de Lurdes">');

    },
      chamarDados(){
        if(this.form.subtitulo != ''){
          this.output += this.form.titulo;
          this.output += ": " + this.form.subtitulo+". ";
          /*
          console.log(this.form.name + " .et al. " + this.form.vinculo + this.form.titulo + ": " + this.form.subtitulo +" " + this.form.numero +" " + this.form.volume +" " + this.form.editora
          +" " + this.form.editora +" " + this.form.pais +" " + this.form.ano +" " + this.form.isbn +" " + this.form.link +" " + this.form.acesso);
          */
          //console.log(this.output);
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
        if(this.form.numero != ''){
          this.output +=  this.form.nPaginas+" p. ";
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

      toTitleCase(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
  </style>
