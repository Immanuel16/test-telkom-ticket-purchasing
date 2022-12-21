import { faCheckCircle, faWallet, faIdCard, faPlus, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IconVisa from './assets/img/visa.jpg';
import apiHelper from './helper/api';
import { convertResponseApi } from './helper/convertResponse';


export default function CheckoutPage() {
  const [infoOrder, setInfoOrder] = useState({});
  const [show, setShow] = useState(true);
  const [isAgree, setIsAgree] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    getInfoOrder();
    return () => {
    }
  }, [])
  
  const getInfoOrder = async () => {
    try {
      const response = await apiHelper.get(`/checkout/${id}`);
      let data = convertResponseApi(response);
      data.deliveryDate = moment(infoOrder.deliveryDate).format('ddd MMM DD, YYYY');
      setInfoOrder(data);
    } catch (error) {
      console.log(error);
    }
  }

  const formatNumber = (number) => (Math.round(number * 100) / 100).toFixed(2)

  return (
    <div className='md:flex w-full px-8 py-4 md:space-x-3 sm:space-y-4 md:space-y-0'>
      {/* left */}
      <div className="w-full lg:w-3/5 flex flex-col space-y-4 lg:mb-0">
        {/* card top */}
        <div className="flex flex-col py-4 px-3 border space-y-4">
          <div className="flex space-x-2 items-center">
            <h3 className='text-xl font-bold'>Delivery</h3>
            <FontAwesomeIcon icon={faCheckCircle} fontSize={18} style={{marginTop: 4}} color="#15f630" />
          </div>
          <div className="space-y-2">
            <h4 className='text-lg font-semibold'>{infoOrder.delivery} - {infoOrder.deliveryFee}</h4>
            <div className="space-y-0.5">
              <p className="text-sm">Tickets available by {infoOrder.deliveryDate}</p>
              <p className="text-sm">These mobile tickets will be transferred directly to you from a trusted seller. We'll email you instructions on how to accept them on the original ticket provider's mobile app.</p>
            </div>
          </div>
        </div>

        {/* card bottom */}
        <div className="flex flex-col py-4 px-3 border">
          <div className="flex space-x-2 items-center mb-4">
            <h3 className="text-xl font-bold">Payment</h3>
            <FontAwesomeIcon icon={faCheckCircle} fontSize={18} style={{marginTop: 4}} color="#15f630" />
          </div>
          <h4 className="ml-3 text-base font-semibold mb-2">Use Credit / Debit Card</h4>
          <div className="bg-blue-100 p-3 rounded-sm">
            <div className="flex justify-start items-start space-x-3">
              <input type="radio" name="" value={true} id="" />
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <img src={IconVisa} width={50} height={50} alt="" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{infoOrder.creditCardNumber}</p>
                    <p className="text-xs text-gray-500 font-medium">{infoOrder.creditCardName} | exp. {infoOrder.creditCardExpiration}</p>
                    <div className='text-xs'>
                      <button className='text-blue-500'>Edit</button> | <button className='text-blue-500'>Delete</button>
                    </div>
                  </div>
                </div>

                {/*  */}
                <div className="space-y-1">
                  <p className="text-sm">Security Code</p>
                  <div className="flex space-x-3">
                    <div className="flex justify-between items-center w-24 border rounded-sm bg-white border-gray-400 p-2" style={{borderWidth: 2}}>
                      <p className="text-sm font-bold">***</p>
                      <FontAwesomeIcon icon={faCheckCircle} fontSize={14}  color="#15f630" />
                    </div>
                    <div className="flex space-x-3 items-center">
                      <FontAwesomeIcon icon={faWallet} fontSize={30}  />
                      <p className="text-sm">3-digits on back of card</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 ml-3 my-3">
            <div className="flex space-x-2">
              <FontAwesomeIcon icon={faPlus} fontSize={24}  color="#32b1ec" />
              <FontAwesomeIcon icon={faIdCard} fontSize={24}  color="" />
            </div>
            <button className="text-blue-300 cursor-pointer">Add New Card</button>
          </div>
          <hr className="mb-3" />
          <div className="font-semibold space-y-2">
            <p className="text-sm">Or Pay With</p>
            <div className="text-xs">By using a digital wallet and continuing post this page, you have read and are accepting the <button className='text-blue-300'>Terms of Use</button></div>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="w-full lg:w-2/5 flex flex-col">
        <div className="flex flex-col py-4 px-3 border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Total</h3>
            <div className="flex space-x-1 items-center">
              <h3 className="text-xl font-semibold">${formatNumber((infoOrder.price * infoOrder.quantity) + (infoOrder.serviceFee * infoOrder.quantity) + infoOrder.orderingFee)}</h3>
              <button onClick={() => setShow(!show)}>
                <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
              </button>
            </div>
          </div>
          {show && (
            <div>
              <div className="space-y-2 mb-3">
                <p className="text-lg font-semibold">Tickets</p>
                <div className="flex justify-between items-center text-sm">
                  <p>Resale Tickets: ${infoOrder.price} x {infoOrder.quantity}</p>
                  <p>${infoOrder.price * infoOrder.quantity}</p>
                </div>
              </div>
              <div className="space-y-1 mb-3">
                <p className="text-lg font-semibold">Notes From Seller</p>
                <p className="text-sm">{infoOrder.sellerNotes}</p>
              </div>

              <div className="space-y-1 mb-3">
                <p className="text-lg font-semibold">Fees</p>
                <div>
                  <div className="flex justify-between items-center text-sm">
                    <p>Service Fee: ${infoOrder.serviceFee} x {infoOrder.quantity}</p>
                    <p>{formatNumber(infoOrder.serviceFee * infoOrder.quantity)}</p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p>Order Process Fee: ${infoOrder.orderingFee}</p>
                    <p>${formatNumber(infoOrder.orderingFee)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1 mb-3">
                <p className="text-lg font-semibold">Delivery</p>
                <div>
                  <div className="flex justify-between items-center text-sm">
                    <p>{infoOrder.delivery}</p>
                    <p>{infoOrder.deliveryFee}</p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <button className="text-blue-400 text-lg font-semibold">Cancel Order</button>
              </div>
              <p className="text-sm font-semibold my-3">*All Sales Final - No Refunds</p>
              <div className="flex space-x-1 mb-3 items-center">
                <input type="checkbox" name="" value={isAgree} onChange={(e) => setIsAgree(!isAgree)} id="" />
                <p className="text-sm font-semibold">I have read and agree to the current <span className='text-blue-400'>Terms of Use</span></p>
              </div>
              <button className="bg-green-500 py-2 text-white font-semibold mb-3" disabled={!isAgree}>Place Order</button>
              <p className="text-xs font-semibold">*Exceptions may apply. see our Terms of Use.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
