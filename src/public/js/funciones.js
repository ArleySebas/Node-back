////// Detectar inactividad //////

function resetearTiempoInactividad(){
  clearTimeout(tiempoInactividad);
  tiempoInactividad = setTimeout(() => {
    if (currentUrl !== '/'){
      window.location.href = '/';
    }
  }, 5 * 60 * 1000);
}

document.addEventListener('mousemove', resetearTiempoInactividad);
document.addEventListener('keydown', resetearTiempoInactividad);
document.addEventListener('click', resetearTiempoInactividad);

document.addEventListener('touchstart', resetearTiempoInactividad);
document.addEventListener('touchend', resetearTiempoInactividad);


//back_Res
const backButtonResumen = document.getElementById('back_Res');
backButtonResumen?.addEventListener('click', evento => {
  
  const paginaAnterior = determinarPaginarAnterior();
  window.location.href = paginaAnterior;
});

function determinarPaginarAnterior() {
  const paginaAnterior = document.referrer;
  return paginaAnterior || '/';
}

////// Clase de menu Opciones Select  ////////////////
class Options {
  constructor(FORM, SELECT, TEXT, ID) {
    this.ID = ID;
    this.allowedIds = ['Certi_Semes_Ante', 'Certi_Curso_Horario', 'Otro_Carga_Aca'];
    this.selectElement = document.getElementById(SELECT);
    this.selectedTextElement = document.getElementById(TEXT);
    this.FORM = FORM;
    this.currentYear = new Date().getFullYear(); //año actual
    this.selectedOption = "";
  }
  Años() {
    if (!this.allowedIds.includes(this.ID)) {
      return;
    }

    for (let year = this.currentYear; year >= this.currentYear - 7; year--) {
      const option1 = document.createElement("option");
      option1.value = `${year}-2`;
      option1.textContent = `${year}-2`;
      this.selectElement.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = `${year}-1`;
      option2.textContent = `${year}-1`;
      this.selectElement.appendChild(option2);
    }
    this.selectElement?.addEventListener("change", () => {
      this.selectedOption = this.selectElement.value;
      this.selectedTextElement.textContent = this.selectedOption;
    });
  }

  Creditos() {
    if (!this.allowedIds.includes(this.ID)) {
      return;
    }
    for (let i = 1; i < 9; i++) {
      const opciones = document.createElement("option");
      opciones.value = `${i}`;
      opciones.textContent = `${i}`;
      this.selectElement.appendChild(opciones);
    }
    this.selectElement?.addEventListener("change", () => {
      this.selectedOption = this.selectElement.value;
      this.selectedTextElement.textContent = this.selectedOption;
    });
  }

  async Enviar() {
    if (!this.allowedIds.includes(this.ID)) {
      return;
    }

    document.getElementById(this.FORM)?.addEventListener("submit", async (event) => {
      event.preventDefault();


      if (this.allowedIds[0].includes(this.ID) || this.allowedIds[1].includes(this.ID)) {
        this.selectedOption = document.getElementById(this.ID).getAttribute('data-value') + " - Semestre= " + this.selectElement.value;
      } else {
        this.selectedOption = "Carga académica adicional= " + this.selectElement.value;
      }

      const response = await fetch('/User-selection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'servicio': this.selectedOption
        })
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        window.location.replace(jsonResponse.resumen_url);
      } else {
        console.error('Ocurrió un error al enviar la respuesta')
      }
    });
  }
}



/////// enviar a django y registrar en base de datos la selección del usuario //////////

function metodoPOST(imagenId) {
  const allowedIds = ['Grado_Pri', 'Grado_Col',
    'Const_Pago', 'Const_Extension',
    'Certi_Admision', 'Certi_Matri', 'Certi_Sapi', 'Certi_Epm', 'Certi_Carrera', 'Certi_Buena', 'Certi_NoGraduado', 'Certi_Validez_Titulo', 'Certi_Retirado',
    'Exa_Acre', 'Exa_Habi', 'Exa_Pre_Pos', 'Exa_Vali', 'Exa_Espe', 'Exa_Extran', 'Exa_Suple',
    'Otro_carnet', 'Otro_Materias', 'Otro_Pedagogica', 'Otro_Micro', 'Otro_Sillas', 'Otro_Vacas', 'Otro_Diplo_Ext_Aca'
  ];

  if (!allowedIds.includes(imagenId)) {
    console.log("metodo: no permitido");
    return
  }
  const imagen = document.getElementById(imagenId);
  imagen?.addEventListener("click", function (event) {
    event.preventDefault();

    const data = {
      'servicio': imagen.dataset.value
    };
    console.log(data);

    $.ajax({
      url: '/User-selection',
      type: "POST",
      data: data,
      dataType: 'json',
      success: function (response) {
        window.location.replace(response.resumen_url);
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log(errorThrown)
      }
    });
    
  });
}




////// Clase de la encuesta, para obtener atributos e interaccion con los objetos ///////

class Encuesta {
  constructor(clase, atributos, VERDAD, POSITION) {

    this.clase = clase;
    this.atributos = atributos;
    this.VERDAD = VERDAD;
    this.POSITION = POSITION;
    this.labels = document.querySelectorAll(this.clase);
  }

  getID() {

    this.labels.forEach((label, index) => {
      label?.addEventListener('click', () => {

        rate[this.POSITION] = this.VERDAD;

        this.atributo = this.labels[index].getAttribute(this.atributos);

        atributosDict[this.POSITION] = this.atributo;

        if (this.clase == '.star') {
          this.toggleStar(index);
        } else {
          this.toggleOption(label);
        }

      });
    });

    return {
      resultado: rate.every(value => value === true), //devuelve si toda la lista es true //
      atributos: atributosDict
    };
  }

  toggleStar(star) {
    for (let i = 0; i < this.labels.length; i++) {
      if (i <= star) {
        this.labels[i].classList.add('active');
      } else {
        this.labels[i].classList.remove('active');
      }
    }

    const numerosSeleccionado = [0, 1, 2, 3, 4];

    for (let i = 0; i <= star; i++) {
      if (star > 4) {
        break
      }
      if (numerosSeleccionado.includes(star)) {
        emojis2[i].style.display = 'grid';
        emojis2[i].classList.add('active');
        emojis1[i].style.display = 'none';

      } else {
        emojis1[star].style.display = 'grid';
        emojis2[star].style.display = 'none';

      }
    }

  }

  toggleOption(selectedOption) {
    this.labels.forEach((label) => {
      if (label == selectedOption) {
        label.classList.add('active');
      } else {
        label.classList.remove('active');
      }
    });

    const faces = ['happy_1', 'sad_1', 'happy_2', 'sad_2'];
    const checks = ['good_1', 'wrong_1', 'good_2', 'wrong_2'];

    if (faces.includes(selectedOption.id)) {
      const happy1 = document?.getElementById('happy_1');
      const sad1 = document?.getElementById('sad_1');
      if (selectedOption.id.includes('happy_1') || selectedOption.id.includes('happy_2')) {
        happy.style.display = 'grid';
        happy.style.gridArea = 'B';
        happy1.style.display = 'none';
      } else {
        happy1.style.display = 'grid';
        happy1.style.gridArea = 'B'
        happy.style.display = 'none';
      }
      if (selectedOption.id.includes('sad_1') || selectedOption.id.includes('sad_2')) {
        sad.style.display = 'grid';
        sad.style.gridArea = 'A';
        sad1.style.display = 'none';
      } else {
        sad1.style.display = 'grid';
        sad1.style.gridArea = 'A';
        sad.style.display = 'none';
      }
    } else if (checks.includes(selectedOption.id)) {
      const wrong1 = document?.getElementById('wrong_1');
      const good1 = document?.getElementById('good_1');
      if (selectedOption.id.includes('good_1') || selectedOption.id.includes('good_2')) {
        good2.style.display = 'grid';
        good2.style.display = 'B';
        good1.style.display = 'none';
      } else {
        good1.style.display = 'grid';
        good1.style.display = 'B';
        good2.style.display = 'none';
      }
      if (selectedOption.id.includes('wrong_1') || selectedOption.id.includes('wrong_2')) {
        wrong2.style.display = 'grid';
        wrong2.style.display = 'A';
        wrong1.style.display = 'none';
      } else {
        wrong1.style.display = 'grid';
        wrong1.style.display = 'A';
        wrong2.style.display = 'none';
      }

    }

  }
}



/////// muestra el mensaje final de agradecimiento y envía los resultados 
/////// de la encuesta a node para ser almacenados en la base de datos

function showThankYouMessage() {
  var messageContainer = document.getElementById('message-container');
  messageContainer.style.display = 'block';

  setTimeout(function () {
    // messageContainer.style.display = 'none';

    const data = miEncuesta1.getID().atributos;
    // data['correo'] = 'arleysebas123@gmail.com'
    const url = '/Procesar-encuesta';

    const sendData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          window.location.href = jsonResponse.redireccion_url;
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    sendData();
  }, 4000);
}


const urlsPaginas = ['/Resumen'];

let guardarInfo = [];
const miurl = window.location.pathname;

if (urlsPaginas.includes(miurl)) {

  document.addEventListener('DOMContentLoaded', async function () {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';
    let guardarInfo = [];

    try {
      const response = await fetch('/Resumen-solicitud');
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      console.log(data.Resumen);
      loader.style.display = 'none';
      guardarInfo.push(data.Resumen);
      const RespuestaResumen = data.Resumen;
      const nombreSpan1 = document.getElementById('span1');
      const nombreSpan2 = document.getElementById('span2');
      const nombreSpan3 = document.getElementById('span3');
      const nombreSpan4 = document.getElementById('span4');

      nombreSpan1.style.fontFamily = 'sans-serif';
      nombreSpan2.style.fontFamily = 'sans-serif';
      nombreSpan3.style.fontFamily = 'sans-serif';
      nombreSpan4.style.fontFamily = 'sans-serif';

      nombreSpan1.textContent = `nombre: ${RespuestaResumen.nombre}`;
      nombreSpan2.textContent = `documento: ${RespuestaResumen.documento}`;
      nombreSpan3.textContent = `Programa académico: ${RespuestaResumen.programa}`;
      nombreSpan4.textContent = `Servicio solicitado: ${RespuestaResumen.servicio}`;
    } catch (error) {
      console.error(error);
    }
  });
}


if (urlsPaginas.includes(miurl)) {
  setTimeout(function () {
    const redirigir = '/Encuesta';
    window.location.href = redirigir
  }, 10000);
};