// appConfig obtenida de condig.js
var httpURL = appConfig.URLEntrada;
var EventBus = new Vue;

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

        loadList: function(){
            var _this = this;
            $.ajax(
              {
                url : httpURL,
                type: "GET",
              })
              .done(function(data) {
                _this.Entradas = data;
              })
              .fail(function(data) {
                      alert( "error" );
                });
          },

          entradaSelected: function(id){
            EventBus.$emit('entradaSelected', id);
          }
      },

      data: function () {
        return {
          Entradas: [],
          }
        },

      mounted: function() {
          this.loadList();

          EventBus.$on('updateListEntrada', function() {
            this.loadList();
          }.bind(this));
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
                 this.addingNew = false;
               },
                edit: function () {
                  this.EntradaCopia.Precio = this.Entrada.Precio;
                  this.EntradaCopia.Sala = this.Entrada.Sala;
                  this.EntradaCopia.Butaca = this.Entrada.Butaca;
                  this.EntradaCopia.Fila = this.Entrada.Fila;
                  this.editing = true;
                 },
                discard: function () {
                  this.Entrada.Precio = this.EntradaCopia.Precio;
                  this.Entrada.Sala = this.EntradaCopia.Sala;
                  this.Entrada.Butaca = this.EntradaCopia.Butaca;
                  this.Entrada.Fila = this.EntradaCopia.Fila;
                  this.editing = false;
                },
                create: function () {
                  // TODO: UN MEJOR TRATAMIENTO DE ERRORES
                  var _this = this;
                    $.ajax(
                      {
                        url : httpURL,
                        type: "POST",
                        data: {
                          Precio: this.Entrada.Precio,
                          Sala: this.Entrada.Sala,
                          Butaca: this.Entrada.Butaca,
                          Fila: this.Entrada.Fila,
                        }

                      })
                      .done(function(data) {
                        alert('Entrada añadida con éxito.');
                        EventBus.$emit('updateListEntrada');
                      })
                      .fail(function(data) {
                              alert( "error" );
                            });
                    this.addingNew = false;
                },
                update: function () {
                  // TODO: UN MEJOR TRATAMIENTO DE ERRORES
                  var _this = this;
                  $.ajax(
                    {
                      url : httpURL + this.Entrada.Id,
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
                      alert('Entrada actualizada con éxito.');
                      EventBus.$emit('updateListEntrada');
                    })
                    .fail(function(data) {
                            alert( "error" );
                          });
                  this.editing = false;
                },
                remove: function () {
                    // TODO: UN MEJOR TRATAMIENTO DE ERRORES
                    var _this = this;
                    $.ajax(
                      {
                        url : httpURL + this.Entrada.Id,
                        type: "DELETE",
                        data: {Id: this.Entrada.Id}
                      })
                      .done(function(data) {
                        alert('Entrada eliminada con éxito.');
                        EventBus.$emit('updateListEntrada');
                      })
                      .fail(function(data) {
                              alert( "error" );
                            });
                    this.editing = false;
                },
                load: function(id){
                  // TODO: UN MEJOR TRATAMIENTO DE ERRORES
                  var _this = this;
                  $.ajax(
                    {
                      //TODO: NO OLVIDARSE DE ARREGLAR ENLACE: PONER ID PASADO POR PARAMETROS!!
                      url : httpURL + id,
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
          EventBus.$on('entradaSelected', function(id) {
            this.load(id);
          }.bind(this));
        }
    });

    var app = new Vue({
      el: '#app',
      data: {
        title: 'Maestro-Detalle de Entrada',
      }
    });
});
