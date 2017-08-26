$(document).ready( function() {

  Vue.component('app-icon', {
    template: '<span :class="cssClasses" aria-hidden="true"></span>',
    props: ['img'],
    computed: {
        cssClasses: function () {
            return 'glyphicon glyphicon-'+this.img;
        }
    }
  });

  Vue.component('maestro-entrada', {
      template: '#maestro-entrada-template',

      methods: {

      },

      data: function () {
        return {
          Entradas: [],
          }
        },

      mounted: function() {
          var _this = this;
          $.ajax(
            {
              url : "http://localhost:52595/api/Entradas",
              type: "GET",
            })
            .done(function(data) {
              _this.Entradas = data;
            })
            .fail(function(data) {
                    alert( "error" );
                  });
        }
      });

    Vue.component('detalle-entrada', {
        template: '#detalle-entrada-template',

        methods: {
              editNew: function () {
                  this.EntradaCopia.Precio = this.Entrada.Precio;
                  this.EntradaCopia.Sala = this.Entrada.Sala;
                  this.EntradaCopia.Butaca = this.Entrada.Butaca;
                  this.EntradaCopia.Fila = this.Entrada.Fila;

                  this.Entrada.Precio = '';
                  this.Entrada.Sala = '';
                  this.Entrada.Butaca = '';
                  this.Entrada.Fila = '';
                  this.addingNew = true;
               },
               discardNew: function () {
                 this.Entrada.Precio = this.EntradaCopia.Precio;
                 this.Entrada.Sala = this.EntradaCopia.Sala;
                 this.Entrada.Butaca = this.EntradaCopia.Butaca;
                 this.Entrada.Fila = this.EntradaCopia.Fila;
                 //this.Entrada = this.EntradaCopia;
                 this.addingNew = false;
               },
                edit: function () {
                  this.EntradaCopia.Precio = this.Entrada.Precio;
                  this.EntradaCopia.Sala = this.Entrada.Sala;
                  this.EntradaCopia.Butaca = this.Entrada.Butaca;
                  this.EntradaCopia.Fila = this.Entrada.Fila;
                  //this.EntradaCopia = this.Entrada;
                  this.editing = true;
                 },
                discard: function () {
                  this.Entrada.Precio = this.EntradaCopia.Precio;
                  this.Entrada.Sala = this.EntradaCopia.Sala;
                  this.Entrada.Butaca = this.EntradaCopia.Butaca;
                  this.Entrada.Fila = this.EntradaCopia.Fila;
                  //this.Entrada = this.EntradaCopia;
                  this.editing = false;
                },
                create: function () {
                  // TODO: UN MEJOR TRATAMIENTO DE ERRORES
                  // TODO: SACAR URLs A FICHEROS DE CONFG
                  // TODO: LANZAR EVENTO PARA QUE LO CAPTURE EL MAESTRO Y ACTUALICE
                  // TODO: SI SE QUEDA PINTADO EL QUE SE HA CREADO, REALIZAR PETICION PARA TENER EL ID
                  var _this = this;
                    $.ajax(
                      {
                        url : "http://localhost:52595/api/Entradas/",
                        type: "POST",
                        data: {
                          Precio: this.Entrada.Precio,
                          Sala: this.Entrada.Sala,
                          Butaca: this.Entrada.Butaca,
                          Fila: this.Entrada.Fila,
                        }

                      })
                      .done(function(data) {
                        // LANZAR EVENTO
                      })
                      .fail(function(data) {
                              alert( "error" );
                            });
                    this.addingNew = false;
                },
                update: function () {
                  // TODO: UN MEJOR TRATAMIENTO DE ERRORES
                  // TODO: SACAR URLs A FICHEROS DE CONFG
                  // TODO: LANZAR EVENTO PARA QUE LO CAPTURE EL MAESTRO Y ACTUALICE
                  var _this = this;
                  $.ajax(
                    {
                      url : "http://localhost:52595/api/Entradas/" + this.Entrada.Id,
                      type: "PUT",
                      data: {
                        Id: this.Entrada.Id,
                        Precio: this.Entrada.Precio,
                        Sala: this.Entrada.Sala,
                        Butaca: this.Entrada.Butaca,
                        Fila: this.Entrada.Fila
                      }
                    })
                    .done(function(data) {
                      // LANZAR EVENTO
                    })
                    .fail(function(data) {
                            alert( "error" );
                          });
                  this.editing = false;
                },
                remove: function (id) {
                    // TODO: UN MEJOR TRATAMIENTO DE ERRORES
                    // TODO: SACAR URLs A FICHEROS DE CONFG
                    // TODO: LANZAR EVENTO PARA QUE LO CAPTURE EL MAESTRO Y ACTUALICE
                    var _this = this;
                    $.ajax(
                      {
                        url : "http://localhost:52595/api/Entradas/" + this.Entrada.Id,
                        type: "DELETE",
                        data: {Id: this.Entrada.Id}
                      })
                      .done(function(data) {
                        // LANZAR EVENTO
                      })
                      .fail(function(data) {
                              alert( "error" );
                            });
                    this.editing = false;
                },
                load: function(){
                  // TODO: QUE CONCATENE EL ID PARA REALIZAR LA PETICION
                  // TODO: UN MEJOR TRATAMIENTO DE ERRORES
                  // TODO: SACAR URLs A FICHEROS DE CONFG
                  // TODO: LANZAR EVENTO PARA QUE LO CAPTURE EL MAESTRO Y ACTUALICE
                  var _this = this;
                  $.ajax(
                    {
                      //TODO: NO OLVIDARSE DE ARREGLAR ENLACE: PONER ID PASADO POR PARAMETROS!!
                      url : "http://localhost:52595/api/Entradas/5",
                      type: "GET",
                    })
                    .done(function(data) {
                      _this.Entrada = data;
                    })
                    .fail(function(data) {
                            alert( "error" );
                          });
                },
              },

        data: function () {
          return {
            editing: false,
            addingNew: false,
            Entrada: {
              Id: '',
              Precio: '',
              Sala: '',
              Butaca: '',
              Fila: ''
            },
            EntradaCopia: {
              Id: '',
              Precio: '',
              Sala: '',
              Butaca: '',
              Fila: ''
            }
          }
        },

        mounted: function() {
          //TODO: QUE INICIALICE CAMPOS VACIOS O NO HAGA NADA
          this.load();
        }
    });

    var app = new Vue({
      el: '#app',
      data: {
        title: 'Maestro-Detalle (Sin enlace con Maestro)',
      }
    });
});
