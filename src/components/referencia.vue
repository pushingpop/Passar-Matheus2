<template>
  <div class="">
      <p>Tipo de referência:</p>
    <select class="form-control" id='select' v-on:change="changeForm()">
      <option disabled value="" selected>Selecione</option>
      <option value="1" id="1">Livros</option>
      <option value="2" id="2">Capítulo de Livro</option>
      <option value="3" id="3">Relatório Técnico</option>
      <option value="4" id="4">Tese/Dissertação/TCC</option>
      <option value="5" id="5">Anais/Proceedings</option>
      <option value="6" id="6">Trabalhos apresentados em congressos</option>
      <option value="7" id="7">Normas Técnicas</option>
      <option value="8" id="8">Artigo de Periódico</option>
      <option value="9" id="9">Homepage</option>
      <option value="10" id="10">Documentos legais/Legislação</option>
      <option value="11" id="11">Patentes</option>
  </select>

    <section id="form1" class="forms">
      <livro></livro>
    </section>

    <section id="form2" class="forms">
      <capitulo></capitulo>
    </section>
  </div>
  <!-- Referencia: autor. + titulo:(negrito) + : subtitulo(se houver) + cidade +  -->
  <!--
      Se houver subtitulo.
      NAUBER, Cleber et al.<b>Catalogação e descrição bibliográfica:<\b> contribuições a uma teoria. 5 ed. Florianopolis: Penso, 2018. 300 p. Disponível em: <www.google.com>. Acesso em: 1 jan. 1.

      Se não houver subtitulo.
      NAUBER, Cleber et al.<b>Catalogação e descrição bibliográfica<\b>. 5 ed. Florianopolis: Penso, 2018. 300 p. Disponível em: <www.google.com>. Acesso em: 1 jan. 1.

       Se Organizador.
       NAUBER, Cleber et al (Org.).<b>Catalogação e descrição bibliográfica<\b>. 5 ed. Florianopolis: Penso, 2018. 300 p. Disponível em: <www.google.com>. Acesso em: 1 jan. 1.
      (Comp.) e (Ed.)

      AUTOR(es). <b>TITULO{If SUBTIT != Null THEN ":"}<\b>.{If SUBTIT != Null THEN {SUBTIT}. {If NUMEDI != Null THEN {NUMEDI}+" ed."}. {If NUMVOL != Null THEN {NUMVOL}+" v."}. {LOCAL}:{EDITORA}, {DATA}. {If NUMVOL != Null THEN {NUMPAG}+" p."}. {If URL != Null THEN "Disponível em: <"+{url}+">"}. {If URL != Null && DATA_URL != Null THEN "Acesso em:"+{DATA_URL}}.

  -->

</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import Livro from './livro.vue'
import Capitulo from './capitulo.vue'
export default {
  name: 'referencia',
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
  components: {
    Livro, Capitulo
  },
  mounted(){

    for (var i = 0; i < document.getElementsByClassName("forms").length; i++) {
      document.getElementsByClassName("forms")[i].style.display = "none";
    }
    //let autor2 = document.getElementById("autor2");
    //let autor3 = document.getElementById("autor3");
    //autor2.style.display = 'none';
    //autor3.style.display = 'none';
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
