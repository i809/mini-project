import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

/**
 * This component renders the cart page, showing the products in the cart, 
 * the quantity of each product and the total price of the products in the cart.
 * It also allows the user to update the quantity of each product and to proceed to checkout.
 */
const Cart = () => {

  /**
   * Get the products, currency, cart items and update quantity function from the context.
   * The navigate function is also used to navigate to the checkout page.
   */
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  /**
   * The cart data is stored in the state. It is an array of objects, each containing 
   * the id of the product, the size of the product and the quantity of the product.
   */
  const [cartData, setCartData] = useState([]);

  /**
   * When the component mounts, it filters the products array to get only the products that are in the cart, 
   * and then maps over the filtered array to create the cart data.
   */
  useEffect(() => {
    if (products.length > 0) {
      const tempData = products.filter((product) => {
        return cartItems[product._id] && cartItems[product._id] > 0;
      }).map((product) => {
        return {
          _id: product._id,
          size: Object.keys(cartItems[product._id])[0],
          quantity: cartItems[product._id][Object.keys(cartItems[product._id])[0]] || 1
        }
      });
      setCartData(tempData);
    }
  }, [cartItems, products])


  const handleProceedToCheckout = () => {
    if (cartData.length === 0) {
      toast.error('Please add products to your cart before proceeding to checkout');
      return;
    }
    navigate('/place-order');
  }

  return (
    <div className='border-t pt-14'>

      <div className=' text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {

            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className=' flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                <img onClick={() => updateQuantity(item._id, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )

          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className=' w-full text-end'>
            <button onClick={handleProceedToCheckout} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart

