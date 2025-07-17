import { Link, Form, useActionData, redirect } from 'react-router-dom';
import { authRegistro } from '../servicios/ApiAuth';
import { expresion_correo, expresion_password } from './../validaciones';
import { useEffect } from 'react';
import usePageTitle from '../componentes/usePageTitle';

export async function action({ request }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const errores = [];

  if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios');
  }
  if (!expresion_correo.test(formData.get('email'))) {
  errores.push('El E-mail ingresado no es válido');
}
    if (datos.password !== datos.password_confirmation) {
    errores.push('Las contraseñas ingresadas no coinciden');
    }
  if (!expresion_password.test(formData.get('password'))) {
    errores.push('La contraseña debe tener al menos 1 número, una mayúscula y un largo de 8 a 12 caracteres');
  }
  if (errores.length > 0) {
    return errores;
  }


let logeado = await authRegistro({
  name: datos.name,
  email: datos.email,
  password: datos.password,
  password_confirmation: datos.password_confirmation
});

console.log('Respuesta del servidor:', logeado); // Para debug

  if (logeado?.status === 201) {
    // Usuario creado correctamente - redirigir al login con mensaje de éxito
    return redirect('/login?registro=exitoso');
  } else if (logeado?.status === 422) {
    // Errores de validación del servidor
    if (logeado.data?.errors) {
      Object.values(logeado.data.errors).forEach(errorArray => {
        errorArray.forEach(error => errores.push(error));
      });
    } else {
      errores.push('Error de validación del servidor');
    }
    return errores;
  } else if (logeado?.status === 0) {
    // Error de conexión
    errores.push('No se pudo conectar con el servidor. Verifica que esté ejecutándose.');
    return errores;
  } else {
    // Otros errores
    errores.push(`Error del servidor: ${logeado?.data?.message || 'Algo salió mal'}`);
    return errores;
  }
}

const AccesoRegistro = () => {
  const errores = useActionData();
  const registroExitoso = errores === null;
  
  // Hook personalizado para cambiar título de la página
  usePageTitle('Crear Cuenta - InnovaHost');

  return (
    <div className="min-h-screen relative flex items-center justify-center" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
    }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      {/* Formulario */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 form-animation">
        {/* Logo */}
        <div className="text-center mb-8 slide-down">
          <div className="bg-gray-100 rounded-2xl p-4 inline-block mb-4">
            <svg 
              className="w-12 h-12 text-gray-600" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M4 21V7l8-6 8 6v14H4zm2-2h2v-3h8v3h2V8.5l-6-4.5-6 4.5V19zm4-5h1v1H10v-1zm3 0h1v1h-1v-1zm-3-2h1v1H10v-1zm3 0h1v1h-1v-1zm-3-2h1v1H10v-1zm3 0h1v1h-1v-1z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">INNOVAHOST</h2>
          <p className="text-gray-600 text-sm">Hosting services since 1995</p>
        </div>

        {/* Mensajes de estado */}
        {registroExitoso && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
            ¡Usuario registrado exitosamente!
          </div>
        )}
        {errores?.length > 0 && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            <ul>
              {errores.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        )}
        
        <Form method='post' noValidate className="space-y-4 slide-in-right">
          <div className="smooth-transition form-field">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent auth-input"
              placeholder="Juan Perez"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent auth-input"
              placeholder="ejemplo@gmail.com"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent auth-input"
              placeholder="••••••"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="password_confirmation" className="block text-gray-700 font-medium mb-2">Confirmar contraseña</label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent auth-input"
              placeholder="••••••"
              required
            />
          </div>
          
          <div className="flex items-center mt-4 form-field">
            <input
              type="checkbox"
              id="recordar"
              name="recordar"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="recordar" className="ml-2 block text-sm text-gray-700">
              Recordar Usuario
            </label>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-900 transition duration-200 mt-6 auth-button"
          >
            Registrarse
          </button>
        </Form>
        
        <p className="mt-6 text-center text-gray-600 text-sm slide-in-left">
          ¿Ya tienes una cuenta? 
          <Link to="/login" className="text-blue-600 hover:underline font-medium ml-1 auth-link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AccesoRegistro;