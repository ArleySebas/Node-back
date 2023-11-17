//  Función que dice el URL actual en el que me encuentro  //
const currentUrl = window.location.pathname;

document.addEventListener('mousemove', resetearTiempoInactividad);
document.addEventListener('keydown', resetearTiempoInactividad);
document.addEventListener('click', resetearTiempoInactividad);

document.addEventListener('touchstart', resetearTiempoInactividad);
document.addEventListener('touchend', resetearTiempoInactividad);

////////// Función para quitar el loader una vez carga la página ////////// 

if (currentUrl != '/Resumen'){
  window.addEventListener("load", function() {
    var loader = document.getElementById("loader");
    loader.style.display = "none";
  });
}


////////// Registrar usuario //////////

const formulario_clave = document.getElementById('formulario_Clave1');
formulario_clave?.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch('/registrar_usuario/', {
    method:'POST',
    body:formData
  })

  .then(response => response.json())
  .then(data => {
    if (data.error) {
      console.error(data.error);
    } else {
      window.location.href = '/'
    }
  })
  .catch(error => {
    console.error('error en la solicitud: ', error)
  })
})


const crearMetodoPOST = (id) => metodoPOST(id);

const ids = [
  'Grado_Pri', 'Grado_Col',
  'Const_Pago', 'Const_Extension',
  'Certi_Admision', 'Certi_Matri', 'Certi_Sapi', 'Certi_Epm', 'Certi_Carrera',
  'Certi_Buena', 'Certi_NoGraduado', 'Certi_Validez_Titulo', 'Certi_Retirado',
  'Exa_Acre', 'Exa_Habi', 'Exa_Pre_Pos', 'Exa_Vali', 'Exa_Espe', 'Exa_Extran', 'Exa_Suple',
  'Otro_carnet', 'Otro_Materias', 'Otro_Pedagogica', 'Otro_Micro', 'Otro_Sillas', 'Otro_Vacas', 'Otro_Diplo_Ext_Aca'
];

const metodosPOST = {};

ids.forEach((id) => {
  metodosPOST[id] = crearMetodoPOST(id);
});

//////// Opciones menu select ///////////


if (currentUrl === '/Certificados'){
  const Opciones1 = new Options('myForm','mySelect','selectedText','Certi_Semes_Ante');
  const Opciones2 = new Options('myForm2','mySelect2','selectedText2','Certi_Curso_Horario');

  Opciones1.Años();
  Opciones2.Años();
  Opciones1.Enviar();
  Opciones2.Enviar();

} else if (currentUrl === '/Otros'){
  const Opciones3 = new Options('myForm_Otros','mySelect_Otros','selectedTextOtros','Otro_Carga_Aca');
  Opciones3.Creditos();
  Opciones3.Enviar();
}


// Lista y diccionario para la clase Encuesta //
const rate = [false,false,false,false];
const atributosDict = {};

/// Encuesta 1 Emojis ///

const emojis = document?.querySelectorAll('.star')
const emojis1 = [];
const emojis2 = [];

for (let i = 0, j = 5; i < 5; i++, j++) {
  emojis1.push(emojis[i]);
  emojis2.push(emojis[j]);

}

/// Encuesta extra check & wrong ///

const wrong2 = document?.getElementById('wrong_2');
const good2 = document?.getElementById('good_2');

/// Encuesta 3 check & wrong ///

const happy = document?.getElementById('happy_2');
const sad = document?.getElementById('sad_2');


if (currentUrl === '/Encuesta') {
  for (let i=5; i<10; i++) {
    emojis[i].style.display = 'none';
    
  }

  wrong2.style.display = 'none';
  good2.style.display = 'none';

  happy.style.display = 'none';
  sad.style.display = 'none';

}

const miEncuesta1 = new Encuesta('.star', 'data-star', true, 0);
const miEncuestaExtra = new Encuesta('.extra','data-califica',true, 1);
const miEncuesta2 = new Encuesta('.encuesta-img', 'data-mejor', true, 2);
const miEncuesta3 = new Encuesta('.check', 'data-caras', true, 3);


miEncuesta1.getID();
miEncuestaExtra.getID();
miEncuesta2.getID();
miEncuesta3.getID();

document?.addEventListener('click', function(event) {
  if (rate.every(value => value === true)) {
    showThankYouMessage();
  };
});