import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.scss';
import apiHelper from './helper/api';
import { convertResponseApi } from './helper/convertResponse';

function Home() {
  const [listCheckout, setListCheckout] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getListCheckout();
    return () => {
      
    }
  }, []);

  const getListCheckout = async () => {
    try {
      const response = await apiHelper.get('checkout');
      const data = convertResponseApi(response);
      setListCheckout(data);
    } catch (error) {
      console.log(error);
    } 
  }
  
  return (
    <>
      <div className="w-full overflow-x-auto area-table">
        <table className="w-full">
          <thead>
            <tr>
              <th colSpan={4} className="border">LIST CHECKOUT</th>
            </tr>
            <tr>
              <th className="px-3 py-2 border w-32 text-center">Delivery</th>
              <th className="px-3 py-2 border w-32 text-center">Price</th>
              <th className="px-3 py-2 border w-32 text-center">Quantity</th>
              <th className="px-3 py-2 border w-32 text-center">
              </th>
            </tr>
          </thead>
          <tbody>
            {
              listCheckout.map((item, i) => (
                <tr key={item.id}>
                  <td className="border py-2 text-center">{item.delivery}</td>
                  <td className="border py-2 text-center">{item.price}</td>
                  <td className="border py-2 text-center">{item.quantity}</td>
                  <td className="border py-2 text-center"><button className='text-blue-400 font-semibold' onClick={() => navigate(`checkout/${item.id}`)}>Checkout</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
