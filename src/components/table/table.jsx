import SkeletonTable from "../skeleton/skeletonTable"
import { Numeral } from "react-numeral"

const Table = (props) => {
    const { show, criptos } = props
    const calculateVariation = (props) => {
        const { initalValue, change24Value } = props
        const variation = {
            value: ((initalValue / change24Value) * 100).toFixed(2),
            band: ((initalValue / change24Value) * 100).toFixed(2) > 0 ? true : false
        }
        return variation
    }
    return <>
        <div>
            {!show && criptos && <SkeletonTable />}
            {show && criptos && <div class="relative overflow-x-auto">

                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-xs text-white uppercase bg-indigo-700	">
                        <tr>
                            <th scope="col" class="px-6 py-6">
                                Nombre
                            </th>
                            <th scope="col" class="px-6 py-6">
                                Precio
                            </th>
                            <th scope="col" class="px-6 py-6">
                                Gráfico
                            </th>
                            <th scope="col" class="px-6 py-6">
                                Variación
                            </th>
                            <th scope="col" class="px-6 py-6">
                                Capitalización de mercado
                            </th>
                            <th scope="col" class="px-6 py-6">
                                Volumen (24 h)
                            </th>
                            <th scope="col" class="px-6 py-6">
                                Reserva
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {criptos.map((item, index) => {                            
                            return (
                                <tr key={index} class="bg-white border-b dark:bg-gray-800">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.CoinInfo.FullName}
                                    </th>
                                    <td class="px-6 py-4 text-right">
                                        $<Numeral
                                            value={item.RAW.USD.PRICE.toFixed(2)}
                                            format={"0,0"}
                                        />
                                    </td>
                                    <td class="px-6 py-4">
                                        <img className="w-[50px] h-[50px]" src={`https://www.cryptocompare.com${item.CoinInfo.ImageUrl}`} alt="" />
                                    </td>
                                    <td class="px-6 py-4">
                                        <span className={`text-green-600 font-bold
                                            ${!calculateVariation({ initalValue: item.RAW.USD.CHANGE24HOUR, change24Value: item.RAW.USD.OPEN24HOUR }).band && '!text-red-600'}`}>
                                            {calculateVariation({ initalValue: item.RAW.USD.CHANGE24HOUR, change24Value: item.RAW.USD.OPEN24HOUR }).value}%
                                        </span>
                                    </td>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-right">
                                        $<Numeral
                                            value={item.RAW.USD.MKTCAP.toFixed(2)}
                                            format={"0,0"}
                                        />
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-right">
                                        $<Numeral
                                            value={item.RAW.USD.TOTALVOLUME24H.toFixed(2)}
                                            format={"0,0"}
                                        />
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-right">
                                        $<Numeral
                                            value={item.RAW.USD.SUPPLY.toFixed(2)}
                                            format={"0,0"}
                                        />
                                    </th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>}
        </div>

    </>
}

export default Table