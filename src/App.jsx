import { useEffect, useState } from 'react'
import './App.css'
import Modal from './components/global/modal'
import Table from './components/table/table'
import { getCalculateRor, getCriptoRor, getTopCripto } from './api/services'
import toast, { Toaster } from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form'
import { NumberFormatBase } from 'react-number-format'

function App() {
  const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm()
  const [showModal, setShowModal] = useState(false)
  const [show, setShow] = useState(false)
  const [monto, setMonto] = useState(0)
  const [criptos, setCriptos] = useState([])
  const [criptosRor, setCriptosRor] = useState([])
  const [tempcriptosRor, setTempCriptosRor] = useState([])
  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    try {
      const jsonData = await getTopCripto()
      const jsonDataRor = await getCriptoRor()
      setCriptos(jsonData)
      setCriptosRor(jsonDataRor)
      setTempCriptosRor(jsonDataRor)
      setShow(true)
    } catch (error) {
      console.error('Error en la función ejemplo:', error);
    }
  }
  const exportJSON = () => {
    toast.success("Exportando JSON.")
    const onlyCoinInfo = criptos.map(objeto => objeto.CoinInfo)
    const contenido = JSON.stringify(onlyCoinInfo, null, 2);
    const blob = new Blob([contenido], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const linkDowloand = document.createElement('a');
    linkDowloand.href = url;
    linkDowloand.download = 'criptos' + '.json';
    linkDowloand.click();
    URL.revokeObjectURL(url);
  }
  const exportEXCEL = () => {
    toast.success("Exportando csv.")
    const onlyCoinInfo = criptos.map(objeto => objeto.CoinInfo)
    const headersEXCEL = Object.keys(onlyCoinInfo[0])
    const content = onlyCoinInfo.map(objeto => headersEXCEL.map(header => objeto[header]).join(',')).join('\n');
    const csv = `${headersEXCEL.join(',')}\n${content}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = url;
    enlaceDescarga.download = 'cripto' + '.csv';
    enlaceDescarga.click();
    URL.revokeObjectURL(url);
  }
  const onSubmit = async (data) => {
    setMonto(data.monto)
    const jsonData = await getCalculateRor({ newData: data })
    setCriptosRor(jsonData)
    toast.success('Successfully toasted!')
    clearForm()
  }
  const onSubmitInvalid = (data) => {
    for (const key of Object.keys(data)) toast.error(data[key].message)
  }
  const clearForm = () => {
    reset()
    setValue('monto', '')
  }
  const closeModal = () => {
    setMonto(0)
    setCriptosRor(tempcriptosRor)
    clearForm()
    setShowModal(!showModal)
  }
  return (
    <>
      <div className='w-[90%] m-auto mt-[30px]'>
        <div className=" mb-[30px] flex justify-between">
          <h2 class="text-4xl font-extrabold ">Top de criptos</h2>
          <div className='flex gap-x-[20px]'>
            <button onClick={exportJSON} class="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">
              Export json
            </button>
            <button onClick={exportEXCEL} class="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">
              Export csv
            </button>
            <button onClick={() => setShowModal(!showModal)} class="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">
              Calculadora
            </button>
          </div>
        </div>
        <Table show={show} criptos={criptos} />
      </div>
      <Modal show={showModal} >
        {show && criptosRor &&
          <div className='w-[900px] py-[40px] px-[5%] text-center bg-white'>
            <h2 class="text-4xl font-extrabold ">Calculadora de retorno</h2>
            <div className='mt-[30px] flex gap-x-[20px] justify-between'>
              {criptosRor.map((item, index) => {
                return (
                  <div className='text-left'>
                    <h2 key={index} class="text-2xl font-bold  text-red-500	">{item.moneda}</h2>
                    <h2 class="text-lg font-semibold ">Balance inicial: <span className='!text-lg !font-normal'>${item.balance_ini}</span> </h2>
                    <h2 class="text-lg font-semibold mb-[20px] ">Interes mensual: <span className='!text-lg !font-normal'>%{item.interes_mensual}</span> </h2>
                    {item?.benefit && <h2 class="text-lg font-semibold ">Monto: <span className='!text-lg !font-normal'>${monto}</span> </h2>}
                    {item?.benefit && <h2 class="text-lg font-semibold ">Ganancia: <span className='!text-lg !font-normal'>${(item.benefit - monto).toFixed(2)}</span> </h2>}
                    {item?.benefit && <h2 class="text-lg font-semibold ">Ganancia anual: <span className='!text-lg !font-normal'>${item.benefit}</span> </h2>}
                    {item?.benefit && parseFloat(monto) < parseFloat(item.balance_ini) &&
                      <h2 class="text-sm font-normal	text-red-500">No alcanzas el monto requerido para invertir</h2>}
                  </div>
                )
              })}
            </div>
            <form onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}>
              <div className='mt-[50px] flex gap-x-[20px]'>
                <div className='w-full'>
                  <label for="monto" class="block mb-2 text-sm font-medium text-left text-gray-900">Monto</label>
                  <Controller
                    name="monto"
                    control={control}
                    rules={{ required: 'Por favor, ingresar el monto' }}
                    render={({ field }) => (
                      <NumberFormatBase
                        {...field}
                        id="mont"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    )}
                  />
                </div>
              </div>
              <div className='flex gap-x-[10px] justify-center  mt-[30px]'>
                <button type='submit' class="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">
                  Calcular
                </button>
                <button onClick={closeModal} class="bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded">
                  Cerarr
                </button>
              </div>
            </form>
          </div>}
      </Modal>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
