$(document).ready( function() {

  Vue.component('maestro-entrada', {
      template: '#maestro-entrada',

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
        template: '#detalle-entrada',

        methods: {

        },

        data: function () {
          return {
            Entrada: {
              Precio: '',
              Sala: '',
              Butaca: '',
              Fila: ''
            }
          }
        }
    });

    var app = new Vue({
      el: '#app',
      data: {
        title: 'Intento de Maestro-Detalle',
      }
    });
  });
