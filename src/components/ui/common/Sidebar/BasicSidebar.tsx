import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  cilBarChart,
  cilCart,
  cilFastfood,
  cilPeople,
  cilDollar,
  cilSpeedometer,
  cilSpreadsheet,
  cilHome,
  cilBurger,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CNavGroup,
  CNavItem,
  CNavTitle,
  CSidebar,
  CSidebarNav,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import SucursalService from "../../../../services/SucursalService";
import ISucursal from "../../../../types/ISucursal";
import "../../../../Styles/Variables.css";
import EmpresaService from "../../../../services/EmpresaService";
import DescriptionIcon from "@mui/icons-material/Description";

const BasicSidebar: React.FC = () => {
  const { sucursalId } = useParams<{ sucursalId: string }>();
  let sucursalIdJSON = localStorage.getItem("sucursalId");
  let sucursalIdStorage = sucursalIdJSON ? JSON.parse(sucursalIdJSON) : "";
  const [sucursalNombre, setSucursalNombre] = useState<string>("");
  const [empresaNombre, setEmpresaNombre] = useState<string>("");
  const url = import.meta.env.VITE_API_URL;
  const empresaService = new EmpresaService();
  const sucursalService = new SucursalService();
  const [, setEmpresaSucursales] = useState<ISucursal[]>();

  useEffect(() => {
    const fetchSucursalYEmpresaNombre = async () => {
      try {
        if (sucursalId) {
          const sucursal = await sucursalService.get(
            `${url}/sucursal`,
            parseInt(sucursalIdStorage)
          );
          setSucursalNombre(sucursal.nombre);

          if ("empresa" in sucursal) {
            setEmpresaNombre((sucursal as ISucursal).empresa.nombre);
          }
        }
      } catch (error) {
        console.error(
          "Error al obtener el nombre de la sucursal o empresa:",
          error
        );
      }
    };

    fetchSucursalYEmpresaNombre();
  }, [sucursalId]);

  console.log(sucursalNombre);

  const fetchSucursalesForEmpresa = async (empresaId: number) => {
    try {
      const empresa = await empresaService.get(
        url + `/empresa/sucursales`,
        empresaId
      );
      setEmpresaSucursales(empresa.sucursales);
    } catch (error) {
      console.error("Error al obtener las sucursales:", error);
      return [];
    }
  };
  return (
    <div>
      <CSidebar
        className="border-end d-flex flex-column"
        style={{ height: "100vh" }}
      >
        <CSidebarNav>
          <CNavTitle>
            {empresaNombre} - {sucursalNombre}
          </CNavTitle>
          <CNavItem>
            <Link to={`/dashboard/${sucursalId}`} className="nav-link">
              <CIcon
                customClassName="nav-icon"
                icon={cilBarChart}
                style={{ color: "#A90000" }}
              />
              Estadísticas
            </Link>
          </CNavItem>

          <CNavItem>
            <Link to={`/empresa/${sucursalId}`} className="nav-link">
              <CIcon
                customClassName="nav-icon"
                icon={cilHome}
                style={{ color: "#A90000" }}
              />
              Sucursales
            </Link>
          </CNavItem>

          <CNavGroup
            toggler={
              <>
                <CIcon
                  customClassName="nav-icon"
                  icon={cilFastfood}
                  style={{ color: "#A90000" }}
                />
                Productos
              </>
            }
          >
            <CNavItem>
              <Link to={`/productos/${sucursalId}`} className="nav-link">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>
                Lista de Productos
              </Link>
            </CNavItem>
            <CNavItem>
              <Link to={`/categorias/${sucursalId}`} className="nav-link">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>
                Categorías
              </Link>
            </CNavItem>
          </CNavGroup>

          <CNavItem>
            <Link to={`/promociones/${sucursalId}`} className="nav-link">
              <CIcon
                customClassName="nav-icon"
                icon={cilDollar}
                style={{ color: "#A90000" }}
              />
              Promociones
            </Link>
          </CNavItem>

          <CNavGroup
            toggler={
              <>
                <CIcon
                  customClassName="nav-icon"
                  icon={cilPeople}
                  style={{ color: "#A90000" }}
                />
                Empleados
              </>
            }
          >
            <CNavItem>
              <Link to={`/empleados/${sucursalId}`} className="nav-link">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>
                Lista de Empleados
              </Link>
            </CNavItem>
            <CNavItem>
              <Link to={`/roles/${sucursalId}`} className="nav-link">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>
                Roles
              </Link>
            </CNavItem>
          </CNavGroup>
          <CNavItem>
            <Link to={`/insumos/${sucursalId}`} className="nav-link">
              <CIcon
                customClassName="nav-icon"
                icon={cilCart}
                style={{ color: "#A90000" }}
              />
              Insumos
            </Link>
          </CNavItem>
          <CNavItem>
            <Link to={`/unidadMedida`} className="nav-link">
              <CIcon
                customClassName="nav-icon"
                icon={cilSpeedometer}
                style={{ color: "#A90000" }}
              />
              Unidad de Medida
            </Link>
          </CNavItem>
          <CNavItem>
            <Link to={`/CardsProducto`} className="nav-link">
              <CIcon
                customClassName="nav-icon"
                icon={cilBurger}
                style={{ color: "#A90000" }}
              />
              Cards Productos
            </Link>
          </CNavItem>
          <CNavItem>
            <Link to={`/Pedidos`} className="nav-link">
              <CIcon
                customClassName="nav-icon"
                icon={cilSpreadsheet}
                style={{ color: "#A90000" }}
              />
              Pedidos
            </Link>
          </CNavItem>
        </CSidebarNav>
      </CSidebar>
    </div>
  );
};

export default BasicSidebar;
