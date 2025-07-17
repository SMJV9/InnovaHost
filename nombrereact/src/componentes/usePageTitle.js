import { useEffect } from 'react';

/**
 * Hook personalizado para cambiar el título de la página dinámicamente
 * @param {string} title - El título que se mostrará en la pestaña del navegador
 * @param {string} defaultTitle - Título por defecto a restaurar (opcional)
 */
export const usePageTitle = (title, defaultTitle = 'InnovaHost - Reservaciones de hoteles') => {
  useEffect(() => {
    // Guardar título anterior
    const originalTitle = document.title;
    
    // Establecer nuevo título
    document.title = title;
    
    // Cleanup: restaurar título al desmontar
    return () => {
      document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
};

export default usePageTitle;
