export const specification = {
  fechaPago: {
    type: "date",
    pattern: /^((0[1-9])|([1-2][0-9])|3[0-1])-(0[1-9]|1[0-2])-(\d{4})$/, //dd/mm/aa
    //^((0[1-9])|([1-2][0-9])|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/
    required: true,
    message: "Formato de fecha : [dd/mm/aa]",
  },
  documentoIdentificacionArrendatario: {
    type: "number",
    pattern: /^([0-9])*$/, //0-100000 //solo numero
    //min:0,
    required: true,
    message: "Debe ser solo numerico",
  },
  valorPagado: {
    //pattern: /^[1-1000000]$/, //1000000 numero maximo
    type: "number",
    min: 1,
    max: 1000000,
    required: true,
    message: "Debe ser entre 1-1000000",
  },
  codigoInmueble: {
    type: "string",
    pattern: /^[A-Za-z0-9]+$/, //Alfanumerico
    required: true,
    message: "Debe ser alfanumerico",
  },
};

export default specification;
