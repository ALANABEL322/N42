import { Link } from 'react-router-dom'
import footerImage from "../assets/FooterPreferente.png"

export default function Footer() {
  return (
    <footer className="bg-[#F6EEEE] border-t z-50 border-gray-200 w-full">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-start lg:col-span-1">
            <img
              src={footerImage}
              alt="Footer Preferente"
              className="h-24 w-auto mb-4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:col-span-3">
      
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Nosotros</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/nosotros" 
                    className="text-gray-600 hover:text-[#DB6A00] transition-colors block py-1"
                  >
                    Quiénes somos
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/equipo" 
                    className="text-gray-600 hover:text-[#DB6A00] transition-colors block py-1"
                  >
                    Nuestro equipo
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Servicios</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/servicios" 
                    className="text-gray-600 hover:text-[#DB6A00] transition-colors block py-1"
                  >
                    Nuestros servicios
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/garantias" 
                    className="text-gray-600 hover:text-[#DB6A00] transition-colors block py-1"
                  >
                    Garantías
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Legales</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/legales" 
                    className="text-gray-600 hover:text-[#DB6A00] transition-colors block py-1"
                  >
                    Términos y condiciones
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/privacidad" 
                    className="text-gray-600 hover:text-[#DB6A00] transition-colors block py-1"
                  >
                    Política de privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm mt-5">
            &copy; {new Date().getFullYear()} Heratia. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}