/**
 * Estados posibles durante la carga y consulta de la página.
 */
export type State =
    | 'init'
    | 'loading'
    | 'success'
    | 'error';

/**
 * Estados que determinan el estilo y el contenido de una alerta.
 */
export type AlertState =
    | 'loading'
    | 'error'
    | 'success';