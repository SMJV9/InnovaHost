import { useState, useEffect } from 'react';
import usePageTitle from '../componentes/usePageTitle';

function ContextEjem10() {
  // Hook personalizado para cambiar título de la página
  usePageTitle('Ejemplo - InnovaHost');

  return (
    <div>
      <h1>¡Hola! Esto es ContextEjem10</h1>
    </div>
  )
}

export default ContextEjem10