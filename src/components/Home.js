import React, { useState, useEffect } from "react";
import axios from 'axios';
import $ from 'jquery';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Result from './Result';
import Passage from './Passage';
import siigoLogo from './siigoImage.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
        minHeight: 128,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
      position: 'relative',
      align: 'center',
      justifyContent: 'center',
      fontSize: 24,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        marginTop: 20,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',        
    },
    image: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    resultsTitles: {
        display: 'flex',
        align: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginRight: 80,
        marginLeft: 80,
        fontSize: 20,
      },
}));

function Home() {
    const [results, setResults] = useState([]);
    const [passages, setPassages] = useState([]);
    const [searchB, setSearchB] = useState(false);

    const docsUrls={ 
        "5bfc14ad34981ea5046747c507d15cbb": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/creacion-grupos-de-inventarios/", 
        "d32a729eda65e9936423cb1c1b04f6c8": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/creacion-activos-fijos/", 
        "796206bbce7f00c81cf8ee85ea0f67b8": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/creacion-grupos-activos/",
        "a458f26aaeb9dcd68f35c0a6642a5a73": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/importacion-subir-conteo-fisico-desde-excel/",
        "9b8554b42c40ed9c32b95656dcfdf9ff": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/creacion-productos-facturacion-electronica/",
        "7c1603cfecb5d2481125e7bc58e9d6f6": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/elaborar-una-factura-de-venta/",
        "12100d86f4cfd4cd05046db4ceaadf93": "khttps://siigonube.portaldeclientes.siigo.com/basedeconocimiento/configuracion-pago-en-linea/",
        "c68533a9f8536bf20bf43d09ed4e4603": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/configuracion-recibos-caja/",
        "c55f08ccb77af8debaeec82f76913b1b": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/elaborar-una-cotizacion/",
        "2492ab7d3cd587d8481f78501661c46d": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/importacion-subir-terceros-desde-excel/",
        "69a133cb971e0b267bd870cad429e69c": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/registrar-ajustes-de-cartera/",
        "79b4cc3cd5a6004e112cd72551cff7ae": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/elaborar-factura-recurrente/",
        "c39b15145d9f5e28533ea761b37ba366": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/liquidacion-prima-servicios/",
        "49f460b2303444765543d37f308ec6ff": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/importacion-subir-comprobante-ajuste-inventarios-desde-excel/",
        "069394032ddd32a27dd72e435f2bf0ee": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/importacion-subir-activos-fijos-desde-excel/",
        "e939c6a39a0aefe22b18807e4c29feae": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/importacion-subir-usuarios-lite-desde-excel/",
        "c136c0be0867dfeb06577e6e74a2c61f": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/importacion-subir-productos-desde-excel/",
        "e70e871bba250d1a07dc2a8cb08eab16": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/elaborar-una-nota-credito/",
        "8cf078e0464bb5510aef0ccc38a1bd99": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/configuracion-de-cotizaciones/k",
        "2c0334478c8f4ad2918695b8d7da9f7d": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/registrar-traslado-de-dinero/", 
        "488b5f50229a7c181cedc7c8ea1def16": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/registrar-nota-de-traslado-entre-bodegas/",
        "90f271b68257474f3a33699d7400721d": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/configuracion-de-bodegas/",
        "9eddb52b9937cefa36abdcf473dfc40f": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/registro-comprobante-contable/",
        "4c58b87dcfaaf64928e86a74946dffa7": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/registrar-ajustes-de-inventarios/",
        "f95a1cb35f75e8553c22da32bc6295c7": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/registrar-gastos/",
        "3a656f04da92f5132a2851afe35ef5b7": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/elaborar-una-nota-debito/",
        "ebf54e407c36207415775ed0b4cd6fe8": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/convertir-usuarios-lite-a-contador-o-con-acceso/",
        "fb6b9ba8932bfb1dc175d06cff6b1af4": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/bloqueo-fechas-transacciones/",
        "a0adef271f6958d4107dad356396aefb": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/registrar-ajustes-a-proveedores/",
        "292ac1a5fb076768427c75ee96c9ed33": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/importacion-subir-comprobantes-contables-desde-excel/",
        "c838ddc7bac1837af8fd92997caaf38b": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/informe-edades-cartera/",
        "690e551d4fcc5de5d70f471e102a7126": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/configuracion-factura-de-venta/",
        "4cae4fd6185540893b39a035e831a3f2": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/elaborar-un-recibo-de-caja/",
        "9748bec4f80869c1be90791b1f3afb85": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/saldos-iniciales-inventarios-comprobante-contable/",
        "fe44028c9e1b53bb5d5281b73162dfaf": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/saldos-iniciales-proveedores-comprobante-contable/",
        "944b819f9579e382bebc8d36ba7e13cd": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/importacion-subir-saldos-iniciales-de-proveedores/", 
        "3c8f53ff1d881175116f4d0d5eeda4cb": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/configuracion-recibos-de-pago/",
        "42f5f56dd7cbf5ee3a2680bf7303f7e8": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/configuracion-gastos-frecuentes/",
        "90dcc26f9d899b4393245e2cc0002184": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/importacion-subir-saldos-iniciales-otras-cuentas/",
        "7ada68d48c8db5213987b425157b4d49": "khttps://siigonube.portaldeclientes.siigo.com/basedeconocimiento/elaborar-un-recibo-de-pago/",
        "16f6fec1b2ff4091c23ad71c6f288cf7": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/configuracion-de-compras-gastos/",
        "c2347e02ecc635fca0a43ec1b175c700": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/elaborar-una-compra/",
        "99e1a664cc442731d3f1a5a253d8dfa7": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/logo-empresa/",
        "0f2cecb554532a72dbf541c981b22e0e": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/crear-usuarios/",
        "a1533d21bf759ecb933b75d72f4d4299": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/importacion-subir-saldos-iniciales-inventarios-desde-excel/",
        "5645a4e2516403041ab6034075b1abd7": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/saldos-iniciales-activos-fijos-comprobante-contable/",
        "b187aacdd3b5a583a42fa8a5a132f9dd": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/importacion-saldos-iniciales-activos-fijos/",
        "0c2a529e50004c1f0198d63e97a6d26c": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/saldos-iniciales-otras-cuentas-por-comprobante-contable/",
        "98bb010addcbe258233145310d0f0a85": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/perfil-de-la-organizacion/",
        "cdfbef4f08a376cfe5f6c87ab2ec426f": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/configuracion-comprobantes-contables/",
        '73b2054a53c941fce54a80e762afff47': 'https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/logo-para-impresion-comprobantes/',
        "1073334df30253203b6e97935099efec": "https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/importacion-subir-saldos-iniciales-de-cartera/",
        '8136a2a8f1b19f627f97693bc9f29ac1': 'https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/saldos-iniciales-cartera-comprobante-contable/',
        'bd5bfe566470519e97f6245ffcc6acaa': 'https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/creacion-de-terceros/',
        'f2cae6a1ddc0112b08a88dfe43d29739': 'https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/ingreso-navegacion/',
        '1fa0339135ac1e428cbc1454aa4223b0': 'https://siigonube.portaldeclientes.siigo.com/basedeconocimiento/creacion-rapida/',
   };

   const docsTitles={ 
        "j7c1603cfecb5d2481125e7bc58e9d6f6": "Elaborar factura de venta",
        "12100d86f4cfd4cd05046db4ceaadf93": "Configuración pagos en línea",
        "c68533a9f8536bf20bf43d09ed4e4603": "Configuración de recibos de caja",
        "c55f08ccb77af8debaeec82f76913b1b": "Elaborar cotizaciones",
        "7f025453f084ec55e3c076e2acf1029b": "Informe edades de proveedores",
        '2492ab7d3cd587d8481f78501661c46d': "Subir desde Excel – Terceros",
        '69a133cb971e0b267bd870cad429e69c': "Registrar ajustes de cartera",
        '79b4cc3cd5a6004e112cd72551cff7ae': "Elaborar factura recurrente",
        'c39b15145d9f5e28533ea761b37ba366': "Liquidación prima de servicios",
        'd32a729eda65e9936423cb1c1b04f6c8': "Creación de activos fijos",
        '796206bbce7f00c81cf8ee85ea0f67b8': "Creación grupos de activos",
        'a458f26aaeb9dcd68f35c0a6642a5a73': "Subir desde Excel – Conteo físico",
        '9b8554b42c40ed9c32b95656dcfdf9ff': "Creación de productos",
        '49f460b2303444765543d37f308ec6ff': "Subir desde Excel – Comprobante ajuste de inventarios",
        '069394032ddd32a27dd72e435f2bf0ee': "Subir desde Excel – Activos fijos",
        'e939c6a39a0aefe22b18807e4c29feae': "Subir desde Excel – Usuarios lite",
        'c136c0be0867dfeb06577e6e74a2c61f': "Subir desde Excel – Productos",
        'e70e871bba250d1a07dc2a8cb08eab16': "Elaborar nota crédito",
        '8cf078e0464bb5510aef0ccc38a1bd99': "Configuración de cotizaciones",
        '2c0334478c8f4ad2918695b8d7da9f7d': "Registrar traslado de dinero",
        '488b5f50229a7c181cedc7c8ea1def16': "Elaborar notas de traslado",
        '90f271b68257474f3a33699d7400721d': 'Configuración de bodegas',
        '9eddb52b9937cefa36abdcf473dfc40f': 'Registro comprobante contable',
        '4c58b87dcfaaf64928e86a74946dffa7': 'Registrar ajustes de inventarios',
        '3a656f04da92f5132a2851afe35ef5b7': 'Elaborar una nota débito',
        '5bfc14ad34981ea5046747c507d15cbb': 'Configuración grupos de inventarios',
        'ebf54e407c36207415775ed0b4cd6fe8': 'Convertir usuarios lite a contador o con acceso',
        'fb6b9ba8932bfb1dc175d06cff6b1af4': 'Bloqueo de fechas para transacciones',
        'a0adef271f6958d4107dad356396aefb': 'Registrar ajustes a proveedores',
        '292ac1a5fb076768427c75ee96c9ed33': 'Subir desde Excel – Comprobantes contables',
        'c838ddc7bac1837af8fd92997caaf38b': 'Informe edades de cartera',
        '690e551d4fcc5de5d70f471e102a7126': 'Configuración de factura de venta',
        '4cae4fd6185540893b39a035e831a3f2': 'Elaborar recibo de caja',
        '9748bec4f80869c1be90791b1f3afb85': 'Saldos iniciales de inventarios',
        'fe44028c9e1b53bb5d5281b73162dfaf': 'Saldos iniciales de proveedores',
        '944b819f9579e382bebc8d36ba7e13cd': 'Subir desde Excel – Saldos iniciales proveedores',
        '3c8f53ff1d881175116f4d0d5eeda4cb': 'Configuración recibos de pago Egresos',
        '42f5f56dd7cbf5ee3a2680bf7303f7e8': 'Configuración gastos frecuentes',
        '90dcc26f9d899b4393245e2cc0002184': 'Subir desde Excel – Saldos iniciales de otras cuentas',
        '7ada68d48c8db5213987b425157b4d49': 'Elaborar un recibo de pago',
        '16f6fec1b2ff4091c23ad71c6f288cf7': 'Configuración de compras gastos',
        'c2347e02ecc635fca0a43ec1b175c700': 'Elaborar una compra',
        'f95a1cb35f75e8553c22da32bc6295c7': 'Registrar gastos',
        'a1533d21bf759ecb933b75d72f4d4299': 'Subir desde Excel – Saldos iniciales de inventario',
        '5645a4e2516403041ab6034075b1abd7': 'Saldos iniciales de activos fijos',
        'b187aacdd3b5a583a42fa8a5a132f9dd': 'Subir desde Excel – Saldos iniciales de activos fijos',
        '0c2a529e50004c1f0198d63e97a6d26c': 'Saldos iniciales de otras cuentas',
        '99e1a664cc442731d3f1a5a253d8dfa7': 'Logo de la empresa',
        '0f2cecb554532a72dbf541c981b22e0e': 'Creacion de usuarios',
        '98bb010addcbe258233145310d0f0a85': 'Perfil de la organizacion',
        'cdfbef4f08a376cfe5f6c87ab2ec426f': 'Configuración de comprobantes contables',
        '7c1603cfecb5d2481125e7bc58e9d6f6': 'Elaborar factura de venta',
        '73b2054a53c941fce54a80e762afff47': 'Logo impresión comprobantes',
        '1073334df30253203b6e97935099efec': 'Subir desde Excel – Saldos iniciales cartera',
        '8136a2a8f1b19f627f97693bc9f29ac1': 'Saldos iniciales cartera',
        'bd5bfe566470519e97f6245ffcc6acaa': 'Creación de terceros',
        'f2cae6a1ddc0112b08a88dfe43d29739': 'Ingreso y navegacion',
        '1fa0339135ac1e428cbc1454aa4223b0': 'Creación rápida',
   };

    function search(e) {
        setSearchB(true);
        const searchText = $('#inputTextSearch').val();
        axios.get(`http://localhost:5000/discoverySearch/${searchText}`)
          .then(function (response) {
              // handle success
              console.log(response.data);
              setResults(response.data.result.results);
              setPassages(response.data.result.passages);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });            
      }

      function searchByKeyword(keyword) {       
        axios.get(`http://localhost:5000/discoverySearch/${keyword}`)
          .then(function (response) {
              // handle success
              console.log(response.data);
              setResults(response.data.result.results);
              setPassages(response.data.result.passages);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });            
      }

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Typography variant="h6" className={classes.title}>
                    Watson Discovery Query Siigo Demo
                </Typography>
            </AppBar>
            <Grid container spacing={0}>
            <Grid item xs={4}>            
            </Grid>
            <Grid item xs={4}>
            <Paper elevation={12} >
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase id="inputTextSearch" 
                    placeholder="Ingresa tu consulta" fullWidth={true}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    />                                                        
                </div>                                                                
            </Paper>
            </Grid>
            <Grid item xs={4}>            
            </Grid>
            </Grid>
            <Grid container spacing={0}>
            <Grid item xs={4}>            
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth={true} onClick={search}>Buscar</Button>
            </Grid>
            <Grid item xs={4}>            
            </Grid>
            </Grid>            
            {!searchB ? <div className={classes.image}> 
            <img src={siigoLogo}></img>
            </div> : null}
            <Grid container spacing={0}>
            <Grid item xs={6}>
                {searchB ? 
                <Paper elevation={6} className={classes.resultsTitles} >
                <Typography>
                    Respuestas
                </Typography>
                </Paper> : null}
                {passages.map((passage) => {
                return <Passage 
                title = {docsTitles[passage.document_id]}
                text = {passage.passage_text}
                docId = {passage.document_id}
                url = {docsUrls[passage.document_id]}/>
                })}
            </Grid>
            <Grid item xs={6}>
                {searchB ? 
                <Paper elevation={6} className={classes.resultsTitles} >
                <Typography>
                    Documentos
                </Typography>
                </Paper> : null}            
                {results.map((result) => {
                return <Result 
                key = {result.id}
                title = {result.extracted_metadata.filename}
                text = {result.text}
                url = {docsUrls[result.id]}
                enrichments = {result.enriched_text.keywords.slice(0,8)}
                handleClick = {searchByKeyword}/>
                })}
            </Grid>
            </Grid>            
        </div>
    );
}

export default Home;
